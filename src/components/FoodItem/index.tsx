import { FoodItem } from "../../../types";
import { motion } from "framer-motion";
import Action from "./action";

export const SingleFoodItem = ({
  item,
  col,
  admin,
  index = 0
}: {
  item: FoodItem;
  col?: boolean;
  admin?: boolean;
  index?: number;
}) => {
  const { id, title, price, calories, imageURL, description } = item;

  return (
    <motion.div
      whileHover={{ 
        y: -4,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${!col ? "w-[260px] min-w-[260px]" : "w-[280px] min-w-[280px]"}
        md:w-[280px] md:min-w-[280px] 
        ${col ? "my-4" : "my-3"} 
        h-auto bg-white rounded-xl shadow-md hover:shadow-lg 
        border border-gray-100 overflow-hidden
        cursor-pointer transition-all duration-300 group
        hover:border-WGS/20
      `}
    >
      {/* Image Section */}
      <div className="relative w-full h-36 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-WGS"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-WGSDark"></div>
        </div>

        {/* Food Image */}
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          alt={description}
          src={imageURL}
        />

        {/* Action Button */}
        <div className="absolute top-3 right-3">
          <Action food={item} admin={admin} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title and Description */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-headingColor mb-1 group-hover:text-WGSDark transition-colors duration-300 line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-textColor leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Calories (Admin only) */}
        {admin && (
          <div className="mb-3">
            <div className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
              <span className="text-xs text-WGSDark">🔥</span>
              <span className="text-xs text-textColor font-medium">{calories} cal</span>
            </div>
          </div>
        )}

        {/* Price and Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold text-headingColor">
              <span className="text-sm text-WGSDark font-medium">€</span>
              {price}
            </span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xs">★</span>
              ))}
            </div>
            <span className="text-xs text-textColor">(4.5)</span>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-WGS/5 to-WGSDark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  );
};