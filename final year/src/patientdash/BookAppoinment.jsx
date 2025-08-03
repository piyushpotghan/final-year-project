import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppointmentContext } from "../data/AppointmentContext";

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;
  const { setAppointments } = useContext(AppointmentContext);

  // ✅ Get email from stored user object
  const userData = localStorage.getItem("user");
  let userEmail = "";
  if (userData) {
    const parsed = JSON.parse(userData);
    userEmail = parsed.email;
  }

  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!doctor || !userEmail) {
      alert("Missing doctor or user information.");
      return;
    }

    const appointment = {
      name: form.name,
      email: userEmail, // ✅ actual logged-in user's email
      reason: form.reason,
      doctorName: doctor.name,
      doctorEmail:doctor.email,
      specialty: doctor.specialty,
      dateTime: `${form.date} ${form.time}`,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("appointments") || "[]");
    existing.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(existing));
    setAppointments(existing);

    alert("Appointment booked successfully");
    navigate("/my-appointments");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow pt-28">
      {doctor ? (
        <div className="mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold">Booking Appointment with:</h2>
          <p className="text-md text-gray-700 mt-1">
            <strong>Dr. {doctor.name}</strong> — {doctor.specialty}
          </p>
          <p className="text-sm text-gray-500">{doctor.availability}</p>
        </div>
      ) : (
        <p className="text-red-600">No doctor data found.</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Your Name"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {/* Removed email input – it comes from login */}
        <input
          name="date"
          type="date"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="time"
          type="time"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="reason"
          placeholder="Reason for Appointment"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Confirm Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;