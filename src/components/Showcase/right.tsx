import React from 'react'
import StaticsImages from './Statics'
import { data } from '../../utils/showcaseStatic'
import { motion } from 'framer-motion'
import { WGS } from '../Assets'

const Right = () => {
  return (
    <div className="hidden md:flex py-8 flex-1 flex items-center justify-center relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-WGS/20 to-WGSDark/20"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-WGSDark/20 to-WGS/20"
        />
      </div>

      {/* Main Image Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10"
      >
        <div className="relative lg:h-[600px] h-[500px] w-full lg:w-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-WGS to-WGSDark" />     
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        
        {/* Floating Stats Cards */}
        <StaticsImages items={data} />
      </motion.div>

      {/* Decorative dots */}
      <div className="absolute top-20 left-10 grid grid-cols-3 gap-2">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            className="w-2 h-2 rounded-full bg-WGS/30"
          />
        ))}
      </div>
    </div>
  )
}

export default Right