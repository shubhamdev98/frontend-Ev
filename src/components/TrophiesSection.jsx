import React, { useState, useEffect } from 'react';
import { Award, Star, Users, Calendar, TrendingUp, Trophy } from 'lucide-react';

// Counter animation hook
const useCounterAnimation = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = document.getElementById('stats-section');
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const startValue = 0;
    const changeInValue = target - startValue;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuart(progress);
      setCount(Math.floor(startValue + changeInValue * easedProgress));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [target, duration, isVisible]);

  // Easing function for smooth animation
  const easeOutQuart = (x) => {
    return 1 - Math.pow(1 - x, 4);
  };

  return count;
};

const TrophiesSection = () => {
  // Statistics counters
  const eventsCounter = useCounterAnimation(500);
  const clientsCounter = useCounterAnimation(120);
  const yearsCounter = useCounterAnimation(15);
  const awardsCounter = useCounterAnimation(32);

  // Trophy data
  const trophies = [
    {
      id: 1,
      icon: <Trophy className="w-12 h-12 text-secondary" />,
      title: "Best Event Management Company",
      organization: "International Events Association",
      year: "2024",
      description: "Recognized for excellence in corporate event planning and execution."
    },
    {
      id: 2,
      icon: <Star className="w-12 h-12 text-secondary" />,
      title: "Gold Medal for Creative Direction",
      organization: "Global Event Awards",
      year: "2023",
      description: "Awarded for innovative approach to event design and experiences."
    },
    {
      id: 3,
      icon: <Award className="w-12 h-12 text-secondary" />,
      title: "Excellence in Sustainability",
      organization: "Green Events Foundation",
      year: "2023",
      description: "Leading the industry in sustainable event practices."
    },
    {
      id: 4,
      icon: <Trophy className="w-12 h-12 text-secondary" />,
      title: "Top Luxury Wedding Planner",
      organization: "Wedding Industry Excellence",
      year: "2022",
      description: "Recognized for creating unforgettable luxury wedding experiences."
    }
  ];

  return (
    <section className="py-20 bg-background to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-light">Recognition</span> & Achievements
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Celebrating excellence in event planning and execution with industry-leading accolades.
          </p>
        </div>

        {/* Stats section */}
        <div id="stats-section" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          <StatCard 
            icon={<Calendar className="w-6 h-6 text-secondary" />}
            value={eventsCounter}
            label="Events Organized"
          />
          <StatCard 
            icon={<Users className="w-6 h-6 text-secondary" />}
            value={clientsCounter}
            label="Happy Clients"
          />
          <StatCard 
            icon={<TrendingUp className="w-6 h-6 text-secondary" />}
            value={yearsCounter}
            label="Years Experience"
          />
          <StatCard 
            icon={<Award className="w-6 h-6 text-secondary" />}
            value={awardsCounter}
            label="Industry Awards"
          />
        </div>
        
        {/* Featured trophies */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {trophies.map((trophy) => (
            <TrophyCard key={trophy.id} trophy={trophy} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Component for individual stat cards
const StatCard = ({ icon, value, label }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="flex items-center justify-center mb-3">
        {icon}
      </div>
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-1">{value}+</h3>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
};

// Component for individual trophy cards
const TrophyCard = ({ trophy }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 group transform transition-all duration-300 hover:shadow-xl hover:border-secondary/30">
      <div className="flex flex-col gap-4">
        <div className="flex-shrink-0 bg-primary-dark/5 p-4 rounded-full w-fit transform group-hover:scale-110 transition-all duration-300">
          {trophy.icon}
        </div>
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-xl font-bold text-primary-dark group-hover:text-secondary transition-colors duration-300">
              {trophy.title}
            </h3>
            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-secondary/10 text-secondary w-fit">
              {trophy.year}
            </span>
          </div>
          <p className="text-sm text-gray-600 font-medium mt-1 mb-2">{trophy.organization}</p>
          <p className="text-gray-700">{trophy.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TrophiesSection;