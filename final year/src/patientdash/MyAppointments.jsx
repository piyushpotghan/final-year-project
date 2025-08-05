import React, { useContext, useEffect, useState } from 'react';
import { AppointmentContext } from '../data/AppointmentContext';

const MyAppointments = () => {
  const { appointments } = useContext(AppointmentContext);
  const [userAppointments, setUserAppointments] = useState([]);

  useEffect(() => {
    // Get logged-in user email from localStorage
    const userData = localStorage.getItem("user");
    let userEmail = "";

    if (userData) {
      const parsedUser = JSON.parse(userData);
      userEmail = parsedUser.email; // ✅ fetch from saved user object
    }

    if (userEmail) {
      const filtered = appointments.filter((apt) => apt.email === userEmail);
      setUserAppointments(filtered);
    }
  }, [appointments]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Appointments</h2>
      {userAppointments.length === 0 ? (
        <p className="text-gray-600">No appointments found for your account.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 border">Doctor</th>
                <th className="text-left p-3 border">Date</th>
                <th className="text-left p-3 border">Time</th>
                <th className="text-left p-3 border">Reason</th>
                <th className="text-left p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {userAppointments.map((apt, index) => {
                const [date, time] = apt.dateTime
                  ? apt.dateTime.split(" ")
                  : [apt.date, apt.time];

                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-3 border">{apt.doctorName}</td>
                    <td className="p-3 border">{date}</td>
                    <td className="p-3 border">{time}</td>
                    <td className="p-3 border">{apt.reason}</td>
                    <td className="p-3 border">
                      <span
                        className={`px-2 py-1 rounded text-white text-sm ${
                          apt.status === "Confirmed"
                            ? "bg-green-500"
                            : apt.status === "Cancelled"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;