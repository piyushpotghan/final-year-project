import React from 'react';

export default function About() {
  return (
     <div className="relative bg-gray-100">
    {/* Background image on right half */}
    <div
      className="absolute inset-y-0 right-0 w-1/2 bg-cover  bg-no-repeat z-0 bg-right"
      style={{ backgroundImage: "url('https://www.quickobook.com/assets/img/about-4.jpg')" }}
    />

    {/* Optional translucent overlay to improve text contrast */}
    <div className="absolute inset-y-0 right-0 w-1/2 bg-white/60 z-10" />

    {/* Text content */}
    <div className="relative z-20 container mx-auto p-20 text-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">About Us</h1>
      <h2 className="text-4xl font-extrabold text-blue-800 mb-2">
        Quality Healthcare Made Simple
      </h2>
      <h3 className="text-2xl font-semibold text-gray-700 mb-6">Our Mission</h3>
      <p className="text-gray-800 text-lg max-w-3xl mx-auto leading-relaxed">
        Medicare is on a mission to make quality healthcare affordable and accessible for over a billion+ Indians. We believe in empowering our users with the most accurate, comprehensive, and curated information and care, enabling them to make better healthcare decisions and book appointments.
      </p>
    </div>

    {/* Mobile fallback */}
    <div className="block md:hidden h-64 bg-gray-200" />
  </div>
  );
};
    
 


