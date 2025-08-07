import React, { useEffect, useState, useContext } from "react";
import { DoctorContext } from "../data/DoctorContext";
import axios from "axios";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { loggedInDoctorEmail } = useContext(DoctorContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      console.log("logged in doctor email for context", loggedInDoctorEmail);
      if (!loggedInDoctorEmail) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/appointments/doctor?email=${loggedInDoctorEmail}`);
        setAppointments(res.data);
      } catch (error) {
        console.error("Error fetching doctor appointments:", error);
      }
    };

    fetchAppointments();
  }, [loggedInDoctorEmail]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/status`, {
        status: newStatus,
      });

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Your Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No appointments found.</p>
      ) : (
        <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-2">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white p-5 rounded-xl shadow border border-gray-200"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    👤 Patient: {appt.patientName}
                  </p>
                  <p className="text-gray-700 mt-1">📧 Email: {appt.email}</p>
                </div>
                <div>
                  <p className="text-gray-700">
                    📅 Date & Time: {appt.date} {appt.time}
                  </p>
                  <p className="text-gray-700 mt-1">
                    📌 Status:
                    <span
                      className={`ml-2 font-semibold px-2 py-1 rounded text-white ${
                        appt.status === "Approved"
                          ? "bg-green-500"
                          : appt.status === "Cancelled"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <label className="text-sm font-medium text-gray-600">
                  Update Status:
                </label>
                <select
                  className="border px-3 py-1 rounded"
                  value={appt.status}
                  onChange={(e) =>
                    handleStatusChange(appt._id, e.target.value)
                  }
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