
import React from 'react';
import { Calendar, ChevronRight, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="min-h-screen pt-20 relative bg-gradient-to-b from-primary-dark to-primary overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
      
        <img 
          src="https://plus.unsplash.com/premium_photo-1663089174939-5870e2e8d62e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbnR8ZW58MHx8MHx8fDA%3D" 
          alt="Corporate event venue" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-primary-light/70"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left column - Main content */}
          <div className="md:col-span-7 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 backdrop-blur-sm">
              <Star className="w-4 h-4 text-secondary-light" />
              <span className="ml-2 text-sm font-medium text-background-light">Premier Event Solutions</span>
            </div>

            {/* Headline with animation */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background-light leading-tight animate-fadeIn">
              Crafting Unforgettable <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-light to-secondary">Event Experiences</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-background-light/90 max-w-2xl">
              From corporate gatherings to dream weddings, we bring your vision to life with meticulous planning and flawless execution.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 rounded-lg bg-secondary hover:bg-secondary-dark text-white font-medium transition-all duration-300 shadow-lg hover:shadow-secondary/30 flex items-center justify-center transform hover:-translate-y-1">
                Plan Your Event <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <button className="px-6 py-3 rounded-lg bg-transparent hover:bg-white/10 border border-background-light text-background-light font-medium transition-all duration-300 flex items-center justify-center">
                <Calendar className="mr-2 w-5 h-5" /> Browse Venues
              </button>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 border-t border-background-light/20">
              <p className="text-background-light/70 text-sm mb-3">Trusted by industry leaders</p>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="text-background-light/90 font-semibold">Google</div>
                <div className="text-background-light/90 font-semibold">Microsoft</div>
                <div className="text-background-light/90 font-semibold">Adobe</div>
                <div className="text-background-light/90 font-semibold">IBM</div>
              </div>
            </div>
          </div>

          {/* Right column - Card */}
          <div className="md:col-span-5">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-background-light/20 p-6 shadow-xl animate-float">
              <h3 className="text-xl font-semibold text-background-light mb-4">Quick Event Finder</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-background-light text-sm font-medium mb-1">Event Type</label>
                  <select className="w-full px-4 py-2 bg-white/5 text-background-light rounded-lg border border-background-light/30 focus:ring-2 focus:ring-secondary focus:border-secondary">
                    <option>Corporate Event</option>
                    <option>Wedding</option>
                    <option>Conference</option>
                    <option>Trade Show</option>
                    <option>Social Event</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-background-light text-sm font-medium mb-1">Expected Guests</label>
                  <input type="number" placeholder="Number of guests" className="w-full px-4 py-2 bg-white/5 text-background-light rounded-lg border border-background-light/30 focus:ring-2 focus:ring-secondary focus:border-secondary" />
                </div>
                
                <div>
                  <label className="block text-background-light text-sm font-medium mb-1">Date</label>
                  <input type="date" className="w-full px-4 py-2 bg-white/5 text-background-light rounded-lg border border-background-light/30 focus:ring-2 focus:ring-secondary focus:border-secondary" />
                </div>
                
                <button className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-secondary to-secondary-light rounded-lg text-white font-medium hover:from-secondary-dark hover:to-secondary transition-all duration-300 shadow-lg hover:shadow-secondary/30">
                  Find Perfect Venues
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured event types */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {['Corporate', 'Wedding', 'Conference', 'Trade Show'].map((type) => (
            <div key={type} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-background-light/20 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <h3 className="text-background-light font-medium group-hover:text-secondary-light transition-colors duration-200">{type}</h3>
              <p className="text-background-light/70 text-sm mt-1">Premium venues</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;