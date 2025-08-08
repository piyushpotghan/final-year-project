import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../admindash/Sidebar';
import Topbar from '../admindash/Topbar';

import Dashboard from '../admindash/Dashboard';
import Appointments from '../admindash/Appointments';
import AddDoctor from '../admindash/AddDoctor';
import DoctorsList from '../admindash/Doctorlist';
import DashboardStats from '../admindash/DashboardStats';
import LatestBookings from '../admindash/LatestBooking';
import doctorsData from '../data/doctorsData';
import { AppointmentContext } from '../data/AppointmentContext';
import Navbar from '../Navbar';

const AdminDashboard = () => {
  const totalDoctors = doctorsData.length;

  const { appointments } = useContext(AppointmentContext);
  const totalAppointments = appointments.length;

  const [totalPatients, setTotalPatients] = useState(0);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost5173/api/patients'); // 🔁 Replace with your real API
        const data = await response.json();
        setTotalPatients(data.length);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="flex h-screen">
      <Navbar/>
      <Sidebar />

      <div className="flex flex-col flex-1 bg-gray-50">
        <Topbar />
        <div className="p-4 flex-1 overflow-y-auto">
          <Routes>
            <Route
              index
              element={
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Welcome to Admin Dashboard
                  </h2>

                  {/* ✅ Pass updated stats */}
                  <DashboardStats
                    totalDoctors={totalDoctors}
                    totalPatients={totalPatients}
                    totalAppointments={totalAppointments}
                  />

                  <LatestBookings />
                </div>
              }
            />
            <Route index element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="doctors-list" element={<DoctorsList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;