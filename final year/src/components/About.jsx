import React from 'react';

export default function About() {
  return (
    <section className="min-h-screen pt-28 px-4 sm:px-6 pb-16 bg-white text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-6">
        About Our Clinic Connect
      </h1>

      <p className="max-w-3xl mx-auto text-gray-700 text-base sm:text-lg leading-relaxed">
        Welcome to our Doctor Appointment System – a platform designed to simplify your healthcare experience.
        <br className="hidden sm:block" /><br />
        Our mission is to make it easy for patients to schedule appointments with qualified and experienced doctors. Whether you're looking for general consultation or specialized care, our system ensures fast, secure, and user-friendly access to medical professionals.
        <br className="hidden sm:block" /><br />
        We believe in bridging the gap between doctors and patients through digital innovation – putting your health just one click away.
      </p>
    </section>
  );
}
