import React, { useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, Users, MessageCircle, X } from 'lucide-react';

const EventModal = ({ isOpen, onClose, event }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"></div>
      
      <div 
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modal-enter"
        style={{ animationDuration: '0.3s' }}
      >
        <button 
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h2>
            <p className="text-lg text-gray-600">{event.theme}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Event Details</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-gray-700">{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-gray-700">{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-gray-700">{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-gray-700">Capacity: {event.capacity} guests</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Package Includes</h3>
              <div className="grid grid-cols-2 gap-3">
                {event.includes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Description</h3>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center mb-4 sm:mb-0">
              <img
                src={event.plannerImage}
                alt={event.plannerName}
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600"
              />
              <div className="ml-4">
                <p className="font-semibold text-gray-900">{event.plannerName}</p>
                <p className="text-gray-600">{event.plannerRole}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <MessageCircle className="h-5 w-5" />
                Contact
              </button>
              <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                Schedule Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;