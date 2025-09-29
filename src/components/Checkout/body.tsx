import { BiLock } from "react-icons/bi";
import CardForm from "./forms/Card";
import CheckoutFooter from "./footer";
import MomoForm from "./forms/Momo";
import Selector from "./Selector";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import { emptyCart } from "../../utils/functions";
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "react-toastify";

const Body = ({ action }: { action: any }) => {
  const [{ checkoutData, cartTotal, paymentMethod, cartItems, foodItems, voucherAmount, paymentMode  }, dispatch] =
    useStateValue();
  const [loading, setLoading] = useState(false);

  // If paymentMode is 'voucher', we use the calculated voucherAmount.
  // Otherwise, it's a standard checkout, so we use the full cartTotal.
  const amountDue = paymentMode === 'voucher' ? voucherAmount : cartTotal;

  const safeAmountDue = Number(amountDue) || 0;

  const completePayment = () => {
    if(!checkoutData) return toast.error("Complete payment info")
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      await emptyCart(cartItems, foodItems, dispatch);
      action(false);
      toast.success("Order completed successfuly with payment. Thank you for your patronage.", {
        position: "top-center",
        autoClose: 6000
      });
    }, 3000);
  };

  return (
    <div className="w-full h-full rounded-t-[2rem]  bg-cartBg flex flex-col">
      <Selector />
      <div className="min-h-[50vh] mt-5">
        
        {/* Now we display the final amount in one simple, consistent way. */}
        <div className="w-full flex items-center justify-center my-4">
          <p className="text-gray-300 text-lg">
            Amount to Pay:{" "}
            <span className="font-bold text-white text-xl">{`€${safeAmountDue.toFixed(2)}`}</span>
          </p>
        </div>

        {paymentMethod === "mobile_money" ? <MomoForm /> : <CardForm />}

        <div className="w-full flex items-center justify-center mt-4">
          <motion.button
            onClick={completePayment}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 w-[90%] p-3 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 hover:from-orange-600 hover:to-orange-400 transition-all duration-75 ease-in-out text-white text-xl font-semibold my-2 hover:shadow-lg"
          >
            {!loading && <BiLock />}
            {!loading ? (
              `PAY €${safeAmountDue.toFixed(2)} NOW`
            ) : (
              <ImSpinner3 className="animate animate-spin" />
            )}
          </motion.button>
        </div>
      </div>
      <CheckoutFooter />
    </div>
  );
};

export default Body;