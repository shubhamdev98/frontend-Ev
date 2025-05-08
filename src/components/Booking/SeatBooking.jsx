import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Users, CheckCircle } from 'lucide-react';

const SeatGrid = ({ selectedSeats, onSeatSelect }) => {
  // Mock seat layout (in a real app, this would come from an API)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 8;
  
  const isSeatBooked = (row, seat) => {
    // Mock some seats as already booked
    const bookedSeats = ['A1', 'A2', 'C4', 'D3', 'E7', 'F5'];
    return bookedSeats.includes(`${row}${seat}`);
  };

  return (
    <div className="mb-8">
      {/* Screen */}
      <div className="relative mb-8">
        <div className="h-2 bg-indigo-600 rounded-lg mb-2"></div>
        <div className="text-center text-sm text-gray-500">Screen</div>
      </div>
      
      <div className="grid gap-4">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-2">
            <span className="w-6 text-center font-medium text-gray-700">{row}</span>
            <div className="flex gap-2 flex-1 justify-center">
              {Array.from({ length: seatsPerRow }, (_, i) => {
                const seatNumber = `${row}${i + 1}`;
                const isBooked = isSeatBooked(row, i + 1);
                const isSelected = selectedSeats.includes(seatNumber);
                
                return (
                  <button
                    key={seatNumber}
                    disabled={isBooked}
                    onClick={() => onSeatSelect(seatNumber)}
                    className={`
                      w-8 h-8 rounded-t-lg transition-all duration-300
                      ${isBooked 
                        ? 'bg-gray-200 cursor-not-allowed' 
                        : isSelected
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-white border border-gray-300 hover:border-indigo-600 text-gray-800'
                      }
                    `}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <span className="w-6 text-center font-medium text-gray-700">{row}</span>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="mt-8 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-white border border-gray-300"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-indigo-600"></div>
          <span className="text-sm text-gray-600">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-gray-200"></div>
          <span className="text-sm text-gray-600">Booked</span>
        </div>
      </div>
    </div>
  );
};

const SeatBooking = ({ event, onBack, onProceedToPayment }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Mock dates (in a real app, these would come from an API)
  const availableDates = [
    { date: 'June 15, 2025', day: 'Mon' },
    { date: 'June 16, 2025', day: 'Tue' },
    { date: 'June 17, 2025', day: 'Wed' },
    { date: 'June 18, 2025', day: 'Thu' },
    { date: 'June 19, 2025', day: 'Fri' }
  ];

  // Mock time slots
  const timeSlots = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: false }
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats(prev => 
      prev.includes(seatNumber)
        ? prev.filter(seat => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime && selectedSeats.length > 0) {
      onProceedToPayment({
        date: selectedDate,
        time: selectedTime,
        seats: selectedSeats,
        participants: selectedSeats.length,
        price: event.price * selectedSeats.length
      });
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
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold">Select Seats</h1>
        </div>
        <p className="text-white/80">Choose your preferred seats for {event?.title || 'the event'}</p>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Date Selection */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
              <Calendar className="h-5 w-5 text-indigo-600 mr-2" /> 
              Select Date
            </h3>
            <div className="space-y-2">
              {availableDates.map((dateObj, index) => (
                <button
                  key={index}
                  onClick={() => handleDateSelect(dateObj.date)}
                  className={`
                    w-full py-3 px-4 rounded-lg transition-all duration-300
                    flex justify-between items-center
                    ${selectedDate === dateObj.date 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white hover:bg-indigo-50 text-gray-800 border border-gray-200'
                    }
                  `}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{dateObj.date}</span>
                    <span className="text-sm opacity-80">{dateObj.day}</span>
                  </div>
                  {selectedDate === dateObj.date && <CheckCircle className="h-5 w-5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
              <Clock className="h-5 w-5 text-indigo-600 mr-2" /> 
              Select Time
            </h3>
            
            {selectedDate ? (
              <div className="space-y-2">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                    className={`
                      w-full py-3 px-4 rounded-lg transition-all duration-300
                      flex justify-between items-center
                      ${selectedTime === slot.time 
                        ? 'bg-indigo-600 text-white'
                        : slot.available
                          ? 'bg-white hover:bg-indigo-50 text-gray-800 border border-gray-200'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                      }
                    `}
                  >
                    <span className="font-medium">{slot.time}</span>
                    {selectedTime === slot.time && <CheckCircle className="h-5 w-5" />}
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center text-gray-500">
                Please select a date first
              </div>
            )}
          </div>
        </div>

        {/* Seat Selection */}
        {selectedDate && selectedTime && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-medium text-gray-800 mb-4 flex items-center">
              <Users className="h-5 w-5 text-indigo-600 mr-2" /> 
              Select Your Seats
            </h3>
            
            <SeatGrid 
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
            />
          </div>
        )}

        {/* Summary */}
        {selectedSeats.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <div className="rounded-lg bg-indigo-50 p-4 mb-6">
              <h4 className="font-medium text-indigo-800 mb-2">Booking Summary</h4>
              <ul className="space-y-1 text-sm text-indigo-700">
                <li>• Date: {selectedDate}</li>
                <li>• Time: {selectedTime}</li>
                <li>• Selected Seats: {selectedSeats.join(', ')}</li>
                <li className="font-semibold mt-2">
                  • Total: {formatPrice((event?.price || 100) * selectedSeats.length)}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
        <button
          onClick={onBack}
          className="py-2.5 px-4 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </button>
        
        <button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime || selectedSeats.length === 0}
          className={`
            py-2.5 px-4 rounded-lg font-medium transition-all duration-300 
            flex items-center
            ${selectedDate && selectedTime && selectedSeats.length > 0
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-indigo-300 cursor-not-allowed text-white'
            }
          `}
        >
          Continue to Payment <ArrowRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SeatBooking;