import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

const SeatSelector = ({ event, schedule, onSelect, onBack }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [maxSeats] = useState(4); // Maximum number of seats that can be selected
  
  // Generate auditorium layout
  useEffect(() => {
    generateAuditoriumLayout();
  }, []);
  
  const generateAuditoriumLayout = () => {
    const rows = 8;
    const seatsPerRow = 12;
    const seatLayout = [];
    
    const letters = 'ABCDEFGHJKLMN';
    
    for (let row = 0; row < rows; row++) {
      const rowSeats = [];
      const rowName = letters[row];
      
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        // Create gap in middle (aisle)
        if (seatNum === seatsPerRow / 2 + 1) {
          rowSeats.push({ id: `${rowName}-aisle`, type: 'aisle' });
        }
        
        const seatId = `${rowName}${seatNum}`;
        
        // Determine if seat is booked already (random)
        const isBooked = Math.random() < 0.3; // 30% chance seat is already booked
        
        rowSeats.push({
          id: seatId,
          row: rowName,
          number: seatNum,
          type: 'seat',
          status: isBooked ? 'booked' : 'available'
        });
      }
      
      seatLayout.push(rowSeats);
    }
    
    setSeats(seatLayout);
  };
  
  const handleSeatClick = (seat) => {
    if (seat.status === 'booked' || seat.type === 'aisle') {
      return;
    }
    
    const isSeatSelected = selectedSeats.some(s => s.id === seat.id);
    
    if (isSeatSelected) {
      // Unselect the seat
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      // Make sure we don't exceed max seats
      if (selectedSeats.length >= maxSeats) {
        return;
      }
      
      // Add the seat to selected
      setSelectedSeats([...selectedSeats, seat]);
    }
  };
  
  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      onSelect(selectedSeats);
    }
  };
  
  return (
    <div className="py-2">
      <h3 className="text-lg font-medium text-gray-800 mb-1">Select your seats</h3>
      <p className="text-gray-500 text-sm mb-5 flex items-center">
        <Info size={14} className="inline mr-1" />
        You can select up to {maxSeats} seats
      </p>
      
      {/* Date & Time Info */}
      <div className="flex flex-wrap gap-3 mb-6 bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center">
          <div className="text-gray-500 text-sm mr-2">Date:</div>
          <div className="font-medium">{schedule.date.formattedDate}</div>
        </div>
        <div className="flex items-center">
          <div className="text-gray-500 text-sm mr-2">Time:</div>
          <div className="font-medium">{schedule.timeSlot.time}</div>
        </div>
      </div>
      
      {/* Seat Legend */}
      <div className="flex items-center justify-center gap-4 mb-8 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
          Available
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-indigo-500 rounded mr-2"></div>
          Selected
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
          Booked
        </div>
      </div>
      
      {/* Screen */}
      <div className="relative mb-10">
        <div className="h-6 bg-gray-300 rounded-t-lg mb-1 text-center text-sm text-gray-700 flex items-center justify-center">
          SCREEN
        </div>
        <div className="w-full h-2 bg-gray-300 rounded-lg mb-8 transform perspective-800 rotateX-50"></div>
      </div>
      
      {/* Seats */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center mb-2">
              {row.map((seat, seatIndex) => (
                seat.type === 'aisle' ? (
                  <div key={`aisle-${rowIndex}-${seatIndex}`} className="w-6"></div>
                ) : (
                  <button
                    key={seat.id}
                    disabled={seat.status === 'booked'}
                    onClick={() => handleSeatClick(seat)}
                    className={`
                      w-8 h-8 rounded-t-lg text-xs m-1 transition-all duration-200
                      ${seat.status === 'booked' ? 
                        'bg-gray-400 cursor-not-allowed text-gray-200' : 
                        selectedSeats.some(s => s.id === seat.id) ?
                          'bg-indigo-500 text-white' :
                          'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }
                    `}
                    title={`Seat ${seat.id}`}
                  >
                    {seat.number}
                  </button>
                )
              ))}
              
              {/* Row label */}
              <div className="ml-3 w-5 h-8 flex items-center justify-center text-sm text-gray-500">
                {row[0].row}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Selected seats summary */}
      {selectedSeats.length > 0 && (
        <div className="mb-6 p-3 bg-indigo-50 rounded-lg animate-fade-in">
          <h4 className="font-medium text-gray-700 mb-2">Selected Seats ({selectedSeats.length})</h4>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <div key={seat.id} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-sm">
                {seat.id}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="flex items-center px-4 py-2 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft size={18} className="mr-1" />
          Back
        </button>
        
        <button
          onClick={handleContinue}
          disabled={selectedSeats.length === 0}
          className={`
            flex items-center px-5 py-2 rounded-lg font-medium transition-all duration-200
            ${selectedSeats.length === 0 ? 
              'bg-gray-200 text-gray-400 cursor-not-allowed' : 
              'bg-indigo-600 hover:bg-indigo-700 text-white'
            }
          `}
        >
          Continue to Payment
          <ChevronRight size={18} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default SeatSelector;