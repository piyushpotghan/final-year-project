import React, { useState } from "react";

export default function Donate() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const [donorName, setDonorName] = useState("");
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-red-100 via-white to-blue-100 min-h-screen pt-16 pb-8">
        <div className="relative bg-white/90 border-4 border-blue-400 rounded-3xl shadow-2xl max-w-xl w-full px-8 py-10 flex flex-col items-center" style={{background: 'radial-gradient(circle at 50% 30%, #f3f4f6 60%, #fff 100%)'}}>
          {/* Decorative Ribbon */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-10">
            <svg width="180" height="50" viewBox="0 0 180 50">
              <rect x="0" y="15" width="180" height="20" rx="10" fill="#2563eb" />
              <text x="90" y="32" textAnchor="middle" fontFamily="serif" fontSize="20" fill="#fff" fontWeight="bold">CERTIFICATE</text>
            </svg>
          </div>
          <div className="flex justify-center w-full mb-2" style={{ marginTop: '-2.5rem' }}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/012/627/730/original/3d-label-ribbon-glossy-gold-blank-plastic-banner-for-advertisment-promo-and-decoration-elements-high-quality-isolated-render-png.png"
              alt="Gold Ribbon"
              className="h-16 md:h-24 object-contain"
              style={{margin: '0 auto', maxWidth: '400px'}}
            />
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-yellow-700 tracking-wide text-center mb-2" style={{fontFamily: 'serif', letterSpacing: 2}}>Blood Donation Certificate</div>
          <div className="text-base md:text-lg text-gray-700 font-medium text-center mb-6" style={{fontFamily: 'serif'}}>
            This certificate is proudly presented to
          </div>
          <div className="text-2xl md:text-3xl font-bold text-red-700 text-center mb-2 underline decoration-wavy" style={{fontFamily: 'serif'}}>{donorName || "[Donor Name]"}</div>
          <div className="text-base md:text-lg text-gray-700 font-medium text-center mb-6" style={{fontFamily: 'serif'}}>
            in recognition of their generous blood donation at <span className="text-blue-700 font-bold">MediCare Hospital</span>.<br/>
            Your selfless act is deeply appreciated and will help save precious lives.<br/>
            <span className="italic text-gray-600">Thank you for being a real-life hero!</span>
          </div>
          <div className="flex flex-row justify-between w-full mt-8 mb-2 px-2">
            <div className="text-left">
              <div className="font-semibold text-gray-600">Date</div>
              <div className="text-gray-800">{new Date().toLocaleDateString()}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-600">Authorized by MediCare</div>
              <div className="text-gray-800 mt-2 font-cursive text-lg"><svg width="100" height="30"><text x="0" y="20" fontFamily="cursive" fontSize="20" fill="#2563eb">MediCare</text></svg></div>
            </div>
          </div>
          <div className="w-full border-t-2 border-blue-400 mt-6 pt-2 text-center text-xs text-gray-500 tracking-widest">MediCare Hospital &bull; Your Health, Our Priority</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-white to-red-200">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="bg-white/90 p-0 rounded-3xl shadow-2xl max-w-2xl w-full flex flex-col items-center animate-fade-in">
          <form onSubmit={handleSubmit} className="w-full px-6 md:px-10 py-8 flex flex-col items-center rounded-lg shadow-xl bg-white hover:shadow-2xl transition-all duration-300">
            {/* Branding */}
            <div className="mb-2 mt-10 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-blue-700 tracking-wide">MediCare Hospital</span>
              <span className="text-xs text-gray-500 font-semibold">Your Health, Our Priority</span>
            </div>
            {/* Motivational Heading & Emoji */}
            <h1 className="text-4xl font-extrabold mb-2 text-red-700 text-center tracking-tight drop-shadow flex items-center justify-center gap-2">
              <span role="img" aria-label="blood">🩸</span> Blood Donation Form <span role="img" aria-label="heart">❤️</span>
            </h1>
            {/* Blood Donation Fact */}
            <div className="mb-6 text-center text-red-600 font-semibold text-sm bg-red-50 rounded-lg px-4 py-2 shadow">
              Every 2 seconds, someone needs blood. Your donation can save lives!
            </div>
            {/* 2-column grid for all fields */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* First Name */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">First Name</label>
                <input type="text" name="firstName" required className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" onChange={e => setDonorName(e.target.value + (donorName.split(" ")[1] ? (" " + donorName.split(" ")[1]) : ""))} />
              </div>
              {/* Last Name */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Last Name</label>
                <input type="text" name="lastName" required className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" onChange={e => setDonorName((donorName.split(" ")[0] || "") + " " + e.target.value)} />
              </div>
              {/* Birth Date */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Birth Date</label>
                <input type="date" name="birthDate" required className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
              </div>
              {/* Occupation */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Occupation</label>
                <input type="text" name="occupation" required className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
              </div>
              {/* Gender */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Gender</label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center"><input type="radio" name="gender" value="male" className="mr-2" required /> Male</label>
                  <label className="flex items-center"><input type="radio" name="gender" value="female" className="mr-2" /> Female</label>
                  <label className="flex items-center"><input type="radio" name="gender" value="other" className="mr-2" /> Other</label>
                </div>
              </div>
              {/* Phone Number */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Phone Number</label>
                <input type="text" name="phone" required className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
              </div>
              {/* Email */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Email</label>
                <input type="email" name="email" required className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
              </div>
              {/* Address */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Address</label>
                <input type="text" name="address" required className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
              </div>
              {/* City */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">City</label>
                <input type="text" name="city" required className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
              </div>
              {/* Country */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Country</label>
                <input type="text" name="country" required className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
              </div>
              {/* Zip Code */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Zip Code</label>
                <input type="text" name="zip" required className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
              </div>
              {/* Last Donation */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Last time you donated blood?</label>
                <input type="date" name="lastDonation" className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
              </div>
              {/* Donated Previously */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Have you donated previously?</label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center"><input type="radio" name="donatedPreviously" value="yes" className="mr-2" required /> Yes</label>
                  <label className="flex items-center"><input type="radio" name="donatedPreviously" value="no" className="mr-2" /> No</label>
                </div>
              </div>
              {/* Medications in last 72 hours */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-semibold text-gray-700">Are you taking or have you taken any of these in the past 72 hours?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label className="flex items-center"><input type="checkbox" name="medications" value="antibiotics" className="mr-2" /> Antibiotics</label>
                  <label className="flex items-center"><input type="checkbox" name="medications" value="steroids" className="mr-2" /> Steroids</label>
                  <label className="flex items-center"><input type="checkbox" name="medications" value="aspirin" className="mr-2" /> Aspirin</label>
                  <label className="flex items-center"><input type="checkbox" name="medications" value="vaccinations" className="mr-2" /> Vaccinations</label>
                  <label className="flex items-center"><input type="checkbox" name="medications" value="alcohol" className="mr-2" /> Alcohol</label>
                  <label className="flex items-center"><input type="checkbox" name="medications" value="dogbite" className="mr-2" /> Dog bite rabies vaccine (1 year)</label>
                </div>
              </div>
              {/* Surgery/Blood Transfusion History */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-semibold text-gray-700">Is there any history of surgery or blood transfusion in the past six months?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className="flex items-center"><input type="checkbox" name="surgeryHistory" value="major" className="mr-2" /> Major Surgery</label>
                  <label className="flex items-center"><input type="checkbox" name="surgeryHistory" value="minor" className="mr-2" /> Minor Surgery</label>
                  <label className="flex items-center"><input type="checkbox" name="surgeryHistory" value="bloodTransfusion" className="mr-2" /> Blood Transfusion</label>
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <button type="submit" className="bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-3 rounded-full shadow-lg hover:scale-110 hover:from-red-600 hover:to-red-800 transition-all font-bold text-lg tracking-wide animate-bounce-slow">
              Donate Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
