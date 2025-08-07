import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      patientName: form.name,
      doctorName: doctor.name,
      doctorEmail: doctor.email,
      email: userData.email,
      date: form.date,
      time: form.time,
      reason: form.reason,
      status: "Pending",
    };

    try {
      await axios.post("http://localhost:5000/api/appointments/create", appointmentData); // ✅ use full data
      navigate("/my-appointments");
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold">
        Booking Appointment with: <br />
        <strong>{doctor.name}</strong> — {doctor.specialization}
      </h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="border p-2 w-full"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Reason for Appointment"
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Confirm Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;