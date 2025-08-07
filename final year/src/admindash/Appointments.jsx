import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/appointments/all");
        setAppointments(res.data);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/status`, {
        status: newStatus,
      });

      setAppointments(prev =>
        prev.map(appt =>
          appt._id === id ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Appointments</h2>
      <div className="space-y-4">
        {appointments.map(appt => (
          <div key={appt._id} className="bg-white p-4 shadow rounded border">
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Patient:</strong> {appt.patientName}</p>
              <p><strong>Doctor:</strong> {appt.doctorName}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Reason:</strong> {appt.reason}</p>
              <p><strong>Status:</strong> {appt.status}</p>
            </div>
            <div className="mt-3">
              <label className="mr-2">Update Status:</label>
              <select
                value={appt.status}
                onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAppointments;