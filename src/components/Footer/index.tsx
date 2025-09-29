import { Link } from "react-router-dom";
import { WGS } from "../Assets"; 
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="text-black p-4 sm:p-6 w-full">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          
          {/* Logo and Team Name */}
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex">
              <motion.img
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                src={WGS}
                className="h-10 mr-3"
                alt="WGS Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap">
                Bug-Busters <span className="text-gray-400 font-light">| WGS-Google Hackathon</span>
              </span>
            </Link>
          </div>
          
        </div>
        
        {/* Divider and Copyright */}
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} <a href="#" className="hover:text-teal-400">Bug-Busters™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;