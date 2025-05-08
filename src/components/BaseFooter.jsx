import React from 'react';
import { Mail, MapPin, Phone, Send, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const BaseFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-primary to-primary-dark text-background-light">
      {/* Main Footer */}
     
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

export default BaseFooter;