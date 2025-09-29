import React from "react";
import { motion } from "framer-motion";
import Menu from "../Sections/Menu";

const Left = () => {
  return (
    <div className="py-8 flex-1 flex flex-col items-start justify-center gap-6">

      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-tight text-headingColor leading-tight">
          The Fastest
          <br />
          <span className="bg-gradient-to-r from-WGS to-WGSDark bg-clip-text text-transparent">
            Food Delivery
          </span>
          <br />
          in France
        </h1>
      </motion.div>

      {/* Description */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-lg text-textColor md:text-left md:w-[90%] leading-relaxed"
      >
        Experience the ultimate convenience with our lightning-fast food delivery
        service. Savor your favorite meals from local restaurants, delivered to
        your doorstep in record time.
      </motion.p>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex gap-8 my-4"
      >
        <div className="text-center">
          <p className="text-2xl font-bold text-WGSDark">15min</p>
          <p className="text-sm text-textColor">Avg Delivery</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-WGSDark">500+</p>
          <p className="text-sm text-textColor">Restaurants</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-WGSDark">4.9★</p>
          <p className="text-sm text-textColor">User Rating</p>
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const menuSection = document.getElementById('menu');
            if (menuSection) {
              menuSection.scrollIntoView({ behavior: 'smooth' });
            } else {
              console.error("Menu section not found");
            }
          }}
          className="bg-gradient-to-r from-WGS to-WGSDark text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>View Menu</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Left;