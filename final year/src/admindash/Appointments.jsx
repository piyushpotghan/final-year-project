import React, { useContext } from 'react';
import { AppointmentContext } from '../data/AppointmentContext';

const Appointments = () => {
  const { appointments, setAppointments } = useContext(AppointmentContext);

  // Handle status change
  const handleStatusChange = (index, newStatus) => {
    const updated = [...appointments];
    updated[index].status = newStatus;

    // Save to localStorage
    localStorage.setItem("appointments", JSON.stringify(updated));

    // Update context
    setAppointments(updated);
  };

  // Function to render colored badge
  const getStatusBadge = (status) => {
    let color = "bg-yellow-500"; // Default: Pending
    if (status === "Confirmed") color = "bg-green-500";
    if (status === "Cancelled") color = "bg-red-500";
    return (
      <span className= "px-2 py-1 text-white rounded text-sm ${color}}">
        {status}
      </span>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Doctor</th>
              <th className="border p-2">Reason</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt, index) => (
              <tr key={index}>
                <td className="border p-2">{apt.name}</td>
                <td className="border p-2">{apt.email}</td>
                <td className="border p-2">{apt.date}</td>
                <td className="border p-2">{apt.time}</td>
                <td className="border p-2">{apt.doctorName}</td>
                <td className="border p-2">{apt.reason}</td>
                <td className="border p-2">{getStatusBadge(apt.status)}</td>
                <td className="border p-2">
                  <select
                    value={apt.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="border p-1 rounded"
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
      )}
    </div>
  );
};

export default Appointments;