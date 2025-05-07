import React from 'react';
import { Star, Quote, ThumbsUp, MessageCircle, Send } from 'lucide-react';

const Feedback = () => {


  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Corporate Event Manager",
      company: "Tech Innovations Inc.",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
      content: "EventCraft transformed our annual conference into an unforgettable experience. Their attention to detail and innovative solutions exceeded all expectations.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Wedding Client",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200",
      content: "Our dream wedding became reality thanks to EventCraft. Every detail was perfect, and our guests are still talking about it months later!",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Global Solutions Ltd.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
      content: "The team's creativity and professionalism made our product launch a massive success. They handled everything flawlessly.",
      rating: 5
    }
  ];



  return (
    <section className="py-20 bg-gradient-to-b from-white to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-light">Clients</span> Say
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Don't just take our word for it. Here's what our clients have to say about their experiences with EventCraft.
          </p>
        </div>

        {/* Stats Section */}
        

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex flex-col gap-4 transform transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-primary-dark">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  {testimonial.company && (
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <div className="relative">
                <Quote className="w-8 h-8 text-secondary/20 absolute -top-2 -left-2" />
                <p className="text-gray-600 relative z-10 pl-4">{testimonial.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Form */}
     
      </div>
    </section>
  );
};

export default Feedback;