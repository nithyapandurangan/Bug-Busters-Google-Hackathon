import { MdOutlineRestaurantMenu, MdShoppingBasket, MdHome, MdRestaurant, MdInfo } from "react-icons/md";
import { Link } from "react-router-dom";
import { WGS } from "../Assets";
import { motion, AnimatePresence } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";

// FIX 1: Update the props interface to accept 'onClose'
interface MobileNavProps {
  onClose: () => void;
}

const MobileNav = ({ onClose }: MobileNavProps) => {
  const [{ showCart, cartItems }, dispatch] = useStateValue();
  
  const handleToggleCart = () => {
    dispatch({
      type: "TOGGLE_CART",
      showCart: !showCart,
    });
    onClose(); // Close the nav after opening the cart
  };

  const navItems = [
    { label: "Home", path: "/", icon: <MdHome /> },
    { label: "Menu", path: "/menu", icon: <MdRestaurant /> },
    { label: "About", path: "/about", icon: <MdInfo /> }
  ];

  const containerVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring", stiffness: 300, damping: 30,
        staggerChildren: 0.1, delayChildren: 0.2
      }
    },
    exit: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    // FIX 2: We don't need AnimatePresence here because the parent (App.tsx) already handles it.
    // The component will still animate correctly based on its variants.
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-white z-[101] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <motion.div
          variants={itemVariants}
          whileTap={{ scale: 0.9 }}
          className="relative p-3 rounded-xl bg-gradient-to-r from-WGS/10 to-WGSDark/10 cursor-pointer"
          onClick={handleToggleCart}
        >
          <MdShoppingBasket className="text-2xl text-WGSDark" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
              <p className="text-xs text-white font-bold">{cartItems.length}</p>
            </div>
          )}
        </motion.div>

        {/* Close Button */}
        <motion.div
          variants={itemVariants}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 cursor-pointer"
          onClick={onClose} // FIX 3: Use the 'onClose' prop
        >
          <MdOutlineRestaurantMenu className="text-2xl text-headingColor" />
        </motion.div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col justify-center px-8 space-y-6">
        {navItems.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link
              to={item.path}
              onClick={onClose} // FIX 4: Use the 'onClose' prop
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-WGS/10 hover:to-WGSDark/10 transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-gradient-to-r from-WGS/10 to-WGSDark/10 group-hover:from-WGS/20 group-hover:to-WGSDark/20">
                <span className="text-WGSDark text-xl">{item.icon}</span>
              </div>
              <span className="text-xl font-semibold text-headingColor group-hover:text-WGSDark">
                {item.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Logo Section */}
      <motion.div
        variants={itemVariants}
        className="p-8 border-t border-gray-100"
      >
        <Link
          to="/"
          onClick={onClose} // FIX 5: Use the 'onClose' prop
          className="flex items-center justify-center gap-3 group"
        >
          <div className="relative">
            <img src={WGS} alt="Logo" className="w-12 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-WGS to-WGSDark opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-headingColor group-hover:text-WGSDark">
              WGS Food
            </p>
            <p className="text-sm text-textColor">Fast & Fresh Delivery</p>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default MobileNav;