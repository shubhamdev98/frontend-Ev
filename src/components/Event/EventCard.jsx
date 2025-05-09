import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Tag,
  Clock,
  CreditCard,
  Info,
} from "lucide-react";

const EventCard = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePaymentClick = () => {
    alert(
      `Processing payment for: ${event.title} - ${formatPrice(event.price)}`
    );
  };

  const handleMoreInfoClick = () => {
    alert(`More information about: ${event.title}\n${event.description}`);
  };

  const getEventBackground = () => {
    const tag = event.tags[0]?.toLowerCase() || "";

    if (tag.includes("wedding")) {
      return "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else if (tag.includes("corporate") || tag.includes("conference")) {
      return "https://images.pexels.com/photos/2277784/pexels-photo-2277784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else if (tag.includes("birthday") || tag.includes("party")) {
      return "https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else if (tag.includes("charity") || tag.includes("gala")) {
      return "https://images.pexels.com/photos/1467459/pexels-photo-1467459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else if (tag.includes("fashion") || tag.includes("show")) {
      return "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else if (tag.includes("music") || tag.includes("festival")) {
      return "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else if (tag.includes("dinner") || tag.includes("anniversary")) {
      return "https://images.pexels.com/photos/5876383/pexels-photo-5876383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else if (tag.includes("launch") || tag.includes("technology")) {
      return "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else if (tag.includes("new year")) {
      return "https://images.pexels.com/photos/796607/pexels-photo-796607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else if (tag.includes("graduation")) {
      return "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else {
      return "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    }
  };

  return (
    <div
      className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Event Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={getEventBackground()}
          alt={event.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary/40 to-transparent"></div>

        {/* Event Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-background-light text-xl font-bold leading-tight">
            {event.title}
          </h3>
          <p className="text-background-light/90 text-sm italic">
            {event.theme}
          </p>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        {/* Event Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-text-light">
            <Calendar size={16} className="mr-2 text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-text-light">
            <Clock size={16} className="mr-2 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-start text-text-light">
            <MapPin
              size={16}
              className="mr-2 mt-1 flex-shrink-0 text-primary"
            />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-text-light">
            <Users size={16} className="mr-2 text-primary" />
            <span>Capacity: {event.capacity} guests</span>
          </div>
          <div className="flex items-center text-text-light">
            <DollarSign size={16} className="mr-2 text-primary" />
            <span>Price: {formatPrice(event.price)}</span>
          </div>
        </div>

        {/* Event Tags */}
        <div className="flex flex-wrap gap-2 my-3">
          {event.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full font-medium bg-primary-light/20 text-primary-dark"
            >
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-background-dark text-text-light font-medium">
              +{event.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Event Planner */}
        <div className="flex items-center mt-3 mb-4 pt-3 border-t border-background-dark">
          <img
            src={event.plannerImage}
            alt={event.plannerName}
            className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-primary-light/20"
          />
          <div>
            <p className="font-medium text-text">{event.plannerName}</p>
            <p className="text-xs text-text-muted">{event.plannerRole}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-auto pt-4">
          <button
            onClick={handlePaymentClick}
            className="flex-1 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-background-light font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard size={18} />
            <span>Pay Now</span>
          </button>

          <button
            onClick={handleMoreInfoClick}
            className="flex-1 bg-background border border-background-dark hover:bg-background-dark text-text font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
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
