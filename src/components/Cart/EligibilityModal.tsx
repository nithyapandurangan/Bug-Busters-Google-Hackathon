import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useStateValue } from '../../context/StateProvider';
import { useState } from 'react';
import { EligibilityResponse, EligibilityItem } from './CartTotal';

// Define props for this component
interface EligibilityModalProps {
  show: boolean;
  onClose: () => void;
  eligibilityResults: EligibilityResponse | null;
  checkoutState: (state: boolean) => void;
}

const EligibilityModal = ({ show, onClose, eligibilityResults, checkoutState }: EligibilityModalProps) => {
  const [{ cartTotal, foodItems }, dispatch] = useStateValue();
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  if (!show || !eligibilityResults) return null;

  // Data Processing
  const eligibleItems = eligibilityResults.items.filter(item => item.isEligible);
  const nonEligibleItems = eligibilityResults.items.filter(item => !item.isEligible);
  
  const dressItems = nonEligibleItems.filter(item => item.itemcategory.toLowerCase() === 'dress');
  const cosmeticsItems = nonEligibleItems.filter(item => item.itemcategory.toLowerCase() === 'cosmetics');
  const otherNonEligibleItems = nonEligibleItems.filter(
    item => item.itemcategory.toLowerCase() !== 'dress' && item.itemcategory.toLowerCase() !== 'cosmetics'
  );

  const hasEligibleItems = eligibleItems.length > 0;
  const DAILY_VOUCHER_LIMIT = 25.00;
  
  let eligibleSubtotal = 0;
  eligibleItems.forEach(eligibleItem => {
    const fullItemDetails = foodItems.find((food: { id: number; price: number; }) => food.id === eligibleItem.fid);
    if (fullItemDetails) {
      eligibleSubtotal += fullItemDetails.price * eligibleItem.qty;
    }
  });

  const amountPayableByVoucher = Math.min(eligibleSubtotal, DAILY_VOUCHER_LIMIT);

  // Event Handlers
  const handleProceedClick = () => {
    if (!hasEligibleItems) return;
    setShowConfirmationModal(true);
  };

  const handleConfirmPayment = () => {
    dispatch({
      type: 'SET_ELIGIBILITY_DATA',
      paymentMode: 'voucher',
      voucherAmount: amountPayableByVoucher.toFixed(2),
      remainingAmount: 0 
    });
    
    setShowConfirmationModal(false);
    onClose();
    checkoutState(true);
  };

  // Sub-Component for the final confirmation dialog 
  const ConfirmationModal = () => {
    if (!showConfirmationModal) return null;
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[99999] p-4">
        <motion.div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-headingColor">Confirm Payment</h3>
            <p className="text-sm text-textColor mt-2 mb-4">You are about to pay for eligible items only. Non-eligible items will be removed from this order.</p>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
              <p className="text-sm text-green-600 font-semibold">Amount to Pay with Voucher</p>
              <p className="text-3xl font-bold text-green-800">€{amountPayableByVoucher.toFixed(2)}</p>
            </div>
            <div className="flex space-x-3">
              <button onClick={() => setShowConfirmationModal(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-semibold">Cancel</button>
              <button onClick={handleConfirmPayment} className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold">Confirm Payment</button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[99998] p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-6xl h-[90vh] bg-gray-50 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="h-full flex flex-col">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 h-full">

              {/* Left Column: Summary & Information */}
              <div className="bg-white p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-headingColor">Eligibility Review</h2>
                      <p className="text-textColor text-sm mt-1">Confirm items for your meal voucher</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
                      <p className="text-sm text-blue-600 font-semibold">Eligible Items Value</p>
                      <p className="text-3xl font-bold text-blue-800">€{eligibleSubtotal.toFixed(2)}</p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                      <p className="text-sm text-emerald-600 font-semibold">Voucher Will Pay (Max €25.00)</p>
                      <p className="text-3xl font-bold text-emerald-700">€{amountPayableByVoucher.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <p className="text-amber-800 font-semibold text-sm">Please Note:</p>
                      <p className="text-amber-700 text-sm leading-relaxed">Only the eligible items listed will be processed. Non-eligible items will be dropped from this specific transaction.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Item Lists */}
              <div className="p-8 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-6">
                  {/* Eligible Items */}
                  <div>
                    <h3 className="text-xl font-bold text-headingColor mb-4">Eligible Items ({eligibleItems.length})</h3>
                    <div className="space-y-2">
                      {eligibleItems.length > 0 ? eligibleItems.map(item => (
                        <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-3">
                          <p className="font-semibold text-headingColor">{item.itemname}</p>
                          <p className="text-sm text-textColor">{item.itemcategory} • Qty: {item.qty}</p>
                        </div>
                      )) : <p className="text-sm text-textColor p-3 bg-gray-100 rounded-lg">No eligible items in your cart.</p>}
                    </div>
                  </div>
                  
                  {/* Non-Eligible Items */}
                  <div>
                    <h3 className="text-xl font-bold text-headingColor mb-4">Non-Eligible Items ({nonEligibleItems.length})</h3>
                    <div className="space-y-4">
                      {dressItems.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-textColor mb-2 flex items-center gap-2"><span>👗</span> Apparel</h4>
                          {dressItems.map(item => (
                            <div key={item.id} className="bg-white border border-red-200 rounded-lg p-3 mb-2 opacity-70">
                              <p className="font-semibold text-headingColor line-through">{item.itemname}</p>
                              <p className="text-xs text-red-600 font-medium mt-1">{item.reason}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {cosmeticsItems.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-textColor mb-2 flex items-center gap-2"><span>💄</span> Cosmetics</h4>
                          {cosmeticsItems.map(item => (
                            <div key={item.id} className="bg-white border border-red-200 rounded-lg p-3 mb-2 opacity-70">
                              <p className="font-semibold text-headingColor line-through">{item.itemname}</p>
                              <p className="text-xs text-red-600 font-medium mt-1">{item.reason}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {otherNonEligibleItems.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-textColor mb-2 flex items-center gap-2"><span>🛒</span> Other</h4>
                           {otherNonEligibleItems.map(item => (
                            <div key={item.id} className="bg-white border border-red-200 rounded-lg p-3 mb-2 opacity-70">
                              <p className="font-semibold text-headingColor line-through">{item.itemname}</p>
                              <p className="text-xs text-red-600 font-medium mt-1">{item.reason}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {nonEligibleItems.length === 0 && (
                         <p className="text-sm text-textColor p-3 bg-gray-100 rounded-lg">All items in your cart are eligible!</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-6 border-t border-gray-200 mt-6 flex items-center justify-end space-x-4">
                  <motion.button onClick={onClose} whileTap={{ scale: 0.95 }} className="px-6 py-3 text-textColor bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold">Cancel</motion.button>
                  <motion.button
                    onClick={handleProceedClick}
                    disabled={!hasEligibleItems}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {hasEligibleItems ? 'Proceed to Confirm' : 'No Eligible Items'}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <ConfirmationModal />
    </>,
    document.body 
  );
};

export default EligibilityModal;