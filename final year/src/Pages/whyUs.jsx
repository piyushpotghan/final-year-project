import React from "react";
import QuoteSection from './QuoteSection';

const WhyUs = () => {
  return (
    <>
      <QuoteSection />

      <section className="relative z-10 -mt-10">
        <div className="py-10 px-4 rounded-t-3xl shadow-lg bg-white/70 backdrop-blur">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center pt-5">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10">
                Why Choose Us
              </h2>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8 flex-wrap">

              {/* Card 1 */}
              <div className="bg-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition w-full max-w-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">User-Friendly Experience</h3>
                <p className="text-gray-600 text-center">
                  Intuitive interface designed for effortless appointment booking and management.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition w-full max-w-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Real-Time Scheduling</h3>
                <p className="text-gray-600 text-center">
                  Doctors and patients stay updated with live availability and instant booking.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition w-full max-w-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Secure & Reliable</h3>
                <p className="text-gray-600 text-center">
                  End-to-end encryption and secure login ensure complete data privacy.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition w-full max-w-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Insurance & TPA Support</h3>
                <p className="text-gray-600 text-center">
                  We partner with all major insurance providers to streamline your claims process.
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition w-full max-w-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Qualified Medical Experts</h3>
                <p className="text-gray-600 text-center">
                  A trusted team of certified doctors committed to delivering care 24/7.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyUs;
