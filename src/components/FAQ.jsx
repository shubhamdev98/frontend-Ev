import React, { useState } from 'react';
import { ChevronDown, MessageCircle, Search, Clock, DollarSign, Users, Calendar, Shield } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      question: "How far in advance should I book my event?",
      answer: "We recommend booking at least 6-8 months in advance for large events and 3-4 months for smaller gatherings. However, for peak seasons or popular venues, earlier booking is advised. We also offer expedited planning services for shorter timelines when possible."
    },
    {
      icon: <Clock className="w-5 h-5" />,
      question: "What is your typical event planning process?",
      answer: "Our process includes: 1) Initial consultation to understand your vision, 2) Proposal and budget planning, 3) Venue selection and vendor coordination, 4) Design and logistics planning, 5) Timeline creation, 6) Day-of coordination and execution. We maintain clear communication throughout each phase."
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      question: "How do you handle event budgeting?",
      answer: "We work with you to create a detailed budget breakdown based on your requirements. Our transparent pricing includes all costs upfront, with no hidden fees. We can adjust plans to accommodate different budget ranges while maintaining event quality."
    },
    {
      icon: <Users className="w-5 h-5" />,
      question: "What size events do you handle?",
      answer: "We manage events of all sizes, from intimate gatherings of 20 guests to large-scale corporate conferences of 1000+ attendees. Each event receives the same level of attention to detail and professional service, regardless of size."
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      question: "Do you offer day-of coordination services?",
      answer: "Yes, we offer comprehensive day-of coordination services. This includes vendor management, timeline execution, guest coordination, and problem-solving. We ensure everything runs smoothly so you can fully enjoy your event."
    },
    {
      icon: <Shield className="w-5 h-5" />,
      question: "What happens if there's an emergency or last-minute changes?",
      answer: "We always have contingency plans in place. Our team includes backup vendors, alternative timelines, and emergency protocols. We're available 24/7 during your event period to handle any unexpected situations professionally and efficiently."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-light">Questions</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Everything you need to know about our event planning services. Can't find what you're looking for? Feel free to contact us.
          </p>
        </div>

        {/* Search Bar */}
      

        {/* FAQ List */}
        <div className="max-w-7xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="text-secondary">
                    {faq.icon}
                  </div>
                  <span className="font-medium text-primary-dark">{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-secondary transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'py-4 border-t border-gray-100' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        
      </div>
    </section>
  );
};

export default FAQ;