import React, { useState, useEffect } from 'react';
import { 
  Handshake, Building, Globe, Briefcase, Award, ArrowRight, Star,
  Laptop, BarChart, Stethoscope, GraduationCap, ShoppingBag, Plane,
  PenTool, Coffee, Landmark, Hammer, BookOpen, Radio, Leaf
} from 'lucide-react';

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

  const easeOutQuart = (x) => {
    return 1 - Math.pow(1 - x, 4);
  };

  return count;
};

const partnerData = [
  {
    id: 1,
    name: "TechNova",
    category: "Technology",
    icon: <Laptop className="w-8 h-8 text-secondary" />,
  },
  {
    id: 2,
    name: "FinanceWorks",
    category: "Finance",
    icon: <BarChart className="w-8 h-8 text-secondary" />,
  },
  {
    id: 3,
    name: "MediCare Plus",
    category: "Healthcare",
    icon: <Stethoscope className="w-8 h-8 text-secondary" />,
  },
  {
    id: 4,
    name: "EduLearn",
    category: "Education",
    icon: <GraduationCap className="w-8 h-8 text-secondary" />,
  },
  {
    id: 5,
    name: "Corporate Solutions",
    category: "Finance",
    icon: <Briefcase className="w-8 h-8 text-secondary" />,
  },
  {
    id: 6,
    name: "Retail Nexus",
    category: "Technology",
    icon: <ShoppingBag className="w-8 h-8 text-secondary" />,
  },
  {
    id: 7,
    name: "TravelWise",
    category: "Technology",
    icon: <Plane className="w-8 h-8 text-secondary" />,
  },
  {
    id: 8,
    name: "Creative Studios",
    category: "Education",
    icon: <PenTool className="w-8 h-8 text-secondary" />,
  },
  {
    id: 9,
    name: "Cafe Connect",
    category: "Finance",
    icon: <Coffee className="w-8 h-8 text-secondary" />,
  },
  {
    id: 10,
    name: "BankTrust",
    category: "Finance",
    icon: <Landmark className="w-8 h-8 text-secondary" />,
  },
  {
    id: 11,
    name: "UrbanDevelopers",
    category: "Technology",
    icon: <Building className="w-8 h-8 text-secondary" />,
  },
  {
    id: 12,
    name: "BuildRight",
    category: "Technology",
    icon: <Hammer className="w-8 h-8 text-secondary" />,
  },
  {
    id: 13,
    name: "LearnOnline",
    category: "Education",
    icon: <BookOpen className="w-8 h-8 text-secondary" />,
  },
  {
    id: 14,
    name: "MediaWorks",
    category: "Technology",
    icon: <Radio className="w-8 h-8 text-secondary" />,
  },
  {
    id: 15,
    name: "GreenEnergy",
    category: "Healthcare",
    icon: <Leaf className="w-8 h-8 text-secondary" />,
  }
];

const featuredPartners = [
  {
    id: 1,
    name: "TechGlobe International",
    logo: "https://plus.unsplash.com/premium_photo-1672116453187-3aa64afe04ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    industry: "Technology",
    testimonial: "Our partnership has led to groundbreaking innovations in the tech space. Together, we've developed solutions that have transformed the industry landscape.",
    spokesperson: "Sarah Johnson, CEO"
  },
  {
    id: 2,
    name: "Green Earth Foundations",
    logo: "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    industry: "Sustainability",
    testimonial: "Through our collaboration, we've been able to implement sustainable practices across multiple sectors, driving real environmental change.",
    spokesperson: "Michael Chen, Director"
  }
];

const StatCard = ({ icon, value, label }) => (
  <div className="bg-background p-4 sm:p-6 rounded-xl shadow-md border border-background-dark transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
    <div className="flex items-center justify-center mb-3">
      {icon}
    </div>
    <div className="text-center">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-1">{value}+</h3>
      <p className="text-sm text-text-light">{label}</p>
    </div>
  </div>
);

const FeaturedPartnerCard = ({ partner }) => (
  <div className="bg-background rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group">
    <div className="md:flex">
      <div className="md:shrink-0 h-45 md:h-auto md:w-48 bg-background-light overflow-hidden">
        <img 
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110" 
          src={partner.logo}
          alt={`${partner.name} logo`}
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-2">
          <Star className="w-5 h-5 text-warning mr-2" />
          <div className="text-xs font-semibold px-2 py-1 rounded-full bg-primary-light/10 text-primary">
            {partner.industry}
          </div>
        </div>
        <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
          {partner.name}
        </h3>
        <p className="text-text-light mb-4 italic">"{partner.testimonial}"</p>
        <p className="text-sm font-medium text-text">{partner.spokesperson}</p>
      </div>
    </div>
  </div>
);

const PartnerCard = ({ partner }) => (
  <div className="bg-background p-6 rounded-xl shadow-sm border border-background-dark flex items-center justify-center h-32 transform transition-all duration-300 hover:shadow-md hover:scale-105 group">
    <div className="text-center">
      <div className="flex items-center justify-center h-12 mb-3">
        {partner.icon}
      </div>
      <h4 className="text-sm font-medium text-text group-hover:text-primary transition-colors">
        {partner.name}
      </h4>
    </div>
  </div>
);

const PartnersSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Technology', 'Finance', 'Healthcare', 'Education'];
  
  const partnersCounter = useCounterAnimation(150);
  const countriesCounter = useCounterAnimation(42);
  const projectsCounter = useCounterAnimation(320);
  const yearsCounter = useCounterAnimation(12);

  const filteredPartners = activeCategory === 'All'
    ? partnerData
    : partnerData.filter(partner => partner.category === activeCategory);

  return (  
    <section className="py-20 bg-gradient-to-b from-background to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16"> 
          <div className="flex items-center justify-center mb-4">
           
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-light">Trusted</span> Partners
            </h2>
          </div>
          <p className="max-w-2xl mx-auto text-text-light">
            We collaborate with industry leaders and innovators to deliver exceptional experiences and solutions for our clients.
          </p>
        </div>

        <div id="stats-section" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          <StatCard 
            icon={<Building className="w-6 h-6 text-secondary" />}
            value={partnersCounter}
            label="Global Partners"
          />
          <StatCard 
            icon={<Globe className="w-6 h-6 text-secondary" />}
            value={countriesCounter}
            label="Countries"
          />
          <StatCard 
            icon={<Briefcase className="w-6 h-6 text-secondary" />}
            value={projectsCounter}
            label="Joint Projects"
          />
          <StatCard 
            icon={<Award className="w-6 h-6 text-secondary" />}
            value={yearsCounter}
            label="Years Collaborating"
          />
        </div>

        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-text">Featured Partners</h3>
            <button className="flex items-center text-primary hover:text-primary-dark transition-colors">
              <span className="mr-2">View all partners</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPartners.map((partner) => (
              <FeaturedPartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-text mb-6">Our Global Network</h3>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-primary text-background'
                      : 'bg-background-light text-text-light hover:bg-background-dark'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredPartners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;