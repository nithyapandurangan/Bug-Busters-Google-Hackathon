import { BiUser, BiCreditCard } from "react-icons/bi";
import { BsPhone, BsCalendarEvent } from "react-icons/bs";
import { FaGlobeEurope } from "react-icons/fa";
import {
  MdOutlineDataSaverOn,
  MdClear,
  MdSecurity,
} from "react-icons/md";

import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { Loader } from "../../components";
import { updateUserData } from "../../utils/functions";

const UpdateProfile = () => {
  const [{ user }, dispatch] = useStateValue();

  // State
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [btnText, setBtnText] = useState("Save Changes");

  // State for Meal Voucher Details
  const [voucherProvider, setVoucherProvider] = useState(user.mealVoucherDetails?.provider || '');
  const [voucherCardNumber, setVoucherCardNumber] = useState(user.mealVoucherDetails?.cardNumber || '');
  const [voucherExpiry, setVoucherExpiry] = useState(user.mealVoucherDetails?.expiryDate || '');
  const [voucherCountry, setVoucherCountry] = useState(user.mealVoucherDetails?.country || 'FR');

  const saveChanges = async () => {
    setBtnText("Saving...");
    if (!displayName || phoneNumber.length < 10) {
      toast.error("Please fill out your name and a valid phone number.");
      setBtnText("Save Changes");
      return;
    }

    const mealVoucherDetails = {
        provider: voucherProvider,
        cardNumber: voucherCardNumber,
        expiryDate: voucherExpiry,
        country: voucherCountry,
    };

    const data = {
      ...user,
      displayName,
      phoneNumber,
      mealVoucherDetails,
    };

    await updateUserData(data, dispatch, true);
    setBtnText("Save Changes");
  };

  const clearVoucherDetails = async () => {
    const confirmClear = window.confirm("Are you sure you want to clear all meal voucher details?");
    if (!confirmClear) return;

    setVoucherProvider('');
    setVoucherCardNumber('');
    setVoucherExpiry('');
    setVoucherCountry('FR');

    const data = {
      ...user,
      mealVoucherDetails: {
        provider: '',
        cardNumber: '',
        expiryDate: '',
        country: 'FR',
      },
    };

    await updateUserData(data, dispatch, false);
    toast.success("Meal voucher details cleared successfully!");
  };

  const validateNumber = (value: any) => {
    if (isNaN(value)) {
      toast.error("Please enter a valid phone number", { toastId: 123 });
      return "";
    }
    return value;
  };

  const formatExpiry = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length >= 2) {
      return numericValue.slice(0, 2) + '/' + numericValue.slice(2, 4);
    }
    return numericValue;
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setVoucherExpiry(formatted);
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-headingColor mb-2">Profile Settings</h1>
          <p className="text-textColor">Update your personal and payment information</p>
        </div>

        {/* Personal Details */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-headingColor mb-4 flex items-center gap-2">
            <BiUser className="text-WGS" />
            Personal Information
          </h2>
          
          <div className="space-y-4">
            {/* Full Name */}
            <div className="w-full py-3 border-b border-gray-300 flex items-center gap-2">
              <BiUser className="text-xl text-WGSDark" />
              <input 
                type="text" 
                required 
                placeholder="Enter full name" 
                autoFocus
                className="h-full w-full bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)} 
              />
            </div>

            {/* Phone Number */}
            <div className="w-full py-3 border-b border-gray-300 flex items-center gap-2">
              <BsPhone className="text-xl text-WGSDark" />
              <input 
                type="text" 
                required 
                placeholder="Phone Number" 
                maxLength={10}
                className="h-full w-full bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(validateNumber(e.target.value))} 
              />
            </div>

            {/* Email (Read Only) */}
            <div className="w-full py-3 border-b border-gray-300 flex items-center gap-2">
              <MdSecurity className="text-xl text-gray-400" />
              <input 
                type="email" 
                readOnly
                value={user?.email || ''}
                className="h-full w-full bg-transparent pl-2 text-gray-500 outline-none border-none cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Meal Voucher Details */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-headingColor flex items-center gap-2">
              <BiCreditCard className="text-orange-500" />
              Meal Voucher Details
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearVoucherDetails}
              className="flex items-center gap-2 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all duration-200 text-sm"
            >
              <MdClear className="w-4 h-4" />
              Clear
            </motion.button>
          </div>

          <div className="space-y-4">
            {/* Provider */}
            <div className="w-full py-3 border-b border-gray-300 flex items-center gap-2">
              <MdOutlineDataSaverOn className="text-xl text-orange-600" />
              <select
                className="w-full bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                value={voucherProvider}
                onChange={(e) => setVoucherProvider(e.target.value)}
              >
                <option value="" disabled className="bg-white text-gray-800">Select Provider</option>
                <option value="Edenred" className="bg-white text-gray-800">Edenred</option>
                <option value="Sodexo" className="bg-white text-gray-800">Sodexo</option>
                <option value="Groupe Up" className="bg-white text-gray-800">Groupe Up</option>
                <option value="Bimpli" className="bg-white text-gray-800">Bimpli</option>
              </select>
            </div>

            {/* Card Number */}
            <div className="w-full py-3 border-b border-gray-300 flex items-center gap-2">
              <BiCreditCard className="text-xl text-orange-600" />
              <input 
                type="text" 
                placeholder="Card Number" 
                maxLength={16}
                className="h-full w-full bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
                value={voucherCardNumber} 
                onChange={(e) => setVoucherCardNumber(e.target.value)}
              />
            </div>

            {/* Expiry and Country */}
            <div className="w-full flex items-center gap-4">
              <div className="w-1/2 py-3 border-b border-gray-300 flex items-center gap-2">
                <BsCalendarEvent className="text-xl text-orange-600" />
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  maxLength={5}
                  className="h-full w-full bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
                  value={voucherExpiry} 
                  onChange={handleExpiryChange}
                />
              </div>
              <div className="w-1/2 py-3 border-b border-gray-300 flex items-center gap-2">
                <FaGlobeEurope className="text-xl text-orange-600" />
                <select
                  className="w-full bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                  value={voucherCountry}
                  onChange={(e) => setVoucherCountry(e.target.value)}
                >
                  <option value="FR" className="bg-white text-gray-800">🇫🇷 France</option>
                  <option value="DE" className="bg-white text-gray-800">🇩🇪 Germany</option>
                  <option value="ES" className="bg-white text-gray-800">🇪🇸 Spain</option>
                </select>
              </div>
            </div>

            {/* Security Note */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-4">
              <div className="flex items-center gap-2">
                <MdSecurity className="text-orange-600 text-sm" />
                <p className="text-orange-700 text-sm">
                  Your voucher details are encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="w-full flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-WGS to-WGSDark text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={saveChanges}
            disabled={loading}
          >
            <MdOutlineDataSaverOn className="w-5 h-5" />
            {btnText}
          </motion.button>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <Loader progress="Saving..." />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;