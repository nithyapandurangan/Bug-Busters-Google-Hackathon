import { motion } from 'framer-motion'
import { useStateValue } from '../../context/StateProvider';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import { toast } from 'react-toastify';
import EligibilityModal from './EligibilityModal';

// Type definitions
export interface EligibilityItem {
  id: number;
  fid: number;
  uid: string;
  qty: number;
  itemname: string;
  itemcategory: string;
  isEligible: boolean;
  reason: string;
}

export interface EligibilitySummary {
  totalItems: number;
  eligible: number;
  notEligible: number;
}

export interface EligibilityResponse {
  success: boolean;
  timestamp: string;
  summary: EligibilitySummary;
  items: EligibilityItem[];
}

interface CartTotalProps {
  checkoutState: (state: boolean) => void;
  items: any[];
}

const CartTotal = ({ checkoutState, items }: CartTotalProps) => {
  const [{ cartTotal, user }, dispatch] = useStateValue();
  const [showEligibilityModal, setShowEligibilityModal] = useState<boolean>(false);
  const [eligibilityResults, setEligibilityResults] = useState<EligibilityResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const navigate = useNavigate(); 
   
  const checkEligibility = async (): Promise<void> => {
    setLoading(true);
    
    try {
        const response = await fetch('http://localhost:3001/api/check-eligibility', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(items)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to check eligibility');
        }

        const data: EligibilityResponse = await response.json();
        console.log("data", data);
        
        setEligibilityResults(data);
        setShowEligibilityModal(true);
        
    } catch (err) {
        console.error('Error checking eligibility:', err);
        toast.error('Error checking eligibility. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  const handleStandardCheckout = () => {
    dispatch({
      type: 'SET_ELIGIBILITY_DATA',
      paymentMode: 'standard',
      voucherAmount: null,
      remainingAmount: cartTotal
    });
    checkoutState(true);
  };

  const handleVoucherCheckout = () => {
    // Check if cart total exceeds €25 limit
    if (cartTotal > 25) {
      setShowErrorModal(true);
      return;
    }
    // If under limit, proceed with eligibility check
    toast.info("Checking eligible items for meal voucher payment...");
    checkEligibility();
  };

  const attemptVoucherCheckout = () => {
    if (user && user.mealVoucherDetails && user.mealVoucherDetails.cardNumber) {
      handleVoucherCheckout();
    } else {
      toast.error("Please add your Meal Voucher details in your profile first!");
      navigate('/profile'); 
    }
  };

  // Error Modal for the "Over Limit" Component
  const ErrorModal = () => {
       if (!showErrorModal) return null;
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[99999] p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Cart Limit Exceeded</h3>
              <p className="text-sm">Meal voucher limit is €25.00</p>
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-2xl mb-6">
            {/* FIX: Wrap cartTotal with parseFloat and a fallback to 0 */}
            <p className="text-center text-red-700 font-medium">
              Your cart total of <strong>€{parseFloat(cartTotal || 0).toFixed(2)}</strong> exceeds the daily limit. Please use a different payment method.
            </p>
          </div>
          <div className="flex space-x-3">
            <button onClick={() => setShowErrorModal(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-semibold">Close</button>
            <button onClick={() => { setShowErrorModal(false); handleStandardCheckout(); }} className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold">
              Pay with Card
            </button>
          </div>
        </motion.div>
      </div>
    );
  };
  return (
    <>
      <div className='w-full mt-2 md:mt-0 flex-1 rounded bg-cartItem rounded-t-[2rem] px-8 py-2 flex flex-col items-center justify-evenly'>
        <div className="w-full flex items-center justify-between">
          <p className="text-gray-400 text-base md:text-lg ">Sub Total</p>
          <p className="text-gray-400 text-base md:text-lg">-</p>
          <p className="text-gray-400 text-base md:text-lg "><span className="text-sm text-red-600">€</span> {cartTotal}</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-gray-400 text-base md:text-lg ">Delivery</p>
          <p className="text-gray-400 text-base md:text-lg">-</p>
          <p className="text-gray-400 text-base md:text-lg "><span className="text-sm text-red-600">€</span> {0.00}</p>
        </div>
        <div className="w-full border-b border-gray-600 my-2"></div>
        <div className="w-full flex items-center justify-between">
          <p className="text-gray-50 text-base md:text-lg uppercase">Total</p>
          <p className="text-gray-50 text-base md:text-lg">-</p>
          <p className="text-gray-50 text-base md:text-lg "><span className="text-sm text-red-600">€</span> {cartTotal}</p>
        </div>

        {/* Enhanced Payment Buttons with WGS Theme */}
        <motion.button
          onClick={attemptVoucherCheckout}
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='w-full p-4 rounded-xl bg-gradient-to-r from-WGS to-WGSDark text-white text-lg font-semibold my-2 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2'
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Checking Eligibility...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Pay with Meal Voucher</span>
            </>
          )}
        </motion.button>

        <motion.button
          onClick={handleStandardCheckout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='w-full p-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-semibold my-2 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2'
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Pay with Card / Other</span>
        </motion.button>
      </div>

      {/* Modals */}
      <ErrorModal />
      <EligibilityModal 
        show={showEligibilityModal}
        onClose={() => setShowEligibilityModal(false)}
        eligibilityResults={eligibilityResults}
        checkoutState={checkoutState}
      />
    </>
  )
}

export default CartTotal