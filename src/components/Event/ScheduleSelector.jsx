import React, { useState, useEffect } from "react";
import { Calendar, Clock, ChevronRight } from "lucide-react";

const ScheduleSelector = ({ event, onSelect }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // Generate available dates (next 7 days from event date)
  useEffect(() => {
    const eventDate = new Date(event.date);
    const dates = [];
    
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(eventDate);
      newDate.setDate(eventDate.getDate() + i);
      dates.push({
        date: newDate,
        formattedDate: formatDate(newDate),
        day: getDayName(newDate),
        isAvailable: Math.random() > 0.2 // Random availability (80% chance available)
      });
    }
    
    setAvailableDates(dates);
  }, [event]);
  
  // Generate time slots when a date is selected
  useEffect(() => {
    if (selectedDate) {
      const slots = [];
      const startHour = 9; // 9 AM
      const endHour = 21; // 9 PM
      
      for (let hour = startHour; hour <= endHour; hour += 2) {
        const time = `${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
        slots.push({
          time,
          isAvailable: Math.random() > 0.3 // Random availability (70% chance available)
        });
      }
      
      setAvailableSlots(slots);
    }
  }, [selectedDate]);
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };
  
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };
  
  const handleContinue = () => {
    if (selectedDate && selectedSlot) {
      onSelect({
        date: selectedDate,
        timeSlot: selectedSlot
      });
    }
  };
  
  return (
    <div className="py-2">
      <h3 className="text-lg font-medium text-gray-800 mb-5">Select a date and time</h3>
      
      {/* Date Selection */}
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <Calendar size={18} className="text-indigo-600 mr-2" />
          <h4 className="font-medium text-gray-700">Date</h4>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {availableDates.map((dateOption, index) => (
            <button 
              key={index}
              disabled={!dateOption.isAvailable}
              onClick={() => dateOption.isAvailable && handleDateSelect(dateOption)}
              className={`
                py-3 px-2 rounded-lg text-center transition-all duration-200
                ${!dateOption.isAvailable ? 
                  'bg-gray-100 text-gray-400 cursor-not-allowed' : 
                  selectedDate === dateOption ?
                    'bg-indigo-100 border-2 border-indigo-500 text-indigo-700' :
                    'bg-white border border-gray-200 hover:border-indigo-300 text-gray-700 hover:bg-indigo-50'
                }
              `}
            >
              <div className="font-semibold">{dateOption.day}</div>
              <div className={`text-sm ${selectedDate === dateOption ? 'text-indigo-700' : 'text-gray-500'}`}>
                {dateOption.formattedDate}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Time Selection */}
      {selectedDate && (
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center mb-3">
            <Clock size={18} className="text-indigo-600 mr-2" />
            <h4 className="font-medium text-gray-700">Time</h4>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {availableSlots.map((slot, index) => (
              <button 
                key={index}
                disabled={!slot.isAvailable}
                onClick={() => slot.isAvailable && handleSlotSelect(slot)}
                className={`
                  py-2 px-4 rounded-lg text-center transition-all duration-200
                  ${!slot.isAvailable ? 
                    'bg-gray-100 text-gray-400 cursor-not-allowed' : 
                    selectedSlot === slot ?
                      'bg-indigo-100 border-2 border-indigo-500 text-indigo-700' :
                      'bg-white border border-gray-200 hover:border-indigo-300 text-gray-700 hover:bg-indigo-50'
                  }
                `}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Continue Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedSlot}
          className={`
            flex items-center px-5 py-2 rounded-lg font-medium transition-all duration-200
            ${(!selectedDate || !selectedSlot) ? 
              'bg-gray-200 text-gray-400 cursor-not-allowed' : 
              'bg-indigo-600 hover:bg-indigo-700 text-white'
            }
          `}
        >
          Continue to Seats
          <ChevronRight size={18} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ScheduleSelector;