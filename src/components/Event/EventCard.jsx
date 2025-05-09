import React, { useState } from 'react';
import { Calendar, MapPin, Users, DollarSign, Tag, Clock, ExternalLink, CreditCard, Info } from 'lucide-react';

const EventCard = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format price with commas and dollar sign
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get background color for tag based on tag text
  const getTagColor = (tag) => {
    const tagColors = {
      'Wedding': 'bg-pink-100 text-pink-800',
      'Summer': 'bg-yellow-100 text-yellow-800',
      'Outdoor': 'bg-green-100 text-green-800',
      'Elegant': 'bg-purple-100 text-purple-800',
      'Corporate': 'bg-blue-100 text-blue-800',
      'Conference': 'bg-indigo-100 text-indigo-800',
      'Professional': 'bg-slate-100 text-slate-800',
      'Birthday': 'bg-orange-100 text-orange-800',
      'Party': 'bg-fuchsia-100 text-fuchsia-800',
      'Celebration': 'bg-violet-100 text-violet-800',
      'Custom': 'bg-cyan-100 text-cyan-800',
      'Charity': 'bg-emerald-100 text-emerald-800',
      'Gala': 'bg-teal-100 text-teal-800',
      'Fundraiser': 'bg-lime-100 text-lime-800',
      'Formal': 'bg-gray-100 text-gray-800',
      'Launch': 'bg-red-100 text-red-800',
      'Technology': 'bg-sky-100 text-sky-800',
      'Marketing': 'bg-amber-100 text-amber-800',
      'Anniversary': 'bg-rose-100 text-rose-800',
      'Intimate': 'bg-pink-100 text-pink-800',
      'Dinner': 'bg-yellow-100 text-yellow-800',
      'Romantic': 'bg-red-100 text-red-800',
      'Winter': 'bg-blue-100 text-blue-800',
      'Indoor': 'bg-slate-100 text-slate-800',
      'Fashion': 'bg-fuchsia-100 text-fuchsia-800',
      'Show': 'bg-purple-100 text-purple-800',
      'Luxury': 'bg-amber-100 text-amber-800',
      'Festival': 'bg-green-100 text-green-800',
      'Music': 'bg-indigo-100 text-indigo-800',
      'Graduation': 'bg-blue-100 text-blue-800',
      'Academic': 'bg-cyan-100 text-cyan-800',
      'New Year': 'bg-violet-100 text-violet-800',
      'Networking': 'bg-gray-100 text-gray-800',
    };
    
    return tagColors[tag] || 'bg-gray-100 text-gray-800';
  };

  const handlePaymentClick = () => {
    alert(`Processing payment for: ${event.title} - ${formatPrice(event.price)}`);
  };

  const handleMoreInfoClick = () => {
    alert(`More information about: ${event.title}\n${event.description}`);
  };

  // Get a background image based on the event type
  const getEventBackground = () => {
    const tag = event.tags[0]?.toLowerCase() || '';
    
    if (tag.includes('wedding')) {
      return 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    } else if (tag.includes('corporate') || tag.includes('conference')) {
      return 'https://images.pexels.com/photos/2277784/pexels-photo-2277784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    } else if (tag.includes('birthday') || tag.includes('party')) {
      return 'https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    } else if (tag.includes('charity') || tag.includes('gala')) {
      return 'https://images.pexels.com/photos/1467459/pexels-photo-1467459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    } else if (tag.includes('fashion') || tag.includes('show')) {
      return 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    } else if (tag.includes('music') || tag.includes('festival')) {
      return 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    } else if (tag.includes('dinner') || tag.includes('anniversary')) {
      return 'https://images.pexels.com/photos/5876383/pexels-photo-5876383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    } else if (tag.includes('launch') || tag.includes('technology')) {
      return 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    } else if (tag.includes('new year')) {
      return 'https://images.pexels.com/photos/796607/pexels-photo-796607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    } else if (tag.includes('graduation')) {
      return 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    } else {
      return 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    }
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={getEventBackground()} 
          alt={event.title} 
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Price Tag */}
        <div className="absolute top-4 right-4 bg-white font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          <DollarSign size={16} className="text-emerald-600" />
          <span className="text-emerald-800">{formatPrice(event.price)}</span>
        </div>
        
        {/* Event Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-xl font-bold leading-tight">{event.title}</h3>
          <p className="text-gray-200 text-sm italic">{event.theme}</p>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        {/* Event Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-700">
            <Calendar size={16} className="mr-2 text-indigo-600" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Clock size={16} className="mr-2 text-indigo-600" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-start text-gray-700">
            <MapPin size={16} className="mr-2 mt-1 flex-shrink-0 text-indigo-600" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Users size={16} className="mr-2 text-indigo-600" />
            <span>Capacity: {event.capacity} guests</span>
          </div>
        </div>
        
        {/* Event Tags */}
        <div className="flex flex-wrap gap-2 my-3">
          {event.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className={`text-xs px-2 py-1 rounded-full font-medium ${getTagColor(tag)}`}
            >
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 font-medium">
              +{event.tags.length - 3} more
            </span>
          )}
        </div>
        
        {/* Event Planner */}
        <div className="flex items-center mt-3 mb-4 pt-3 border-t border-gray-100">
          <img 
            src={event.plannerImage} 
            alt={event.plannerName} 
            className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-indigo-100"
          />
          <div>
            <p className="font-medium text-gray-900">{event.plannerName}</p>
            <p className="text-xs text-gray-500">{event.plannerRole}</p>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex gap-3 mt-auto pt-4">
          <button 
            onClick={handlePaymentClick}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard size={18} />
            <span>Pay Now</span>
          </button>
          
          <button 
            onClick={handleMoreInfoClick}
            className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Info size={18} />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;