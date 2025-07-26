import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Appointment booked with ${doctor?.name || "the doctor"}!'); // ✅ Fixed interpolation
    console.log("Form Data:", form);
    navigate("/patient/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        {doctor ? (
          <div className="mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Booking with {doctor.name}
            </h2>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
            <p className="text-sm text-gray-500 mt-1">
              Available: {doctor.availability}
            </p>
            <p className="text-sm text-gray-500">Consultation Fee: {doctor.fee}</p>
          </div>
        ) : (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-red-500">
              No doctor selected!
            </h2>
            <p className="text-gray-600 mt-2">
              Please go back to the dashboard and select a doctor to book.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            className="w-full border p-2 rounded"
            value={form.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            className="w-full border p-2 rounded"
            value={form.time}
            onChange={handleChange}
            required
          />
          <textarea
            name="reason"
            placeholder="Reason for appointment"
            className="w-full border p-2 rounded"
            value={form.reason}
            onChange={handleChange}
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={!doctor}
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;