import {
  About,
  Admin,
  Home,
  Login,
  Menu,
  Profile,
  Signup,
} from "./Pages";
import { Cart, Footer, Header } from "./components"; 
import MobileNav from "./components/Header/mobile-nav"; 
import { Route, Routes } from "react-router-dom";
import {
  calculateCartTotal,
  dispatchUsers,
  fetchFoodData,
  fetchUserCartData,
  isAdmin,
} from "./utils/functions";

import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import { useState, useEffect } from "react"; 
import { useStateValue } from "./context/StateProvider";

function App() {
  const [{ showCart, user, foodItems, cartItems, adminMode }, dispatch] =
    useStateValue();

  // State for controlling the mobile navigation now lives here
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    // This effect runs once to fetch initial data
    fetchFoodData(dispatch);
    dispatchUsers(dispatch);
    if (user) {
      fetchUserCartData(user, dispatch);
    }
  }, []);

  useEffect(() => {
    // This effect recalculates the cart total whenever items change
    if (foodItems && cartItems.length > 0) {
      calculateCartTotal(cartItems, foodItems, dispatch);
    }
  }, [cartItems, foodItems, dispatch]);
  
  return (
    <AnimatePresence>
      <div className="w-screen h-auto min-h-[100vh] flex flex-col bg-primary">
        <ToastContainer
          position="top-right"
          autoClose={4000}
          theme="light"
        />

        {/* Conditionally render the Cart and MobileNav */}
        {showCart && <Cart />}
        {isMobileNavOpen && <MobileNav onClose={() => setIsMobileNavOpen(false)} />}

        {/* Conditionally render the Header and pass it the function to open the menu */}
        {!(adminMode && isAdmin(user)) && <Header onMenuClick={() => setIsMobileNavOpen(true)} />}
        
        <main
          className={`${
            !(adminMode && isAdmin(user)) &&
            "mt-16 md:mt-20 px-3 md:px-8 md:py-6 py-4"
          } w-full h-auto`}
        >
          <Routes>
            {/* Specific routes come first */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> {/* Corrected path */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />

            {/* The main page and catch-all routes go last */}
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </main>
        
        {!(adminMode && isAdmin(user)) && <Footer />}
      </div>
    </AnimatePresence>
  );
}

export default App;