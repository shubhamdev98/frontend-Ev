import React from 'react';
import { CheckCircle, Calendar, Clock, MapPin, Users, Download, Mail, ArrowLeft } from 'lucide-react';

const Confirmation = ({ bookingDetails, event, onBackToEvents }) => {
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
      <div className="bg-gradient-to-b from-indigo-700 to-indigo-600 px-6 py-8 text-white text-center">
        <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-white/80">
          Your seats have been reserved successfully
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Order Details */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Booking Details</h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Confirmed
            </span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-5">
            <p className="text-sm text-gray-500 mb-1">Order ID</p>
            <p className="font-mono font-medium mb-4">{bookingDetails.orderId}</p>
            
            <h3 className="font-medium text-gray-800 mb-3">{event?.title || 'Event'}</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0" />
                <span>{bookingDetails.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0" />
                <span>{bookingDetails.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0" />
                <span>{event?.location || 'Event Location'}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0" />
                <span>Selected Seats: {bookingDetails.seats.join(', ')}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Subtotal:</span>
                <span>{formatPrice((event?.price || 100) * bookingDetails.seats.length)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Service fee:</span>
                <span>{formatPrice((event?.price || 100) * 0.05)}</span>
              </div>
              <div className="flex justify-between font-semibold mt-2">
                <span>Total paid:</span>
                <span>{formatPrice(((event?.price || 100) * bookingDetails.seats.length) + ((event?.price || 100) * 0.05))}</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="mb-1">Payment method: Credit Card (ending in {bookingDetails.lastFourDigits})</p>
              <p>A confirmation email has been sent to your email address</p>
            </div>
          </div>
        </div>
        
        {/* Host Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Event Host</h2>
          
          <div className="bg-gray-50 rounded-lg p-5 flex items-start">
            <img 
              src={event?.plannerImage || "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"}
              alt={event?.plannerName || "Host"}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="font-medium text-gray-800">{event?.plannerName || "Event Host"}</h3>
              <p className="text-sm text-gray-600 mb-2">{event?.plannerRole || "Host"}</p>
              <p className="text-sm text-gray-600 mb-3">
                You'll receive event details and any updates via email.
              </p>
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                <Mail className="h-4 w-4 mr-1" /> Contact host
              </button>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={onBackToEvents}
            className="py-2.5 px-4 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Browse More Events
          </button>
          
          <button className="py-2.5 px-4 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center">
            <Download className="h-4 w-4 mr-2" /> Download Booking Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;