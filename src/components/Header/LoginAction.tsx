import { Link } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { motion } from "framer-motion";

const LoginAction = ({ text, mobile }: { text?: string; mobile?: boolean }) => {
  return (
    <Link to="/login">
      <motion.div
        className={`
          flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer
          transition-all duration-300 group
          ${mobile 
            ? 'bg-gradient-to-r from-WGS/10 to-WGSDark/10 hover:from-WGS/20 hover:to-WGSDark/20' 
            : 'bg-gradient-to-r from-WGS to-WGSDark hover:from-WGSDark hover:to-WGS text-white shadow-lg hover:shadow-xl'
          }
        `}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        <MdLogin className={`
          transition-all duration-300
          ${mobile 
            ? 'text-xl text-WGSDark group-hover:text-WGS' 
            : 'text-lg text-white group-hover:scale-110'
          }
        `} />
        {text && (
          <span className={`
            font-semibold transition-all duration-300
            ${mobile 
              ? 'text-WGSDark group-hover:text-WGS' 
              : 'text-white'
            }
          `}>
            {text}
          </span>
        )}
      </motion.div>
    </Link>
  );
};

export default LoginAction;