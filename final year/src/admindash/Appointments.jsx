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

  const statusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-sm font-semibold ";
    if (status === "Approved") return base + "bg-green-100 text-green-700";
    if (status === "Pending") return base + "bg-yellow-100 text-yellow-700";
    if (status === "Cancelled") return base + "bg-red-100 text-red-700";
    return base + "bg-gray-100 text-gray-700";
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        All Appointments
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.length > 0 ? (
          appointments
            .slice()
            .reverse()
            .map((appt) => (
              <div
                key={appt._id}
                className="bg-white shadow-md border border-gray-200 rounded-xl p-5 transition-all hover:shadow-xl"
              >
                {/* 👇 Patient name on a separate bold line */}
                <h3 className="text-xl font-bold text-blue-700 mb-1">
                  {appt.patientName}
                </h3>

                {/* 👇 Doctor name below patient */}
                <p className="text-xl font-medium text-gray-600 mb-1">
                  with  {appt.doctorName}
                </p>

                <div className="text-gray-700 text-sm font-medium space-y-1">
                  <p><span className="font-semibold">Date:</span> {appt.date}</p>
                  <p><span className="font-semibold">Time:</span> {appt.time}</p>
                  <p><span className="font-semibold">Reason:</span> {appt.reason}</p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className={statusBadge(appt.status)}>{appt.status}</span>
                  </p>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-semibold mr-2">Change Status:</label>
                  <select
                    value={appt.status}
                    onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                    className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg italic">
            No appointments found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminAppointments;

