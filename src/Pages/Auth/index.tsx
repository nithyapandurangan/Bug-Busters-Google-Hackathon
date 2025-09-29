import React from 'react';
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { motion } from "framer-motion";

import { useStateValue } from "../../context/StateProvider";
import { AUTHPROVIDER } from "../../Firebase";
import { WGS } from "../../components/Assets"; 

const ProviderAuth = () => {
  const GOOGLE_PROVIDER = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const socialAuth = (provider: GoogleAuthProvider) => {
    if (!user) {
      toast.promise(
        AUTHPROVIDER(provider),
        {
          pending: "Signing in...",
          success: "Signin successful! Welcome!",
          error: "Error Signing in, please try again.",
        }
      )
      .then((result: { refreshToken: string; userData: any }) => {
        const loggedInUser = result.userData;
        dispatch({ type: "SET_USER", user: loggedInUser });
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        navigate("/");
      })
      .catch((error) => toast.error(error.message));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => toast.warn("GitHub Signin is not available yet.")}
        className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all duration-200 text-headingColor font-medium"
      >
        <BsGithub className="w-5 h-5" />
        <span className="text-sm">GitHub</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => socialAuth(GOOGLE_PROVIDER)}
        className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all duration-200 text-headingColor font-medium"
      >
        <FcGoogle className="w-5 h-5" />
        <span className="text-sm">Google</span>
      </motion.button>
    </div>
  );
};

export const ImageBox = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex justify-center"
    >
      <motion.img
        whileHover={{
          rotate: [0, -5, 5, -5, 0],
          scale: 1.05
        }}
        transition={{ duration: 0.6 }}
        src={WGS}
        className="rounded-3xl"
        alt="Chef illustration"
      />
    </motion.div>
  );
};

export default ProviderAuth;