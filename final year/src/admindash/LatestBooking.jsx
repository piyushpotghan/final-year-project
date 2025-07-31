import React, { useEffect, useState } from "react";

const LatestBookings = ({ title = "Latest Bookings", limit = 5, doctorName = null }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments") || "[]");

    // Optional filtering by doctor name
    const filtered = doctorName
      ? data.filter((appt) => appt.doctorName === doctorName)
      : data;

    setAppointments(filtered);
  }, [doctorName]);

  const latest = appointments.slice(-limit).reverse();

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>

      {latest.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        latest.map((appt, index) => (
          <div key={index} className="border-t pt-2 pb-3 text-sm">
            <p><strong>Patient:</strong> {appt.name}</p>
            <p><strong>Doctor:</strong> {appt.doctorName} ({appt.speciality})</p>
            <p><strong>Time:</strong> {appt.dateTime}</p>
            <p><strong>Status:</strong> {appt.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default LatestBookings;