import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, Calendar, User, Ticket, ChevronDown, Instagram, Facebook, Mail } from 'lucide-react';
import SubNavbar from '../Home/SubNavbar';
import Logo from '../../assets/Logo.png'
import { NavLink } from 'react-router';

const navigationItems = [
  { name: 'Events', href: '/event', current: true },
  { name: 'Venues', href: '#', current: false },
  { name: 'Memories', href: '#', current: false },
  {
    name: 'Blog',
    href: '#',
    current: false,
    dropdown: [
      { name: 'Success Story', href: '#'},
      { name: 'Daily Updates', href: '#' },
      { name: 'Important Blog', href: '#' },
    ]
  },
  {
    name: 'Help',
    href: '#',
    current: false,
    dropdown: [
      { name: 'Contact', href: '#' },
      { name: 'Support', href: '#' },
      { name: 'API', href: '#' }
    ]
  }
];  

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [visible, setVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
          
          if (scrollDifference > 5) {
            setVisible(
              currentScrollY < lastScrollY.current || 
              currentScrollY < 60 
            );
            lastScrollY.current = currentScrollY;
            setScrollPosition(currentScrollY);
          }
          
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownClick = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const renderNavItem = (item) => {
    if (item.dropdown) {
      return (
        <div key={item.name} className="relative dropdown-container">
          <button 
            className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
              item.current 
                ? 'text-secondary' 
                : 'text-white hover:text-secondary'
            } transition-colors duration-200`}
            onClick={() => handleDropdownClick(item.name)}
          >
            {item.name}
            <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
              activeDropdown === item.name ? 'rotate-180' : ''
            }`} />
          </button>
          
          {activeDropdown === item.name && (
            <div className="absolute z-50 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-primary/10 transform opacity-100 scale-100 transition-all duration-200">
              <div className="py-1" role="menu" aria-orientation="vertical">
                {item.dropdown.map((dropdownItem) => (
                  <a
                    key={dropdownItem.name}
                    href={dropdownItem.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-secondary transition-colors duration-200"
                    role="menuitem"
                  >
                    {dropdownItem.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <a
        key={item.name}
        href={item.href}
        className={`px-3 py-2 text-sm font-medium ${
          item.current 
            ? 'text-secondary' 
            : 'text-white hover:text-secondary'
        } transition-colors duration-200`}
      >
        {item.name}
      </a>
    );
  };

  const renderMobileNavItem = (item) => {
    if (item.dropdown) {
      return (
        <div key={item.name} className="space-y-1 dropdown-container">
          <button 
            className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-secondary transition-colors duration-200"
            onClick={() => handleDropdownClick(item.name)}
          >
            {item.name}
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
          </button>
          {activeDropdown === item.name && item.dropdown.map((dropdownItem) => (
            <a
              key={dropdownItem.name}
              href={dropdownItem.href}
              className="block pl-8 pr-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-secondary transition-colors duration-200"
            >
              {dropdownItem.name}
            </a>
          ))}
        </div>
      );
    }

    return (
      <a
        key={item.name}
        href={item.href}
        className={`block px-4 py-2 text-base font-medium ${
          item.current 
            ? 'text-secondary bg-gray-100' 
            : 'text-gray-700 hover:bg-gray-100 hover:text-secondary'
          } transition-colors duration-200`}
      >
        {item.name}
      </a>
    );
  };

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-300 ease-in-out ${
        visible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}
    >
      <nav className="bg-gradient-to-b from-primary to-primary-dark border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/">
                <div className="flex-shrink-0 flex items-center gap-1.5">
                  <img className="w-10" src={Logo} alt='Navbar logo' />
                  <p className='text-white font-bold text-sm md:hidden'>Crystal Event Management</p>
                </div>
              </a>
             
              <div className="hidden lg:ml-10 lg:flex lg:items-center lg:space-x-2">
                {navigationItems.map(renderNavItem)}
              </div>
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search events..."
                  className="w-75 pl-10 pr-4 py-2 border border-primary/20 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200 bg-background-light"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-light" />
              </div>

              <div className="flex items-center space-x-4 border-l border-r px-6 py-2 border-white/30">
                <a href="#" className="text-white hover:text-secondary transition-colors duration-200">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-white hover:text-secondary transition-colors duration-200">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-white hover:text-secondary transition-colors duration-200">
                  <Mail className="h-5 w-5" />
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-white hover:text-secondary transition-colors duration-200">
                  <Ticket className="h-5 w-5" />
                  <span className="text-sm font-medium">My Tickets</span>
                </button>
                
                <div className="relative dropdown-container">
                  <button 
                    className="flex items-center space-x-1 text-white hover:text-secondary transition-colors duration-200"
                    onClick={() => handleDropdownClick('Account')}
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">Account</span>
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === 'Account' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {activeDropdown === 'Account' && (
                    <div className="absolute right-0 z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-primary/10 transform opacity-100 scale-100 transition-all duration-200 origin-top-right">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <NavLink
                          to="/signin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-secondary transition-colors duration-200"
                          role="menuitem"
                        >
                          Sign In
                        </NavLink>
                        <NavLink
                          to="/signup"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-secondary transition-colors duration-200"
                          role="menuitem"
                        >
                          Sign Up
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-secondary hover:bg-primary-light/10 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-primary/10">
            <div className="pt-5 pb-3 space-y-1 bg-white">
              <div className="px-4 pb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search events..."
                    className="w-full pl-10 pr-4 py-2 border border-primary/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-background-light"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-light" />
                </div>
              </div>

              {navigationItems.map(renderMobileNavItem)}

              <div className="border-t border-gray-200 pt-4">
                <a href="#" className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-secondary">
                  <Ticket className="h-5 w-5 mr-3" />
                  My Tickets
                </a>
                
                <div className="space-y-1 dropdown-container">
                  <button 
                    className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-secondary transition-colors duration-200"
                    onClick={() => handleDropdownClick('MobileAccount')}
                  >
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-3" />
                      Account
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === 'MobileAccount' ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === 'MobileAccount' && (
                    <>
                      <NavLink
                        to="/signin"
                        className="block pl-12 pr-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-secondary transition-colors duration-200"
                      >
                        Sign In
                      </NavLink>
                      <NavLink
                        to="/signup"
                        className="block pl-12 pr-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-secondary transition-colors duration-200"
                      >
                        Sign Up
                      </NavLink>
                    </>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 px-4">
                <div className="flex items-center space-x-6 py-2">
                  <a href="#" className="text-primary-light hover:text-secondary transition-colors duration-200">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-primary-light hover:text-secondary transition-colors duration-200">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-primary-light hover:text-secondary transition-colors duration-200">
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      <SubNavbar />
    </div>
  );
};

export default Navbar;