import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronRight, Star, MessageCircle } from 'lucide-react';

const EventCard = ({ 
  event, 
  isBookmarked, 
  isBooked, 
  onBookmark, 
  onBook, 
  onMoreInfo,
  selectedTag,
  handleTagFilter
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div 
      className="w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      <div className="relative">
        <div 
          className={`absolute top-0 left-0 right-0 h-48 sm:h-40 bg-gradient-to-b from-indigo-700 to-indigo-600 transition-opacity duration-300 ${
            isHovered ? 'opacity-95' : 'opacity-90'
          }`}
        ></div>
        
        <div className="relative pt-6 px-6 text-white z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-1">{event.title}</h2>
              <p className="text-sm text-white/90 mb-2">{event.theme}</p>
            </div>
            <button
              onClick={(e) => onBookmark(event.id, e)}
              className={`p-1.5 rounded-full transition-colors duration-300 ${
                isBookmarked ? 'text-yellow-300 bg-white/20' : 'text-white/80 hover:text-yellow-300 hover:bg-white/20'
              }`}
              aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
            >
              <Star className={`h-5 w-5 ${isBookmarked ? 'fill-yellow-300' : ''}`} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {event.tags.map((tag, index) => (
              <span 
                key={index}
                onClick={() => handleTagFilter(tag)}
                className={`px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors duration-300 ${
                  selectedTag === tag 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="px-4 sm:px-6 pt-16 pb-10 bg-white">
        <div className="min-h-[3rem] sm:min-h-[4rem]">
          <p className="text-gray-700 mb-4 line-clamp-2 leading-normal sm:leading-relaxed">{event.description}</p>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0" />
            <span className="text-sm sm:text-base">{event.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0" />
            <span className="text-sm sm:text-base">{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0" />
            <span className="text-sm sm:text-base">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0" />
            <span className="text-sm sm:text-base">Capacity: {event.capacity} guests</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Package Includes:</h3>
          <div className="flex flex-wrap gap-2">
            {event.includes.map((item, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-600"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center mb-6">
          <img 
            src={event.plannerImage}
            alt={event.plannerName}
            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-600"
          />
          <div className="ml-3 flex-1 min-w-0">
            <p className="font-medium text-gray-800 truncate">{event.plannerName}</p>
            <p className="text-sm text-gray-500 truncate">{event.plannerRole}</p>
          </div>
          <button 
            className="ml-2 text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            aria-label="Contact planner"
          >
            <MessageCircle className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onBook(event.id)}
            className={`
              flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-300 
              flex justify-center items-center 
              ${isBooked 
                ? 'bg-secondary hover:bg-secondary-dark' 
                : 'bg-secondary hover:bg-secondary-dark'} 
              text-white
            `}
          >
            {isBooked ? 'Cancel Consultation' : `Schedule Consultation - ${formatPrice(event.price)}`}
          </button>
          <button 
            onClick={() => onMoreInfo(event)}
            className="py-2.5 px-4 rounded-lg font-medium border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 flex items-center justify-center"
          >
            More Info <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;