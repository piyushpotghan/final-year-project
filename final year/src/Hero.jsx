import React from 'react'
import WhyUs from './whyUs'

export default function Hero() {
  return (
    <>
    <section className="bg-gradient-to-r from-white via-blue-300 to-gray-200 pt-24 pb-12 px-6 md:px-20 overflow-x-hidden">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-8xl font-bold text-gray-800 leading-tight">
            Your Health Our <span className="text-blue-600">Priority</span>
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Trusted healthcare service at your fingertips. Find experienced doctors and get instant booking confirmation.
          </p>
          <div className="mt-6">
            <a href="#appointments" className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition">
              Apply Now
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center  ">
          <img 
          src="public/doctor1.png" alt="hii"
          className='className="w-full h-full max-w-3xl' />
        </div>

      </div>
    </section>
    <WhyUs/>
    </>
  );
}