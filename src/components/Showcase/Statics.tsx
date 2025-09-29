import React from "react";
import { motion } from "framer-motion";
import { foodItemsStatic } from "../../../types";

const StaticsImages: React.FC<foodItemsStatic> = ({ items }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ 
            scale: 1.05, 
            y: -10,
            transition: { duration: 0.2 }
          }}
          className={`
            absolute cursor-pointer min-h-[120px] lg:min-h-[160px] min-w-[140px] lg:min-w-[180px] 
            drop-shadow-xl p-4 bg-white/95 backdrop-blur-md rounded-2xl 
            flex flex-col items-center justify-center border border-gray-100
            hover:shadow-2xl transition-all duration-300
            ${index === 0 ? 'top-10 right-0' : ''}
            ${index === 1 ? 'bottom-20 left-0' : ''}
            ${index === 2 ? 'top-1/2 -translate-y-1/2 right-0' : ''}
          `}
        >
          {/* Image with enhanced styling */}
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <img
              src={item.imgSrc}
              alt={item.title}
              className="w-16 lg:w-24 -mt-8 lg:-mt-12 drop-shadow-lg"
            />
            {/* Glow effect */}
            <div className="absolute inset-0 -mt-8 lg:-mt-12 bg-gradient-to-r from-WGS/20 to-WGSDark/20 rounded-full blur-xl scale-150 -z-10" />
          </motion.div>

          {/* Content */}
          <div className="text-center space-y-1">
            <p className="text-sm lg:text-base font-bold text-headingColor">{item.title}</p>
            <p className="text-[10px] lg:text-xs text-textColor font-medium">
              {item.desc}
            </p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-xs text-WGSDark font-bold">€</span>
              <span className="text-sm lg:text-base font-bold text-WGSDark">{item.price}</span>
            </div>
          </div>

          {/* Add to cart button on hover */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute -bottom-3 bg-gradient-to-r from-WGS to-WGSDark text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg"
          >
            Add to Cart
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
};

export default StaticsImages;