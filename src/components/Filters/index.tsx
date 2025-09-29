import { motion } from "framer-motion";
import Button from "./Button";
import { Categories } from "../../utils/categories";
import { FoodCategory } from "../../../types";
import { BiRestaurant } from "react-icons/bi";

const Filters = ({ filter, setFilter }: { filter: string, setFilter: any }) => {
  return (
    <div className="w-full">
      {/* Filter Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <h3 className="text-xl font-semibold text-headingColor mb-2">Browse Categories</h3>
        <p className="text-textColor">Choose from our variety of delicious food categories</p>
      </motion.div>

      {/* Filters Container - Back to original structure */}
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className="w-full py-10 flex items-center justify-start lg:justify-center h-auto gap-4 md:gap-8 px-2 overflow-x-scroll scrollbar-hidden scroll-smooth"
      >
        {/* All Menu Button */}
        <Button 
          category={{
            id: 666, 
            name: "Menu", 
            urlParam: "all", 
            icon: <BiRestaurant />
          }} 
          filter={filter} 
          setFilter={setFilter} 
        />

        {/* Your existing categories */}
        {Categories.map((category: FoodCategory) => (
          <Button 
            key={category.id}
            category={category} 
            filter={filter} 
            setFilter={setFilter} 
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Filters;