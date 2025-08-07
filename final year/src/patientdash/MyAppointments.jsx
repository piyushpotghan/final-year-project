import React, { useEffect, useState } from "react";
import axios from "axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const email = userData.email;
      console.log("detching :", email);

      try {
        const res = await axios.get(`http://localhost:5000/api/appointments?email=${email}`);

        // 👇 Check if response is array, else set empty
        if (Array.isArray(res.data)) {
          setAppointments(res.data);
        } else {
          console.warn("Unexpected response:", res.data);
          setAppointments([]);
        }
      } catch (err) {
        console.error("Failed to fetch appointments", err);
        setAppointments([]); // 👈 fallback
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Appointments</h2>
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Doctor</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Reason</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(appointments) && appointments.length > 0 ? (
            appointments.map((appt, index) => (
              <tr key={index}>
                <td className="border p-2">{appt.doctorName}</td>
                <td className="border p-2">{appt.date}</td>
                <td className="border p-2">{appt.time}</td>
                <td className="border p-2">{appt.reason}</td>
                <td className="border p-2">{appt.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointments;