import React, { useRef, useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';

const SubNavbar = () => {
  const scrollContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`bg-background border-b border-primary/10 py-2`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 py-1 w-full">
            <div className="relative flex w-full">
              <div className="relative w-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-background to-transparent z-[1] pointer-events-none"></div>
                
                <div 
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto scrollbar-hide whitespace-nowrap gap-2 py-1"
                  style={{ 
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                  }}
                >
                  <a href="#" className="text-xs px-3 py-1 bg-background-light rounded-full text-text-light hover:bg-secondary hover:text-white transition-colors duration-200">
                    Music
                  </a>
                  <a href="#" className="text-xs px-3 py-1 bg-background-light rounded-full text-text-light hover:bg-secondary hover:text-white transition-colors duration-200">
                    Sports
                  </a>
                  <a href="#" className="text-xs px-3 py-1 bg-background-light rounded-full text-text-light hover:bg-secondary hover:text-white transition-colors duration-200">
                    Arts
                  </a>
                  <a href="#" className="text-xs px-3 py-1 bg-background-light rounded-full text-text-light hover:bg-secondary hover:text-white transition-colors duration-200">
                    Food & Drink
                  </a>
                  <a href="#" className="text-xs px-3 py-1 bg-background-light rounded-full text-text-light hover:bg-secondary hover:text-white transition-colors duration-200">
                    Workshops
                  </a>
                  <a href="#" className="text-xs px-3 py-1 bg-background-light rounded-full text-text-light hover:bg-secondary hover:text-white transition-colors duration-200">
                    Technology
                  </a>
                  <a href="#" className="text-xs px-3 py-1 bg-background-light rounded-full text-text-light hover:bg-secondary hover:text-white transition-colors duration-200">
                    Fashion
                  </a>
                  <a href="#" className="text-xs px-3 py-1 bg-background-light rounded-full text-text-light hover:bg-secondary hover:text-white transition-colors duration-200">
                    Health & Wellness
                  </a>
                  <a href="#" className="text-xs px-3 py-1 bg-background-light rounded-full text-text-light hover:bg-secondary hover:text-white transition-colors duration-200">
                    Business
                  </a>
                  <a href="#" className="text-xs px-3 py-1 bg-background-light rounded-full text-text-light hover:bg-secondary hover:text-white transition-colors duration-200">
                    Education
                  </a>
                </div>
                
                <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent z-[1] pointer-events-none"></div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-end space-x-2 mt-2 sm:mt-0 min-w-max bg-secondary/10 px-4 py-1.5 rounded-full">
              <Sparkles className="h-4 w-4 text-secondary animate-pulse" />
              <span className="text-xs font-medium text-secondary">
                Early Bird Offer: 20% off on all premium events!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;