import React from 'react';
import { Mail, MapPin, Phone, Send, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import Logo from '../../assets/Logo.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-primary to-primary-dark text-background-light">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <div className='flex items-center gap-2.5'>
            <img className='w-7' src={Logo} alt='footer logo'/>
            <h3 className="text-sm font-bold text-background-light">Crystal Event Management</h3>
            </div>
          
            <p className="text-background-light/80 leading-relaxed">
              Transforming ordinary gatherings into extraordinary experiences with meticulous planning and flawless execution.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-background-light/70 hover:text-secondary transition-colors duration-300" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-background-light/70 hover:text-secondary transition-colors duration-300" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-background-light/70 hover:text-secondary transition-colors duration-300" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-background-light/70 hover:text-secondary transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-background-light">Quick Links</h3>
            <ul className="space-y-2">
              {['Corporate Events', 'Weddings', 'Conferences', 'Trade Shows', 'Social Gatherings', 'Virtual Events'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-background-light/80 hover:text-secondary flex items-center transition-colors duration-300">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-background-light">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-secondary-light shrink-0 mt-1 mr-3" />
                <span className="text-background-light/80">
                  1234 Event Avenue, Suite 500<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-secondary-light shrink-0 mr-3" />
                <span className="text-background-light/80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-secondary-light shrink-0 mr-3" />
                <span className="text-background-light/80">contact@eventcraft.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-background-light">Stay Updated</h3>
            <p className="text-background-light/80">
              Subscribe to our newsletter for the latest event trends and exclusive offers.
            </p>
            <form className="mt-2 space-y-3">
              <div className="flex items-center relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-2 bg-white/5 text-background-light rounded-lg border border-background-light/30 focus:ring-2 focus:ring-secondary focus:border-secondary"
                  required
                />
                <button 
                  type="submit" 
                  className="absolute right-2 p-1 rounded-md bg-secondary hover:bg-secondary-light text-white transition-colors duration-300"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-background-light/60">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-background-light/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-background-light/70 text-sm">
              &copy; {currentYear} EventCraft. All rights reserved.
            </p>
            
            {/* Legal Links */}
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <a href="#" className="text-background-light/70 hover:text-secondary transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-background-light/70 hover:text-secondary transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-background-light/70 hover:text-secondary transition-colors duration-300">
                Cookie Policy
              </a>
              <a href="#" className="text-background-light/70 hover:text-secondary transition-colors duration-300">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;