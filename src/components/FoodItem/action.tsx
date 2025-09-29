import React from "react";
import { useStateValue } from "../../context/StateProvider";
import { motion } from "framer-motion";
import { addToCart, deleteFood } from "../../utils/functions";
import { MdAddShoppingCart, MdDeleteForever } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { FoodItem } from "../../../types";

const Action = ({ food, admin }: { food: FoodItem; admin?: boolean }) => {
  const [{ cartItems, foodItems, user }, dispatch] = useStateValue();

  const buttonVariants = {
    hover: { 
      scale: 1.1,
      y: -2,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="flex flex-col gap-3">
      {admin ? (
        <>
          {/* Edit Button */}
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-WGS to-WGSDark flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 group"
            title="Edit Item"
          >
            <BiEditAlt className="text-white text-lg group-hover:scale-110 transition-transform duration-200" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-WGS to-WGSDark opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
          </motion.div>

          {/* Delete Button */}
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            onClick={() => deleteFood(food, foodItems, dispatch)}
            title="Delete Item"
          >
            <MdDeleteForever className="text-white text-lg group-hover:scale-110 transition-transform duration-200 relative z-10" />
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-red-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
          </motion.div>
        </>
      ) : (
        /* Add to Cart Button */
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-WGS to-WGSDark flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          onClick={() => addToCart(cartItems, foodItems, user, food.id, dispatch)}
          title="Add to Cart"
        >
          <MdAddShoppingCart className="text-white text-lg group-hover:scale-110 transition-transform duration-200 relative z-10" />
          
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-WGSDark to-WGS transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-WGS to-WGSDark opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
          
          {/* Success indicator */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.2, opacity: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
          >
            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Action;