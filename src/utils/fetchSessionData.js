import { firebaseGetAllUsers } from "../Firebase";

export const fetchSessionUser = () => {
  // 1. Get the data from localStorage
  const userStr = localStorage.getItem("user");

  // 2. Check if data exists. If not, return null.
  if (!userStr || userStr === "undefined") {
    return null;
  }

  // 3. Safely try to parse the JSON
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null; // Return null if JSON is invalid
  }
};

export const fetchSessionCart = () => {
  // 1. Get the data from localStorage
  const cartStr = localStorage.getItem("cartItems");

  // 2. Check if data exists. If not, return an empty array.
  if (!cartStr || cartStr === "undefined") {
    return [];
  }

  // 3. Safely try to parse the JSON
  try {
    const cartItems = JSON.parse(cartStr);
    // Ensure it's an array before returning
    return Array.isArray(cartItems) ? cartItems : [];
  } catch (error) {
    console.error("Error parsing cartItems from localStorage:", error);
    return []; // Return an empty array if JSON is invalid
  }
};

export const fetchSessionUserMode = () => {
  // 1. Get the data from localStorage
  const adminModeStr = localStorage.getItem("userMode");

  // 2. Check if data exists. If not, return false.
  if (!adminModeStr || adminModeStr === "undefined") {
    return false;
  }
  
  // 3. Safely try to parse the JSON
  try {
    // We expect a boolean (true/false)
    const adminMode = JSON.parse(adminModeStr);
    return typeof adminMode === 'boolean' ? adminMode : false;
  } catch (error) {
    console.error("Error parsing userMode from localStorage:", error);
    return false; // Return false if JSON is invalid
  }
};