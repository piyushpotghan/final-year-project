import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaCalendarAlt, FaClock, FaStickyNote } from "react-icons/fa";

const BookAppointment = () => {
  const { state } = useLocation();
  const doctor = state?.doctor;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    alert(`Appointment booked with ${doctor?.name || "the doctor"}!`);
    console.log("Form Data:", form);
    navigate("/patient/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-12">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl space-y-6">
        {doctor ? (
          <div className="mb-6 border-b pb-4">
            <h2 className="text-3xl font-semibold text-blue-800">{doctor.name}</h2>
            <p className="text-lg text-gray-600">{doctor.specialty}</p>
            <p className="text-sm text-gray-500 mt-1">Available: {doctor.availability}</p>
            <p className="text-sm text-gray-500">Fee: {doctor.fee}</p>
          </div>
        ) : (
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold text-red-500">No doctor selected!</h2>
            <p className="text-gray-600 mt-2">Please select a doctor first.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div className="relative col-span-1 sm:col-span-2">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              name="name" value={form.name} onChange={handleChange}
              placeholder="Your Name" required
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="Your Email" required
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
          {/* Date */}
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="date" name="date" value={form.date} onChange={handleChange} required
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
          {/* Time */}
          <div className="relative">
            <FaClock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="time" name="time" value={form.time} onChange={handleChange} required
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
          {/* Reason */}
          <div className="relative sm:col-span-2">
            <FaStickyNote className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="reason" value={form.reason} onChange={handleChange}
              placeholder="Reason for appointment" required
              className="w-full pl-10 pr-4 py-3 border rounded-lg h-28 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
          {/* Submit */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={!doctor}
              className={`w-full py-3 text-white rounded-lg transition ${
                doctor ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
