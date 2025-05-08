import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const FormField = ({ label, type, placeholder, value, onChange, error, icon }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type || 'text'}
          className={`w-full px-4 py-2.5 ${icon ? 'pl-10' : ''} rounded-lg border ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

const Payment = ({ bookingDetails, event, onBack, onComplete }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    email: '',
    address: ''
  });
  
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleInputChange = (field, value) => {
    let formattedValue = value;
    
    // Format card number with spaces
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      formattedValue = formattedValue.substring(0, 19); // Limit to 16 digits + 3 spaces
    }
    
    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.substring(0, 2)}/${formattedValue.substring(2, 4)}`;
      }
      formattedValue = formattedValue.substring(0, 5);
    }
    
    // Limit CVV to 3-4 digits
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    setPaymentInfo({
      ...paymentInfo,
      [field]: formattedValue
    });
    
    // Clear error for this field if any
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const cardNumberPattern = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!cardNumberPattern.test(paymentInfo.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    if (!paymentInfo.cardHolder.trim()) {
      newErrors.cardHolder = 'Please enter the card holder name';
    }
    
    if (!expiryDatePattern.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    } else {
      const [month, year] = paymentInfo.expiryDate.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const today = new Date();
      
      if (expiryDate < today) {
        newErrors.expiryDate = 'This card has expired';
      }
    }
    
    if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV (3-4 digits)';
    }
    
    if (!emailPattern.test(paymentInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!paymentInfo.address.trim()) {
      newErrors.address = 'Please enter your billing address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setProcessing(false);
        setCompleted(true);
        
        // After showing success for a moment, move to completion
        setTimeout(() => {
          onComplete({
            ...bookingDetails,
            orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
            paymentMethod: 'Credit Card',
            lastFourDigits: paymentInfo.cardNumber.slice(-4)
          });
        }, 1500);
      }, 2000);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-b from-indigo-700 to-indigo-600 px-6 py-4 text-white">
        <div className="flex items-center mb-2">
          <button 
            onClick={onBack}
            className="mr-4 p-1.5 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Go back"
            disabled={processing || completed}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold">Payment Details</h1>
        </div>
        <p className="text-white/80">Complete your booking for {event?.title || 'the event'}</p>
      </div>

      {/* Content */}
      <div className="p-6">
        {!completed ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Payment Details Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 text-indigo-600 mr-2" />
                  Payment Information
                </h2>
                
                <FormField 
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  error={errors.cardNumber}
                  icon={<CreditCard className="h-5 w-5 text-gray-400" />}
                />
                
                <FormField 
                  label="Card Holder Name"
                  placeholder="John Doe"
                  value={paymentInfo.cardHolder}
                  onChange={(e) => handleInputChange('cardHolder', e.target.value)}
                  error={errors.cardHolder}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField 
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    error={errors.expiryDate}
                  />
                  
                  <FormField 
                    label="CVV"
                    placeholder="123"
                    value={paymentInfo.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    error={errors.cvv}
                  />
                </div>
                
                <FormField 
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={paymentInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                />
                
                <FormField 
                  label="Billing Address"
                  placeholder="123 Main St, City, Country"
                  value={paymentInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  error={errors.address}
                />
              </div>
              
              {/* Order Summary Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-800">{event?.title || 'Event'}</h3>
                    <p className="text-sm text-gray-600">{event?.plannerName || 'Event Host'}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium text-gray-800">{bookingDetails?.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium text-gray-800">{bookingDetails?.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Selected Seats:</span>
                      <span className="font-medium text-gray-800">
                        {bookingDetails?.seats?.join(', ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mb-3">
                    <div className="flex justify-between text-sm">
                      <span>Base price:</span>
                      <span>{formatPrice(event?.price || 100)} × {bookingDetails?.seats?.length || 1}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service fee:</span>
                      <span>{formatPrice((event?.price || 100) * 0.05)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>
                        {formatPrice(((event?.price || 100) * (bookingDetails?.seats?.length || 1)) + 
                          ((event?.price || 100) * 0.05))}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-4 mb-6 flex items-start">
                  <Lock className="h-5 w-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-indigo-800 font-medium">Secure Payment</p>
                    <p className="text-xs text-indigo-600">
                      Your payment information is encrypted and secure. We never store your full card details.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={processing}
                className={`
                  py-3 px-6 rounded-lg font-medium transition-all duration-300 
                  flex items-center
                  ${processing
                    ? 'bg-indigo-300 cursor-wait'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white
                `}
              >
                {processing ? (
                  <>
                    <div className="mr-3 h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>Complete Payment</>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">Your booking has been confirmed.</p>
            <div className="animate-pulse">Redirecting to confirmation...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;