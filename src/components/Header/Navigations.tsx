import { Link, useLocation } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";

const Navigations = ({ direction }: { direction?: string }) => {
  const [{ showContactForm, cartItems }, dispatch] = useStateValue();
  const location = useLocation();

  const handleToggleCart = () => {
    dispatch({
      type: "TOGGLE_CART",
      showCart: true,
    });
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Menu", path: "/menu" },
    { label: "About us", path: "/about" }
  ];

  return (
    <div className="flex items-center gap-8">
      <motion.ul
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.1 }}
        className={`flex items-center gap-6 ${direction && direction}`}
      >
        {navItems.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
            className="relative"
          >
            <Link
              to={item.path}
              className={`
                md:text-sm lg:text-base font-medium cursor-pointer
                transition-all duration-300 px-3 py-2 rounded-lg
                ${location.pathname === item.path
                  ? 'text-WGSDark bg-gradient-to-r from-WGS/10 to-WGSDark/10'
                  : 'text-textColor hover:text-WGSDark hover:bg-gray-50'
                }
              `}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-WGS to-WGSDark rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      {/* Cart Button */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="relative flex items-center justify-center cursor-pointer group"
        onClick={handleToggleCart}
      >
        <div className="relative p-3 rounded-xl">
          <MdShoppingBasket className="text-xl text-WGSDark" />
          
          {/* Cart Count Badge */}
          {cartItems && cartItems.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center shadow-lg"
            >
              <p className="text-xs text-white font-bold">
                {cartItems.length}
              </p>
            </motion.div>
          )}
          
        </div>
      </motion.div>
    </div>
  );
};

export default Navigations;