import { motion } from "framer-motion";
import { MdOutlineFastfood } from "react-icons/md";
import { FoodCategory } from "../../../types";

const Button = ({
  category,
  filter,
  setFilter,
}: {
  category: FoodCategory;
  filter: string;
  setFilter: any;
}) => {
  const isActive = category.urlParam === filter;

  return (
    <motion.div
      onClick={() => setFilter(category.urlParam)}
      whileHover={{ 
        scale: 1.05,
        y: -2,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.95 }}
      className={`
        group relative cursor-pointer rounded-2xl p-6 min-w-[140px] h-[160px]
        flex flex-col gap-4 items-center justify-center
        transition-all duration-300 shadow-lg hover:shadow-2xl
        ${isActive
          ? "bg-gradient-to-br from-WGS to-WGSDark text-white shadow-WGS/25"
          : "bg-white hover:bg-gradient-to-br hover:from-WGS/5 hover:to-WGSDark/5 border border-gray-100"
        }
      `}
    >

      {/* Icon Container */}
      <motion.div
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
        className={`
          relative w-16 h-16 rounded-full flex items-center justify-center
          transition-all duration-300
          ${isActive
            ? "bg-white/20 shadow-lg"
            : "bg-gradient-to-br from-WGS/10 to-WGSDark/10 group-hover:from-WGS/20 group-hover:to-WGSDark/20"
          }
        `}
      >
        {/* Glow Effect */}
        <div className={`
          absolute inset-0 rounded-full blur-xl transition-all duration-300
          ${isActive ? "bg-white/30" : "bg-gradient-to-r from-WGS/20 to-WGSDark/20 group-hover:from-WGS/30 group-hover:to-WGSDark/30"}
        `} />
        
        <span className={`
          relative text-2xl transition-all duration-300
          ${isActive 
            ? "text-white drop-shadow-sm" 
            : "text-WGSDark group-hover:text-WGS group-hover:scale-110"
          }
        `}>
          {category.icon || <MdOutlineFastfood />}
        </span>
      </motion.div>

      {/* Category Name */}
      <div className="text-center">
        <p className={`
          text-sm font-semibold transition-all duration-300
          ${isActive 
            ? "text-white" 
            : "text-headingColor group-hover:text-WGSDark"
          }
        `}>
          {category.name}
        </p>
        
        {/* Active Indicator */}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="w-8 h-1 bg-white/50 rounded-full mx-auto mt-2"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </div>

      {/* Hover Border Effect */}
      <div className={`
        absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none
        ${!isActive ? "group-hover:border-2 group-hover:border-WGS/30" : ""}
      `} />
    </motion.div>
  );
};

export default Button;