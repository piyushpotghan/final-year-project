import React from 'react';

export default function Contact() {
  return (
      <section className="min-h-screen pt-28 px-4 sm:px-6 pb-12 sm:pb-16 bg-gradient-to-br from-blue-50 to-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-blue-700 mb-4 sm:mb-6">
        Get in Touch with Us
      </h1>
      <p className="text-center text-gray-600 text-sm sm:text-base mb-10 max-w-2xl mx-auto px-2">
        Have questions or need to book an appointment? Fill out the form below and our clinic team will reach out shortly.
      </p>

      <form className="w-full max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-5 sm:space-y-6">
        {/* Name */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">Phone Number</label>
          <input
            type="tel"
            placeholder="e.g., +91 9876543210"
            className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Reason for Contact */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">Reason for Contact</label>
          <select
            className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            required
          >
            <option value="">-- Select --</option>
            <option>Book Appointment</option>
            <option>Report Issue</option>
            <option>General Inquiry</option>
            <option>Feedback</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">Your Message</label>
          <textarea
            rows="4"
            placeholder="Write your message here..."
            className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-md hover:bg-blue-700 transition-all text-sm sm:text-base"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
