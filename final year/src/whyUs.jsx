import React from "react";

const WhyUs = () => {
  return (
    <section className="relative z-10 -mt-16">
      <div className="bg-gradient-to-r from-white via-blue-300 to-gray-200 py-5 px-4 rounded-t-3xl shadow-lg">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Why Us</h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 flex-wrap">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition w-full max-w-sm">
              <div className="text-indigo-600 mb-4 flex justify-center">
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Patient-Friendly</h3>
              <p className="text-gray-600 text-center">
                Clean UI for easy booking and management.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition w-full max-w-sm">
              <div className="text-indigo-600 mb-4 flex justify-center">
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Real-time Scheduling</h3>
              <p className="text-gray-600 text-center">
                Manage doctor availability and appointments efficiently.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition w-full max-w-sm">
              <div className="text-indigo-600 mb-4 flex justify-center">
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Secure & Reliable</h3>
              <p className="text-gray-600 text-center">
                End-to-end encrypted data and secure login.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs