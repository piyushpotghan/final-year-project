import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar"; // adjust path if needed

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    reason: "",
  });

  const [statusMessage, setStatusMessage] = useState(null); // ✅ Track success or error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      patientName: form.name,
      patientEmail: userData.email,
      doctorName: doctor.name,
      doctorEmail: doctor.email,
      email: userData.email,
      date: form.date,
      time: form.time,
      reason: form.reason,
      status: "Pending",
    };

    try {
      const res = await axios.post("http://localhost:5000/api/appointments/create", appointmentData);
      setStatusMessage({ type: "success", text: "✅ Appointment Confirmed!" });

      // Optional: redirect after short delay
      setTimeout(() => {
        navigate("/my-appointments");
      }, 1500);
    } catch (error) {
      console.error("Booking failed:", error);
      setStatusMessage({ type: "error", text: "❌ Appointment not booked. Try again." });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Book Appointment
          </h2>
          <p className="text-center text-gray-600 text-sm mb-4">
            with{" "}
            <span className="font-semibold text-blue-600">{doctor.name}</span>{" "}
            ({doctor.specialization})
          </p>

          {/* ✅ Show confirmation or error message */}
          {statusMessage && (
            <div
              className={`mb-4 text-center font-semibold ${
                statusMessage.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Reason for Appointment"
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Confirm Appointment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
