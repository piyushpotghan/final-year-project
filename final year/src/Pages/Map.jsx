import React, { useEffect, useState } from "react";

const images = [
  "/images/img1.png",
  "/images/img3.jpg",
  "/images/img4.jpg" // Add more images as needed
];

const Map = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header */}
      <div className="flex bg-blue-100 text-blue-900 font-semibold text-xl p-4">
        <div className="w-1/2 text-center border-r border-blue-300">Test</div>
        <div className="w-1/2 text-center">Location</div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left: Image Slider */}
        <div className="w-full md:w-1/2 h-1/2  relative overflow-hidden">
          <img
            src={images[current]}
            alt="Medical Slide"
            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === current ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Right: Map Display */}
        <div className="w-full md:w-1/2 h-1/2">
          <iframe
            title="Medical Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.8150010134223!2d73.98732077422214!3d18.582377367285314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c37c101a601b%3A0xa93da586ac881245!2sLifeline%20Hospital!5e0!3m2!1sen!2sin!4v1752914483738!5m2!1sen!2sin" 
            height="100%"
            allowFullScreen=""
            loading="lazy"
            className="border-0 w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Map;