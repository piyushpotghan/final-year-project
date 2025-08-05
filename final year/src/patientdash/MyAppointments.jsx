import React, { useContext, useEffect, useState } from 'react';
import { AppointmentContext } from '../data/AppointmentContext';

const MyAppointments = () => {
  const { appointments } = useContext(AppointmentContext);
  const [userAppointments, setUserAppointments] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    let userEmail = '';

    if (userData) {
      const parsedUser = JSON.parse(userData);
      userEmail = parsedUser.email;
    }

    if (userEmail) {
      const filtered = appointments.filter((apt) => apt.email === userEmail);
      setUserAppointments(filtered);
    }
  }, [appointments]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">My Appointments</h2>

      {userAppointments.length === 0 ? (
        <p className="text-gray-600">No appointments found for your account.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
          <table className="min-w-full bg-white text-sm md:text-base">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="text-left p-3 border-b">Doctor</th>
                <th className="text-left p-3 border-b">Date</th>
                <th className="text-left p-3 border-b">Time</th>
                <th className="text-left p-3 border-b">Reason</th>
                <th className="text-left p-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {userAppointments.map((apt, index) => {
                const [date, time] = apt.dateTime
                  ? apt.dateTime.split(' ')
                  : [apt.date, apt.time];

                const statusClass = {
                  Confirmed: 'bg-green-500',
                  Cancelled: 'bg-red-500',
                  Pending: 'bg-yellow-500',
                };

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition duration-200 ease-in-out"
                  >
                    <td className="p-3 border-b">{apt.doctorName}</td>
                    <td className="p-3 border-b">{date}</td>
                    <td className="p-3 border-b">{time}</td>
                    <td className="p-3 border-b">{apt.reason}</td>
                    <td className="p-3 border-b">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs font-medium ${statusClass[apt.status] || 'bg-gray-400'}`}
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
