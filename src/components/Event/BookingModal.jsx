import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import ScheduleSelector from "./ScheduleSelector";
import SeatSelector from "./SeatSelector";
import PaymentOptions from "./PaymentOptions";
import BookingSuccess from "./BookingSuccess";
import StepIndicator from "./StepIndicator";

const BookingModal = ({ event, onClose, formatPrice }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const steps = [
    { id: 1, name: "Schedule" },
    { id: 2, name: "Seats" },
    { id: 3, name: "Payment" },
    { id: 4, name: "Confirmation" }
  ];

  useEffect(() => {
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule);
    setCurrentStep(2); // Move to seat selection
  };

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
    setCurrentStep(3); // Move to payment
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setBookingComplete(true);
      setCurrentStep(4); // Move to confirmation
      setBookingDetails({
        event: event,
        schedule: selectedSchedule,
        seats: selectedSeats,
        paymentMethod: method,
        bookingId: `BK-${Math.floor(Math.random() * 10000)}`,
        timestamp: new Date().toISOString()
      });
    }, 2000);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ScheduleSelector 
            event={event} 
            onSelect={handleScheduleSelect} 
          />
        );
      case 2:
        return (
          <SeatSelector 
            event={event} 
            schedule={selectedSchedule}
            onSelect={handleSeatSelect}
            onBack={handlePrevStep}
          />
        );
      case 3:
        return (
          <PaymentOptions 
            event={event}
            schedule={selectedSchedule}
            seats={selectedSeats}
            onSelect={handlePaymentSelect}
            onBack={handlePrevStep}
            formatPrice={formatPrice}
            isProcessing={isProcessingPayment}
          />
        );
      case 4:
        return (
          <BookingSuccess 
            bookingDetails={bookingDetails}
            formatPrice={formatPrice}
            onClose={onClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-modal-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {currentStep < 4 ? `Book: ${event.title}` : "Booking Confirmed!"}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        {/* Progress Indicator */}
        {currentStep < 4 && (
          <StepIndicator steps={steps} currentStep={currentStep} />
        )}
        
        {/* Content */}
        <div className="flex-1 overflow-auto px-6 py-4">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;