import { FoodItem } from "../../types";

export const FilterFood = (foodItems: FoodItem[], category: string) => {
if (!Array.isArray(foodItems)) {
    return [];
  }
  
  return foodItems.filter((item: FoodItem) => {
    // Use optional chaining, trim(), and toLowerCase() for a super safe comparison
    return item?.category?.trim().toLowerCase() === category.toLowerCase();
  });
};

export const GetFoodById = (foodItems: FoodItem[], id: number) => {
  return foodItems?.find((item: FoodItem) => item.id === id);
};