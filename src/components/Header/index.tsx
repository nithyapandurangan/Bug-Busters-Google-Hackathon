import { Avatar, WGS } from "../Assets";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import LoginAction from "./LoginAction";
import Navigations from "./Navigations";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useState } from "react";
import { useStateValue } from "../../context/StateProvider";

// FIX 1: Define the props interface for the component
interface HeaderProps {
  onMenuClick: () => void;
}

// FIX 2: The component now accepts the onMenuClick prop
const Header = ({ onMenuClick }: HeaderProps) => {
  const [{ user }] = useStateValue();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // State for the user dropdown only

  // FIX 3: Removed the old isOpenMobileNav state. It now lives in App.tsx

  return (
    <header className="w-screen fixed z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
      {/* Tablet and Desktop */}
      <div className="hidden md:flex w-full justify-between items-center px-4 md:px-8 lg:px-16 py-4">
        {/* Logo */}
        <Link to={"/"}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <img src={WGS} alt="Logo" className="md:w-8 lg:w-10 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-WGS to-WGSDark opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
            </div>
            <div>
              <p className="text-headingColor md:text-lg lg:text-xl font-bold group-hover:text-WGSDark transition-colors duration-300">
                WGS-Google Food
              </p>
              <p className="text-xs text-textColor hidden lg:block">Fast & Fresh Delivery</p>
            </div>
          </motion.div>
        </Link>

        {/* Navigation */}
        <Navigations />

        {/* User Section */}
        {user ? (
          <div 
            className="relative group flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all duration-300"
            onMouseEnter={() => setIsUserMenuOpen(true)}
            onMouseLeave={() => setIsUserMenuOpen(false)}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center gap-2 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={user.photoURL || Avatar}
                  className="w-10 h-10 rounded-xl shadow-md object-cover border-2 border-transparent group-hover:border-WGS/30 transition-all duration-300"
                  alt="profile"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-WGS/20 to-WGSDark/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden lg:flex flex-col">
                <p className="text-sm font-semibold text-headingColor">
                  {user.displayName?.split(' ')[0] || 'User'}
                </p>
                <p className="text-xs text-textColor">Welcome back!</p>
              </div>
              <RiArrowDropDownLine className="text-textColor group-hover:text-WGSDark transition-colors text-xl" />
            </motion.div>
            {isUserMenuOpen && <DropDown user={user} />}
          </div>
        ) : (
          <LoginAction text={"Login"} />
        )}
      </div>

      {/* Mobile */}
      <motion.div
        className="flex md:hidden w-full items-center justify-between p-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Menu Button */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 rounded-xl bg-gradient-to-r from-WGS/10 to-WGSDark/10 flex items-center justify-center cursor-pointer"
          onClick={onMenuClick} // FIX 4: Use the onMenuClick prop passed from App.tsx
        >
          <HiOutlineMenuAlt2 className="text-WGSDark text-2xl" />
        </motion.div>

        {/* Mobile Logo */}
        <Link to={"/"}>
          <motion.div className="flex items-center gap-2 cursor-pointer">
            <img src={WGS} alt="Logo" className="w-8 object-cover" />
            <p className="text-headingColor text-lg font-bold">WGS-Google Food</p>
          </motion.div>
        </Link>

        {/* User Section */}
        {user ? (
          <div className="relative">
            <motion.img
              src={user?.photoURL || Avatar}
              className="w-10 h-10 rounded-xl shadow-md cursor-pointer object-cover"
              alt="user-profile"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} // Toggle user menu on click for mobile
            />
            {isUserMenuOpen && <DropDown user={user} />}
          </div>
        ) : (
          <LoginAction mobile />
        )}
      </motion.div>
    </header>
  );
};

export default Header;