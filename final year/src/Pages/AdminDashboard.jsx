// src/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar';
import Sidebar from '../admindash/Sidebar';
import Topbar from '../admindash/Topbar';
import DashboardStats from '../admindash/DashboardStats';
import AdminAppointments from '../admindash/Appointments';
import AddDoctor from '../admindash/AddDoctor';
import DoctorsList from '../admindash/Doctorlist';
import ContactMessages from '../admindash/ContactMessages';
import DonorsList from '../admindash/DonorsList';
import AdminAmbulanceDetails from '../admindash/AdminAmbulanceDetails';

const AdminDashboard = () => {
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/doctors');
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();
        setTotalDoctors(data.length);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/patients');
        if (!response.ok) throw new Error("Failed to fetch patients");
        const data = await response.json();
        setTotalPatients(data.length);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/appointments/all');
        if (!response.ok) throw new Error("Failed to fetch appointments");
        const data = await response.json();
        setTotalAppointments(data.length);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchDoctors();
    fetchPatients();
    fetchAppointments();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar and Navbar */}
      <Navbar />
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 bg-gray-50">
        <Topbar />
        <div className="p-4 flex-1 overflow-y-auto">
          <Routes>
            {/* Dashboard home */}
            <Route
              index
              element={
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Welcome to Admin Dashboard
                  </h2>

                  <DashboardStats
                    totalDoctors={totalDoctors}
                    totalPatients={totalPatients}
                    totalAppointments={totalAppointments}
                  />

                  <div className="mt-8">
                    <AdminAppointments />
                  </div>
                </div>
              }
            />

            {/* Other admin pages */}
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="doctors-list" element={<DoctorsList />} />
            <Route path="contact-messages" element={<ContactMessages />} />
            <Route path="donors-list" element={<DonorsList />} />

            {/* ✅ Ambulance page nested inside AdminDashboard */}
                <Route path="/admin/ambulance" element={<AdminAmbulanceDetails/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;