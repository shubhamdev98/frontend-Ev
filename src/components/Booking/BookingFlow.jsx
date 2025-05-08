import React, { useState } from 'react';
import SeatBooking from './SeatBooking';
import Payment from './Payment';
import Confirmation from './Confirmation';

const BookingFlow = ({ event, onClose }) => {
  const [step, setStep] = useState('seat-booking');
  const [bookingDetails, setBookingDetails] = useState(null);
  
  const handleProceedToPayment = (details) => {
    setBookingDetails(details);
    setStep('payment');
  };
  
  const handlePaymentComplete = (paymentDetails) => {
    setBookingDetails(paymentDetails);
    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="max-w-3xl w-full animate-fadeIn">
        {step === 'seat-booking' && (
          <SeatBooking 
            event={event} 
            onBack={onClose} 
            onProceedToPayment={handleProceedToPayment} 
          />
        )}
        
        {step === 'payment' && (
          <Payment 
            bookingDetails={bookingDetails} 
            event={event} 
            onBack={() => setStep('seat-booking')} 
            onComplete={handlePaymentComplete}
          />
        )}
        
        {step === 'confirmation' && (
          <Confirmation 
            bookingDetails={bookingDetails}
            event={event}
            onBackToEvents={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default BookingFlow;