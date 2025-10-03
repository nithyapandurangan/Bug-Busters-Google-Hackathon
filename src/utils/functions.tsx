import { randomUUID } from "crypto";
import { FoodItem, cartItem, User } from "../../types";
import {
  firebaseAddToCart,
  firebaseDeleteCartItem,
  firebaseDeleteFood,
  firebaseEmptyUserCart,
  firebaseFetchAllCartItems,
  firebaseFetchFoodItems,
  firebaseGetAllUsers,
  firebaseGetUser,
  firebaseLogout,
  firebaseUpdateCartItem,
  firebaseUpdateUser,
} from "../Firebase";

import { MdShoppingBasket } from "react-icons/md";
import { toast } from "react-toastify";

export const addToCart = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  user: User,
  fid: number,
  dispatch: any
) => {
  if (!user) {
    toast.error("Please login to add items to cart");
  } else {
    if (cartItems.some((item: cartItem) => item.fid === fid)) {
      toast.error("Item already in cart");
    } else {
      const itemDetails = foodItems.find((item: FoodItem) => item.id === fid); 
      const data = { // Note: We don't need a client-side ID here anymore
        fid: fid,
        uid: user.uid,
        qty: 1,
        itemname : itemDetails?.title || "",
        itemcategory : itemDetails?.category || ""
      };
      
      try {
    await firebaseAddToCart(data);
    // After a successful add, re-fetch all cart data to ensure the
    // local state is in sync with the database, including the correct Firestore ID.
    await fetchUserCartData(user, dispatch);
  } catch (error) {
    console.error("Failed to add item to cart:", error);
  }
    }
  }
};

export const dispatchtUserCartItems = (
  uid: string,
  items: cartItem[],
  dispatch: any
) => {
  const cartItems = items.filter((item: cartItem) => item.uid === uid);
  dispatch({
    type: "SET_CARTITEMS",
    cartItems: cartItems,
  });

  return cartItems;
};

export const fetchUserCartData = async (user: any, dispatch: any) => {
  if (user) {
    await firebaseFetchAllCartItems()
      .then((data) => {
        const userCart = dispatchtUserCartItems(user.uid, data, dispatch);
        localStorage.setItem("cartItems", JSON.stringify(userCart));
      })
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  } else {
    localStorage.setItem("cartItems", "undefined");
  }
};

export const fetchFoodData = async (dispatch: any) => {
  await firebaseFetchFoodItems()
    .then((data) => {
      dispatch({
        type: "SET_FOOD_ITEMS",
        foodItems: data,
      });
    })
    .then(() => {})
    .catch((e) => {
      console.log(e);
    });
};

export const getFoodyById = (menu: FoodItem[], fid: number) => {
  return menu.find((item: FoodItem) => item.id === fid);
};

//  Update cart item State
export const updateCartItemState = async (
  cartItems: cartItem[],
  item: cartItem,
  dispatch: any
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems[index] = item;
  }
  dispatch({
    type: "SET_CARTITEMS",
    cartItems: cartItems,
  });
  await firebaseUpdateCartItem(item)
    .then(() => {})
    .catch((e) => {
      console.log(e);
    });
};

// Update Cart Item Quantity
export const updateCartItemQty = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  item: cartItem,
  dispatch: any,
  val: number
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems[index].qty += val;
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: cartItems,
    });
    calculateCartTotal(cartItems, foodItems, dispatch);
    await firebaseUpdateCartItem(cartItems[index])
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  }
};

//  Delete Cart Item
export const deleteCartItem = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  item: cartItem,
  dispatch: any
) => {
  try {
    await firebaseDeleteCartItem(item);

    const newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: newCartItems,
    });

    calculateCartTotal(newCartItems, foodItems, dispatch);
    
  } catch (e) {
    console.error("Error removing item:", e);
    toast.error("Failed to remove item. Please try again.");
  }
};

// Calculate Total Price Round to 2 decimal places
export const calculateCartTotal = (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  dispatch: any
) => {
  let total = 0;
  cartItems.forEach((item: cartItem) => {
    const foodItem = getFoodyById(foodItems, item.fid);
    total += item.qty * parseFloat(foodItem?.price || "0");
  });
  dispatch({
    type: "SET_CART_TOTAL",
    cartTotal: total.toFixed(2),
  });
};

export const emptyCart = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  dispatch: any
) => {
  // First, check if the cart has items.
  if (!cartItems || cartItems.length === 0) {
    toast.warn("Cart is already empty");
    return;
  }

  try {
    // 1. Await the Firebase operation to complete successfully.
    await firebaseEmptyUserCart(cartItems);

    // 2. If successful, now update the local state to match.
    dispatch({
      type: "SET_CARTITEMS", 
      cartItems: [],
    });
    
    // 3. Recalculate the total with an empty array to set it to 0.
    calculateCartTotal([], foodItems, dispatch);

    toast.success("Cart cleared successfully!");

  } catch (e) {
    // 4. If the Firebase operation fails, log the error and notify the user.
    // The local state is NOT changed, so the cart items remain visible.
    console.error("Error clearing cart from Firebase:", e);
    toast.error("Failed to clear cart. Please try again.");
  }
};


// Hide Cart
export const hideCart = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_CART",
    showCart: !true,
  });
};

// Hide Cart
export const hideContactform = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_CONTACT_FORM",
    showContactForm: !true,
  });
};

export const shuffleItems = (items: any) => {
  let currentIndex = items.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [items[currentIndex], items[randomIndex]] = [
      items[randomIndex],
      items[currentIndex],
    ];
  }

  return items;
};

export const logout = async (user: any, dispatch: any, navigate: any) => {
  if (user) {
    await firebaseLogout()
      .then(() => {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        dispatch({
          type: "SET_CARTITEMS",
          cartItems: [],
        });
        // turn off adminMode
        dispatch({
          type: "SET_ADMIN_MODE",
          adminMode: false,
        });

        localStorage.setItem("user", "undefined");
        localStorage.setItem("adminMode", "undefined");
        localStorage.removeItem("cartItems");
        navigate("/");
      })
      .catch((e: any) => {
        console.log(e);
      });
  } else {
    console.log("You are not logged in");
  }
};

export const ToggleAdminMode = (dispatch: any, state: boolean) => {
  dispatch({
    type: "SET_ADMIN_MODE",
    adminMode: state,
  });
  localStorage.setItem("adminMode", JSON.stringify(state));
  console.log(state);
};

export const isAdmin = (user: any) => {
  let isAdmin =user?.email == "bentilshadrack72@gmail.com" || user?.email == "admin@test.com"
  return isAdmin
};

// get user
export const getUserData = async (user: any) => {
  return await firebaseGetUser(user.uid);
};

// update currentUser
export const updateUserData = async (
  user: any,
  dispatch: any,
  alert: boolean
) => {
  await firebaseUpdateUser(user)
    .then(() => {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    })
    .catch((e: any) => {
      console.log(e);
    })
    .then(() => {
      localStorage.setItem("user", JSON.stringify(user));
      alert && toast.success("User data updated successfully");
    });
};

// get all users
export const dispatchUsers = async (dispatch: any) => {
  await firebaseGetAllUsers()
    .then((users: any) => {
      dispatch({
        type: "SET_USERS",
        users: users,
      });
    })
    .catch((e: any) => {
      console.log(e);
    }); 
}
export const getAllUser = async() => {
   await firebaseGetAllUsers().then((users: any) => {
    return users
   }).catch((e:any) => {
    console.log(e)
   })
}
// delete food
export const deleteFood = async (
  food: FoodItem,
  foodItems: FoodItem[],
  dispatch: any
) => {
  await firebaseDeleteFood(food.id);
  // remove food from foodItems
  const foodIndex = foodItems.indexOf(food);
  if(foodIndex !== -1)
  {
    foodItems.splice(foodIndex, 1)
  }
  dispatch ({
    type: "SET_FOOD_ITEMS",
    foodItems
  })
  toast.success("Food deleted successfully");
};

