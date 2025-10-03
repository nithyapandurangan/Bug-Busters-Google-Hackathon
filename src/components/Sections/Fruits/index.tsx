import { PrevNext as PrevNextButtons, Title } from ".."
import Container from "../../Container"
import { FilterFood } from "../../../utils/filters"
import { useState } from "react"
import { motion } from "framer-motion"
import { useStateValue } from "../../../context/StateProvider";

const Fruits = () => {
   const [{ foodItems }] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  const fruits = FilterFood(foodItems, "fruits");
  return (
    <section className="w-full py-10">
      <div className="w-full mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6"
        >
          <div className="flex flex-col gap-3">
            {/* Enhanced Title */}
            <Title title="Our fresh & healthy fruits" />
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-textColor text-lg max-w-md py-4"
            >
              Handpicked fresh fruits delivered daily. Packed with nutrients and bursting with natural flavors.
            </motion.p>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex gap-6 mt-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-WGS to-WGSDark"></div>
                <span className="text-sm text-textColor font-medium">100% Organic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-WGS to-WGSDark"></div>
                <span className="text-sm text-textColor font-medium">Farm Fresh</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-WGS to-WGSDark"></div>
                <span className="text-sm text-textColor font-medium">Daily Delivery</span>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <PrevNextButtons 
              onNext={() => setScrollValue(10000)} 
              onPrev={() => setScrollValue(-10000)} 
            />
           
          </motion.div>
        </motion.div>

        {/* Products Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Container 
            className="bg-transparent" 
            scrollOffset={scrollValue} 
            items={fruits} 
          />
        </motion.div>

        {/* Mobile View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="md:hidden flex justify-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-WGS to-WGSDark text-white px-8 py-4 rounded-xl font-semibold shadow-lg"
          >
            <span>View All Fruits</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Fruits