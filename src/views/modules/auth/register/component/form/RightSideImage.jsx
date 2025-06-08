import React from "react";

const RightSideImage = () => {
  return (
    <div className="hidden lg:block lg:w-1/2 relative">
      <img
        src="https://images.pexels.com/photos/7648513/pexels-photo-7648513.jpeg"
        alt="Event Planning"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/80 mix-blend-multiply" />
      <div className="absolute inset-0 flex items-center justify-center p-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            Join Our Community
          </h1>
          <p className="text-xl text-white/90 max-w-xl">
            Create an account today and start planning your next memorable event
            with our powerful tools and resources
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightSideImage;