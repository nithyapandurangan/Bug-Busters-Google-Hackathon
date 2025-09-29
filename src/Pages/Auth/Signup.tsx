import { Link, useNavigate } from "react-router-dom";
import ProviderAuth, { ImageBox } from "./index"; 
import { toast } from "react-toastify";
import { useState } from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import { EMAILSIGNUP, firebaseAddUser } from "../../Firebase";
import { UserCredential } from "firebase/auth";
import { BiUser, BiLock } from "react-icons/bi";

const Signup = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthSuccess = (userCredential: UserCredential) => {
    const userData = userCredential.user.providerData[0];
    firebaseAddUser(userData);
    dispatch({ type: "SET_USER", user: userData });
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/");
  };

  const emailSignUp = () => {
  if (email && password) {
    if (password.length < 6) {
      toast.warn("Password must be at least 6 characters long");
      return;
    }
    
    toast.promise(
      EMAILSIGNUP(email, password),
      {
        pending: "Creating Account...",
        success: "Signup successful! Welcome!",
        error: {
          render({ data }) {
            // Handle specific Firebase errors
            if (data.code === 'auth/operation-not-allowed') {
              return "Email/Password signup is currently disabled. Please contact support.";
            }
            if (data.code === 'auth/email-already-in-use') {
              return "This email is already registered. Try signing in instead.";
            }
            if (data.code === 'auth/weak-password') {
              return "Password is too weak. Please choose a stronger password.";
            }
            if (data.code === 'auth/invalid-email') {
              return "Please enter a valid email address.";
            }
            return data.message || "Error creating account. Please try again.";
          }
        }
      }
    )
    .then(handleAuthSuccess)
    .catch((error) => {
      console.error("Signup error:", error);
    });
  } else {
    toast.warn("Please fill in all fields.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex justify-center"
          >
            <ImageBox />
          </motion.div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-headingColor mb-2">Create Account</h1>
                <p className="text-textColor">Join us today and start your journey</p>
              </div>

              {/* Social Auth */}
              <div className="mb-6">
                <ProviderAuth />
              </div>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-sm text-textColor font-medium">OR</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              <form onSubmit={(e) => e.preventDefault()}>
                {/* Email Input */}
                <div className="mb-4">
                  <div className="relative">
                    <BiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-WGSDark" />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-WGS focus:ring-2 focus:ring-WGS/20 outline-none transition-all duration-200 text-headingColor placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="mb-6">
                  <div className="relative">
                    <BiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-WGSDark" />
                    <input
                      type="password"
                      placeholder="Password (min. 6 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-WGS focus:ring-2 focus:ring-WGS/20 outline-none transition-all duration-200 text-headingColor placeholder:text-gray-400"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-1">Password must be at least 6 characters</p>
                </div>

                {/* Sign Up Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={emailSignUp}
                  className="w-full py-3 bg-gradient-to-r from-WGS to-WGSDark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-6"
                >
                  Create Account
                </motion.button>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-textColor text-sm mb-4">Already have an account?</p>
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-headingColor font-semibold rounded-xl transition-all duration-300 border border-gray-200"
                    >
                      Sign In
                    </motion.button>
                  </Link>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;