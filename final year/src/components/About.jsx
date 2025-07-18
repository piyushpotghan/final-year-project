import React from 'react';

export default function About() {
  return (
     <div className="relative bg-gray-200">
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



    <section className="relative z-10 -mt-10">
      {/* <div className="bg-gradient-to-r from-white via-blue-300 to-gray-200 py-5 px-4 rounded-t-3xl shadow-lg"> */}
      <div className="py-7 px-4 rounded-t-3xl shadow-lg">

        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 hover:text-black mb-19 ">Why Us</h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 flex-wrap">
            {/* Feature Card 1 */}
            <div className="bg-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition w-full max-w-sm">
              <div className="text-indigo-600 mb-4 flex justify-center">
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Patient-Friendly</h3>
              <p className="text-gray-600 text-center">
                Clean UI for easy booking and management.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gray-100 rounded-2xl p-4 shadow-md hover:shadow-lg transition w-full max-w-sm">
              <div className="text-indigo-600 mb-4 flex justify-center">
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Real-time Scheduling</h3>
              <p className="text-gray-600 text-center">
                Manage doctor availability and appointments efficiently.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition w-full max-w-sm">
              <div className="text-indigo-600 mb-4 flex justify-center">
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Secure & Reliable</h3>
              <p className="text-gray-600 text-center">
                End-to-end encrypted data and secure login.
              </p>
            </div>

            <div className="bg-gray-100 rounded-2xl p-4 shadow-md hover:shadow-lg transition w-full max-w-sm">
              <div className="text-indigo-600 mb-4 flex justify-center">
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">All Insurance & TPA Accepted</h3>
              <p className="text-gray-600 text-center">
                we serve policyholders with all medical requirement on time
              </p>
            </div>

            <div className="bg-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition w-full max-w-sm">
              <div className="text-indigo-600 mb-4 flex justify-center">
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Highly-Qualified Doctors</h3>
              <p className="text-gray-600 text-center">
                Excellent Team of general physicians providing utmost care 24/7
              </p>
            </div>

          </div>


          
        </div>
      </div>
    </section>
  </div>
  );
};
    
 


