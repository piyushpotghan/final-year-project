import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../doctordash/Sidebar";
import Header from "../doctordash/Header";
import DoctorAppointments from "../doctordash/DoctorAppointments";
import DoctorProfile from "../doctordash/DoctorProfile";
import { DoctorContext } from "../data/DoctorContext";
import { AppointmentContext } from "../data/AppointmentContext"; // ✅ Added
import doctorsData from "../data/doctorsData";

const DoctorDashboard = () => {
  const { loggedInDoctorEmail } = useContext(DoctorContext);
  const { appointments } = useContext(AppointmentContext); // ✅ Get all appointments
  const navigate = useNavigate();

  const doctor = doctorsData.find((doc) => doc.email === loggedInDoctorEmail);

  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [uniquePatients, setUniquePatients] = useState(0);

  useEffect(() => {
    if (appointments && loggedInDoctorEmail) {
      const filtered = appointments.filter(
        (appt) => appt.doctorEmail === loggedInDoctorEmail
      );
      setDoctorAppointments(filtered);

      const uniqueEmails = new Set(filtered.map(appt => appt.patientEmail));
      setUniquePatients(uniqueEmails.size);
    }
  }, [appointments, loggedInDoctorEmail]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        <Header />
        <div className="p-6">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1 className="text-2xl font-bold mb-6">Welcome, Dr. {doctor?.name || "Doctor"} 👨‍⚕️</h1>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-gray-500 text-sm">Earnings</p>
                      <h3 className="text-2xl font-bold mt-2">$130</h3>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-gray-500 text-sm">Appointments</p>
                      <h3 className="text-2xl font-bold mt-2">{doctorAppointments.length}</h3>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-gray-500 text-sm">Patients</p>
                      <h3 className="text-2xl font-bold mt-2">{uniquePatients}</h3>
                    </div>
                  </div>

                  {/* Profile Overview */}
                  <div className="bg-white p-4 rounded-lg shadow mt-6">
                    <h2 className="text-lg font-semibold mb-2">Profile Overview</h2>
                    <p><strong>Name:</strong> {doctor?.name}</p>
                    <p><strong>Speciality:</strong> {doctor?.speciality}</p>
                    <p><strong>Experience:</strong> {doctor?.experience} years</p>
                    <p><strong>Email:</strong> {doctor?.email}</p>
                    <button
                      onClick={() => navigate("profile")}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View Full Profile
                    </button>
                  </div>
                </div>
              }
            />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="profile" element={<DoctorProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;