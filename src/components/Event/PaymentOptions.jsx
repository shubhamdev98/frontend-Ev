import React, { useState } from "react";
import { CreditCard, ChevronLeft, CheckCircle2, ShieldCheck } from "lucide-react";

const PaymentOptions = ({ 
  event, 
  schedule, 
  seats, 
  onSelect, 
  onBack, 
  formatPrice,
  isProcessing
}) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: ""
  });
  
  const paymentMethods = [
    { id: "credit-card", name: "Credit Card", icon: CreditCard },
    { id: "gpay", name: "Google Pay", icon: () => (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12.545,12.151L12.545,12.151c0,1.054-0.855,1.909-1.909,1.909H3.833c-1.054,0-1.909-0.855-1.909-1.909
        v-0.182c0-1.054,0.855-1.909,1.909-1.909h6.803C11.69,10.06,12.545,10.915,12.545,12.151z M12.545,12.151"/>
        <path d="M16.167,12.151L16.167,12.151c0,1.054-0.855,1.909-1.909,1.909h-0.242c-1.054,0-1.909-0.855-1.909-1.909
        v-0.182c0-1.054,0.855-1.909,1.909-1.909h0.242C15.312,10.06,16.167,10.915,16.167,12.151z M16.167,12.151"/>
        <path d="M22.061,12.151L22.061,12.151c0,1.054-0.855,1.909-1.909,1.909h-0.242c-1.054,0-1.909-0.855-1.909-1.909
        v-0.182c0-1.054,0.855-1.909,1.909-1.909h0.242C21.206,10.06,22.061,10.915,22.061,12.151z M22.061,12.151"/>
      </svg>
    )}
  ];
  
  const calculateTotal = () => {
    return event.price * seats.length;
  };
  
  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === "number") {
      const formatted = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
      setCardDetails({
        ...cardDetails,
        [name]: formatted.slice(0, 19) // Limit to 16 digits + 3 spaces
      });
    } 
    // Format expiry date
    else if (name === "expiry") {
      const formatted = value
        .replace(/\//g, "")
        .replace(/(.{2})/, "$1/")
        .trim();
      setCardDetails({
        ...cardDetails,
        [name]: formatted.slice(0, 5) // Limit to MM/YY format
      });
    } 
    // CVC
    else if (name === "cvc") {
      setCardDetails({
        ...cardDetails,
        [name]: value.slice(0, 3) // Limit to 3 digits
      });
    } 
    // Name
    else {
      setCardDetails({
        ...cardDetails,
        [name]: value
      });
    }
  };
  
  const isFormValid = () => {
    if (selectedMethod === "gpay") {
      return true;
    }
    
    if (selectedMethod === "credit-card") {
      return (
        cardDetails.number.replace(/\s/g, "").length === 16 &&
        cardDetails.name.length > 3 &&
        cardDetails.expiry.length === 5 &&
        cardDetails.cvc.length === 3
      );
    }
    
    return false;
  };
  
  const handleSubmit = () => {
    if (isFormValid()) {
      onSelect(selectedMethod);
    }
  };
  
  return (
    <div className="py-2">
      <h3 className="text-lg font-medium text-gray-800 mb-5">Payment Details</h3>
      
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Order Summary</h4>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Event:</span>
            <span className="font-medium">{event.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span>{schedule.date.formattedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span>{schedule.timeSlot.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Seats:</span>
            <span>{seats.map(seat => seat.id).join(", ")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Price per seat:</span>
            <span>{formatPrice(event.price)}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
          <span>Total:</span>
          <span className="text-indigo-700">{formatPrice(calculateTotal())}</span>
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Select Payment Method</h4>
        
        <div className="grid grid-cols-2 gap-3">
          {paymentMethods.map(method => (
            <button
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className={`
                p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center transition-all duration-200
                ${selectedMethod === method.id ? 'border-indigo-500 bg-indigo-50' : 'hover:bg-gray-50'}
              `}
            >
              <div className={`mb-2 ${selectedMethod === method.id ? 'text-indigo-600' : 'text-gray-500'}`}>
                <method.icon size={28} />
              </div>
              <span className={selectedMethod === method.id ? 'text-indigo-700 font-medium' : 'text-gray-700'}>
                {method.name}
              </span>
              
              {selectedMethod === method.id && (
                <CheckCircle2 size={18} className="absolute top-2 right-2 text-indigo-600" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Credit Card Form */}
      {selectedMethod === "credit-card" && (
        <div className="mb-6 animate-fade-in">
          <div className="space-y-4">
            <div>
              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="card-number"
                name="number"
                value={cardDetails.number}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                id="card-name"
                name="name"
                value={cardDetails.name}
                onChange={handleInputChange}
                placeholder="John Smith"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="card-expiry"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="card-cvc" className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  id="card-cvc"
                  name="cvc"
                  value={cardDetails.cvc}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mt-4">
            <ShieldCheck size={16} className="mr-1 text-green-500" />
            Your payment information is secure and encrypted
          </div>
        </div>
      )}
      
      {/* Google Pay */}
      {selectedMethod === "gpay" && (
        <div className="mb-6 animate-fade-in bg-gray-50 p-4 rounded-lg text-center">
          <div className="mb-4">
            <svg viewBox="0 0 48 48" width="48" height="48" className="mx-auto">
              <path fill="#4285F4" d="M24.3,24.1v7.9h10.7c-0.4,2.8-1.7,5.1-3.6,6.7l5.8,4.6C40.1,40.1,42,35.9,42,31.1c0-1.7-0.2-3.3-0.4-4.9H24.3z" />
              <path fill="#34A853" d="M10.8,28.8c-0.7-2-1.1-4.1-1.1-6.3c0-2.2,0.4-4.3,1.1-6.3v-8.9H4.7C2.5,12.1,1.3,17.2,1.3,22.5s1.2,10.4,3.4,15.2L10.8,28.8z" />
              <path fill="#FBBC05" d="M24.3,10.4c3.2,0,6.1,1.1,8.4,3l5.1-5.1c-3.8-3.6-8.7-5.8-13.5-5.8c-8,0-14.9,4.6-18.3,11.3l6.1,4.9C14.5,13.7,19,10.4,24.3,10.4z" />
              <path fill="#EA4335" d="M24.3,40c4.2,0,8-1.4,10.9-3.8l-5.8-4.6c-1.8,1.2-4,1.9-5.1,1.9c-5.4,0-9.9-3.3-11.8-8.4l-6.1,4.9C10.1,36.2,16.8,40,24.3,40z" />
            </svg>
          </div>
          <p className="text-gray-700 mb-3">
            Click the "Pay Now" button below to complete your payment with Google Pay.
          </p>
          <p className="text-sm text-gray-500">
            You will be prompted to select a payment method from your Google account.
          </p>
        </div>
      )}
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          disabled={isProcessing}
          className={`
            flex items-center px-4 py-2 rounded-lg font-medium border border-gray-300 transition-colors
            ${isProcessing ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}
          `}
        >
          <ChevronLeft size={18} className="mr-1" />
          Back
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={!isFormValid() || isProcessing}
          className={`
            flex items-center px-5 py-2 rounded-lg font-medium transition-all duration-200
            ${!isFormValid() || isProcessing ? 
              'bg-gray-200 text-gray-400 cursor-not-allowed' : 
              'bg-indigo-600 hover:bg-indigo-700 text-white'
            }
          `}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              Pay Now
              <ChevronRight size={18} className="ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;
