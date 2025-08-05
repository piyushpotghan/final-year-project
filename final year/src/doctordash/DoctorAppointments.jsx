import React, { useEffect, useState, useContext } from "react";
import { DoctorContext } from "../data/DoctorContext";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { loggedInDoctorEmail } = useContext(DoctorContext); // ✅ Get email only

  useEffect(() => {
    loadAppointments();
  }, [loggedInDoctorEmail]);

  const loadAppointments = () => {
    const data = JSON.parse(localStorage.getItem("appointments") || "[]");

    if (!loggedInDoctorEmail) return;

    const filtered = data.filter(
      (appt) => appt.doctorEmail === loggedInDoctorEmail
    );
    setAppointments(filtered.reverse());
  };

  const handleStatusChange = (index, newStatus) => {
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const current = appointments[index];

    const updated = allAppointments.map((appt) =>
      appt.name === current.name &&
      appt.dateTime === current.dateTime &&
      appt.doctorEmail === loggedInDoctorEmail
        ? { ...appt, status: newStatus }
        : appt
    );

    localStorage.setItem("appointments", JSON.stringify(updated));
    loadAppointments(); // reload
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Your Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No appointments found.</p>
      ) : (
        <div className="space-y-5 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 pr-2">
          {appointments.map((appt, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    👤 Patient:{" "}
                    <span className="font-normal text-gray-700">{appt.name}</span>
                  </p>
                  <p className="text-gray-700 mt-1">
                    🩺 Specialty: <span className="font-medium">{appt.speciality}</span>
                  </p>
                </div>

                <div>
                  <p className="text-gray-700">
                    📅 Date & Time: <span className="font-medium">{appt.dateTime}</span>
                  </p>
                  <p className="text-gray-700 mt-1">
                    📌 Status:{" "}
                    <span
                      className={`font-semibold px-2 py-1 rounded text-white ${
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

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <label className="text-sm font-medium text-gray-600">
                  Update Status:
                </label>
                <select
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={appt.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
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
