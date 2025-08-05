import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../doctordash/Sidebar";
import Header from "../doctordash/Header";
import DoctorAppointments from "../doctordash/DoctorAppointments";
import DoctorProfile from "../doctordash/DoctorProfile";
import { DoctorContext } from "../data/DoctorContext";
import { AppointmentContext } from "../data/AppointmentContext";
import doctorsData from "../data/doctorsdata";

import { FaMoneyBillWave, FaUserInjured, FaCalendarCheck } from "react-icons/fa";

const DoctorDashboard = () => {
  const { loggedInDoctorEmail } = useContext(DoctorContext);
  const { appointments } = useContext(AppointmentContext);
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

      const uniqueEmails = new Set(filtered.map((appt) => appt.patientEmail));
      setUniquePatients(uniqueEmails.size);
    }
  }, [appointments, loggedInDoctorEmail]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-8">
                  {/* Welcome */}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                      Welcome, {doctor?.name || "Doctor"} 👨‍⚕️
                    </h1>
                    <p className="text-gray-500 mt-1">Here’s today’s snapshot.</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 border">
                      <FaMoneyBillWave className="text-3xl text-green-500" />
                      <div>
                        <p className="text-gray-500 text-sm">Earnings</p>
                        <h2 className="text-2xl font-semibold text-gray-800">1300</h2>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 border">
                      <FaCalendarCheck className="text-3xl text-blue-500" />
                      <div>
                        <p className="text-gray-500 text-sm">Appointments</p>
                        <h2 className="text-2xl font-semibold text-gray-800">{doctorAppointments.length}</h2>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 border">
                      <FaUserInjured className="text-3xl text-purple-500" />
                      <div>
                        <p className="text-gray-500 text-sm">Patients</p>
                        <h2 className="text-2xl font-semibold text-gray-800">{uniquePatients}</h2>
                      </div>
                    </div>
                  </div>

                  {/* Profile Overview */}
                  <div className="bg-white rounded-xl shadow p-6 border">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Profile Overview
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                      <p><strong>Name:</strong> {doctor?.name}</p>
                      <p><strong>Speciality:</strong> {doctor?.speciality}</p>
                      <p><strong>Experience:</strong> {doctor?.experience} years</p>
                      <p><strong>Email:</strong> {doctor?.email}</p>
                    </div>
                    <button
                      onClick={() => navigate("profile")}
                      className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
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
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;

