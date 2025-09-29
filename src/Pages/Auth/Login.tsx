import { Link, useNavigate } from "react-router-dom";
import ProviderAuth, { ImageBox } from ".";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { EMAILSIGNIN } from "../../Firebase";
import { BiUser, BiLock } from "react-icons/bi";

const Login = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailSignIn = () => {
    if (email && password) {
      toast.promise(
        EMAILSIGNIN(email, password),
        {
          pending: "Signing in...",
          success: "Signin successful! Welcome back!",
          error: "Error signing in. Please check your email and password.",
        }
      )
      .then((userData) => {
        dispatch({
          type: "SET_USER",
          user: userData,
        });
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    } else {
      toast.warn("Please fill all the fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
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

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-headingColor mb-2">Welcome Back</h1>
                <p className="text-textColor">Sign in to your account</p>
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
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-WGS focus:ring-2 focus:ring-WGS/20 outline-none transition-all duration-200 text-headingColor placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right mb-6">
                <Link
                  to="/"
                  className="text-WGS hover:text-WGSDark text-sm font-medium transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={emailSignIn}
                className="w-full py-3 bg-gradient-to-r from-WGS to-WGSDark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-6"
              >
                Sign In
              </motion.button>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-textColor text-sm mb-4">Don't have an account?</p>
                <Link to="/Signup">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-headingColor font-semibold rounded-xl transition-all duration-300 border border-gray-200"
                  >
                    Create Account
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;