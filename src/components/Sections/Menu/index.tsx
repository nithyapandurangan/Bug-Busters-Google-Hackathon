import { useEffect, useState } from "react";
import Container from "../../Container";
import { FilterFood } from "../../../utils/filters";
import Filters from "../../Filters";
import { Title } from "..";
import { useStateValue } from "../../../context/StateProvider";
import { motion } from "framer-motion";

const Menu = ({ title }: { title?: string }) => {
  const [scrollValue, setScrollValue] = useState(0);
  const [{ foodItems }, dispatch] = useStateValue();
  const [filter, setFilter] = useState<string>("all");

  // Get filtered items using your existing FilterFood function
   const filteredItems = foodItems 
    ? (filter === "all" ? foodItems : FilterFood(foodItems, filter))
    : [];

  return (
    <section className="w-full py-16" id="menu">
      <div className="w-full pl-4 pr-4 md:pl-8 md:pr-8 lg:pl-16 lg:pr-8 xl:pl-20 xl:pr-16">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full flex flex-col items-start mb-12 gap-6 max-w-[1400px]"
        >
          <div className="flex flex-col gap-3">

            {/* Enhanced Title */}
            <Title title={title || "Our Products"} />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-textColor text-lg max-w-2xl py-6"
            >
              Discover our carefully curated menu featuring authentic flavors and premium ingredients along with our high-quality apparel, cosmetics for men and women. We have something for everyone!
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 md:gap-6 mt-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-WGS to-WGSDark"></div>
                <span className="text-sm text-textColor font-medium">
                  {filteredItems?.length || 0} Items Available
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-WGS to-WGSDark"></div>
                <span className="text-sm text-textColor font-medium">Fresh Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-WGS to-WGSDark"></div>
                <span className="text-sm text-textColor font-medium">Made to Order</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-[1400px] mb-8"
        >
          <Filters filter={filter} setFilter={setFilter} />
        </motion.div>

        {/* Enhanced Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-[1400px]"
        >
          <Container
            className="bg-transparent"
            col
            scrollOffset={scrollValue}
            items={filteredItems}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;