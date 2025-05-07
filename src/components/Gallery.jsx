import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      id: 1,
      url: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
      title: "Corporate Conference",
      category: "Conference"
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg",
      title: "Elegant Wedding",
      category: "Wedding"
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/50675/banquet-wedding-society-deco-50675.jpeg",
      title: "Luxury Banquet",
      category: "Events"
    },
    {
      id: 4,
      url: "https://images.pexels.com/photos/7248266/pexels-photo-7248266.jpeg",
      title: "Tech Symposium",
      category: "Conference"
    },
    {
      id: 5,
      url: "https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg",
      title: "Garden Wedding",
      category: "Wedding"
    },
    {
      id: 6,
      url: "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg",
      title: "Corporate Meetup",
      category: "Events"
    }
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const previousIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[previousIndex]);
  };

  const handleNext = () => {
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIndex]);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            Our Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-light">Gallery</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Browse through our collection of successful events and memorable moments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300"
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                  <p className="text-white/80 text-sm">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-secondary transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-secondary transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-h-[80vh] max-w-[90vw] object-contain"
            />

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-secondary transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              <p className="text-white/80">{selectedImage.category}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;