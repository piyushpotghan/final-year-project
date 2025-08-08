import React, { useEffect, useState } from "react";
import axios from "axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const email = userData.email;

      try {
        const res = await axios.get(`http://localhost:5000/api/appointments?email=${email}`);
        setAppointments(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, []);

  const statusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-sm font-bold";
    if (status === "Approved") return `${base} bg-green-100 text-green-700`;
    if (status === "Pending") return `${base} bg-yellow-100 text-yellow-800`;
    if (status === "Cancelled") return `${base} bg-red-100 text-red-700`;
    return `${base} bg-gray-100 text-gray-700`;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-8 tracking-wide uppercase">
        My Appointments
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto bg-white border ">
          <thead className="bg-blue-600 text-white uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left font-bold">Doctor</th>
              <th className="py-3 px-6 text-left font-bold">Date</th>
              <th className="py-3 px-6 text-left font-bold">Time</th>
              <th className="py-3 px-6 text-left font-bold">Reason</th>
              <th className="py-3 px-6 text-left font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm font-medium divide-y divide-gray-200">
            {appointments.length > 0 ? (
              appointments
                .slice()
                .reverse()
                .map((appt, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50 transition duration-150"
                  >
                    <td className="py-4 px-6">{appt.doctorName}</td>
                    <td className="py-4 px-6">{appt.date}</td>
                    <td className="py-4 px-6">{appt.time}</td>
                    <td className="py-4 px-6">{appt.reason}</td>
                    <td className="py-4 px-6">
                      <span className={statusBadge(appt.status)}>{appt.status}</span>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;


