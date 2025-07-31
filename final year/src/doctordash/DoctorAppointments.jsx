import React, { useEffect, useState, useContext } from "react";
import { DoctorContext } from "../data/DoctorContext";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { loggedInDoctorEmail } = useContext(DoctorContext); // ✅ Get email only

  useEffect(() => {
    loadAppointments();
  }, [loggedInDoctorEmail]);

  const loadAppointments = () => {
    const data = JSON.parse(localStorage.getItem("appointments") || "[]");

    if (!loggedInDoctorEmail) return;

    const filtered = data.filter(
      (appt) => appt.doctorEmail === loggedInDoctorEmail // ✅ Match by email
    );
    setAppointments(filtered.reverse());
  };

  const handleStatusChange = (index, newStatus) => {
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");

    const current = appointments[index];

    const updated = allAppointments.map((appt) =>
      appt.name === current.name &&
      appt.dateTime === current.dateTime &&
      appt.doctorEmail === loggedInDoctorEmail
        ? { ...appt, status: newStatus }
        : appt
    );

    localStorage.setItem("appointments", JSON.stringify(updated));
    loadAppointments(); // reload
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {appointments.map((appt, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <p><strong>Patient:</strong> {appt.name}</p>
              <p><strong>Speciality:</strong> {appt.speciality}</p>
              <p><strong>Date & Time:</strong> {appt.dateTime}</p>
              <p><strong>Status:</strong> {appt.status}</p>

              <div className="mt-2">
                <label className="text-sm mr-2">Update Status:</label>
                <select
                  className="border px-2 py-1 rounded"
                  value={appt.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;