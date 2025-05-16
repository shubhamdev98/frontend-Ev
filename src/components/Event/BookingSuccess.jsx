import React from "react";
import { Check, Download, Calendar, Share2 } from "lucide-react";
import { useEffect } from "react";

const BookingSuccess = ({ bookingDetails, formatPrice, onClose }) => {
  useEffect(() => {
    // Add confetti effect
    const confettiColors = ["#4F46E5", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"];
    const confettiCount = 200;
    
    for (let i = 0; i < confettiCount; i++) {
      createConfetti(confettiColors);
    }
  }, []);
  
  const createConfetti = (colors) => {
    const confetti = document.createElement("div");
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.position = "fixed";
    confetti.style.zIndex = "100";
    confetti.style.width = `${Math.random() * 10 + 5}px`;
    confetti.style.height = `${Math.random() * 5 + 5}px`;
    confetti.style.backgroundColor = randomColor;
    confetti.style.borderRadius = "50%";
    confetti.style.opacity = Math.random();
    
    // Random starting position at the top
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = `-20px`;
    
    document.body.appendChild(confetti);
    
    // Animate the confetti
    const animation = confetti.animate(
      [
        { transform: `translate3d(${Math.random() * 100 - 50}px, 0, 0)`, opacity: 1 },
        { transform: `translate3d(${Math.random() * 200 - 100}px, 100vh, 0)`, opacity: 0 }
      ],
      {
        duration: Math.random() * 3000 + 2000,
        easing: "cubic-bezier(0.1, 0.4, 0.2, 1)"
      }
    );
    
    animation.onfinish = () => {
      confetti.remove();
    };
  };
  
  const handleDownloadTicket = () => {
    alert("Downloading ticket...");
  };
  
  const handleAddToCalendar = () => {
    alert("Adding to calendar...");
  };
  
  const handleShareBooking = () => {
    alert("Sharing booking...");
  };
  
  return (
    <div className="py-2 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <Check size={40} className="text-green-600" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
      <p className="text-gray-600 mb-6">
        Your booking has been confirmed and your tickets are ready.
      </p>
      
      {/* Booking Details */}
      <div className="bg-gray-50 rounded-lg p-5 mb-6 text-left">
        <h4 className="font-semibold text-gray-700 mb-3 text-lg">Booking Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-gray-500 text-sm mb-1">Booking ID</div>
            <div className="font-medium">{bookingDetails.bookingId}</div>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">Event</div>
            <div className="font-medium">{bookingDetails.event.title}</div>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">Date & Time</div>
            <div className="font-medium">
              {bookingDetails.schedule.date.formattedDate} at {bookingDetails.schedule.timeSlot.time}
            </div>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">Location</div>
            <div className="font-medium">{bookingDetails.event.location}</div>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">Seats</div>
            <div className="font-medium">
              {bookingDetails.seats.map(seat => seat.id).join(", ")}
            </div>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">Total Amount</div>
            <div className="font-semibold text-indigo-700">
              {formatPrice(bookingDetails.event.price * bookingDetails.seats.length)}
            </div>
          </div>
        </div>
      </div>
      
      {/* QR Code (placeholder) */}
      <div className="mb-6">
        <div className="w-40 h-40 bg-white border-2 border-gray-200 rounded-lg mx-auto flex items-center justify-center">
          <svg viewBox="0 0 100 100" width="80" height="80">
            <path d="M0,0 L40,0 L40,40 L0,40 Z" fill="none" stroke="black" strokeWidth="5" />
            <path d="M10,10 L30,10 L30,30 L10,30 Z" fill="black" />
            <path d="M60,0 L100,0 L100,40 L60,40 Z" fill="none" stroke="black" strokeWidth="5" />
            <path d="M70,10 L90,10 L90,30 L70,30 Z" fill="black" />
            <path d="M0,60 L40,60 L40,100 L0,100 Z" fill="none" stroke="black" strokeWidth="5" />
            <path d="M10,70 L30,70 L30,90 L10,90 Z" fill="black" />
            <path d="M60,60 L70,60 L70,70 L60,70 Z" fill="none" stroke="black" strokeWidth="5" />
            <path d="M80,60 L100,60 L100,70 L80,70 Z" fill="none" stroke="black" strokeWidth="5" />
            <path d="M60,80 L100,80 L100,100 L60,100 Z" fill="none" stroke="black" strokeWidth="5" />
          </svg>
        </div>
        <p className="text-sm text-gray-500 mt-2">Scan this QR code at the venue</p>
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <button
          onClick={handleDownloadTicket}
          className="flex items-center justify-center px-4 py-2 rounded-lg font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
        >
          <Download size={18} className="mr-2" />
          Download Ticket
        </button>
        
        <button
          onClick={handleAddToCalendar}
          className="flex items-center justify-center px-4 py-2 rounded-lg font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
        >
          <Calendar size={18} className="mr-2" />
          Add to Calendar
        </button>
        
        <button
          onClick={handleShareBooking}
          className="flex items-center justify-center px-4 py-2 rounded-lg font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
        >
          <Share2 size={18} className="mr-2" />
          Share
        </button>
      </div>
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="px-6 py-2 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
      >
        Close
      </button>
    </div>
  );
};

export default BookingSuccess;