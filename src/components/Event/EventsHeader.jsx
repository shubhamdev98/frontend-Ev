

const EventsHeader = () => {
  return (
    <div className="relative mb-10">
     
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 rounded-xl overflow-hidden z-0">
        <img 
          src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Events background" 
          className="w-full h-full object-cover mix-blend-overlay opacity-40"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 px-8 py-16 text-white">
        
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Upcoming <span className="text-indigo-300">Events</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
          Discover and book exceptional experiences curated by our professional event planners. 
          From elegant weddings to corporate summits, we have events for every occasion.
        </p>
      </div>
    </div>
  );
};

export default EventsHeader;