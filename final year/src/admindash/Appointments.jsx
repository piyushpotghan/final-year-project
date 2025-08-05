import React, { useContext } from 'react';
import { AppointmentContext } from '../data/AppointmentContext';

const Appointments = () => {
  const { appointments, setAppointments } = useContext(AppointmentContext);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...appointments];
    updated[index].status = newStatus;
    localStorage.setItem("appointments", JSON.stringify(updated));
    setAppointments(updated);
  };

  const getStatusBadge = (status) => {
    let baseStyle = "px-2 py-1 rounded text-xs font-semibold text-white";
    let color = "bg-yellow-500"; // Default
    if (status === "Confirmed") color = "bg-green-500";
    if (status === "Cancelled") color = "bg-red-500";
    return <span className={`${baseStyle} ${color}`}>{status}</span>;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">All Appointments</h2>

      {appointments.length === 0 ? (
        <div className="text-gray-500 text-center text-lg mt-10">
          🚫 No appointments found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-100 text-blue-800 text-sm font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Doctor</th>
                <th className="px-4 py-3 text-left">Reason</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Change Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-200">
              {appointments.map((apt, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-3">{apt.name}</td>
                  <td className="px-4 py-3">{apt.email}</td>
                  <td className="px-4 py-3">{apt.date}</td>
                  <td className="px-4 py-3">{apt.time}</td>
                  <td className="px-4 py-3">{apt.doctorName}</td>
                  <td className="px-4 py-3">{apt.reason}</td>
                  <td className="px-4 py-3">{getStatusBadge(apt.status)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={apt.status}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                      className="bg-gray-100 border border-gray-300 text-gray-800 text-sm px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Appointments;
