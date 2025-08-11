import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../admindash/Sidebar';
import Topbar from '../admindash/Topbar';
import Navbar from '../Navbar';
import Dashboard from '../admindash/Dashboard';
import Appointments from '../admindash/Appointments';
import AddDoctor from '../admindash/AddDoctor';
import DoctorsList from '../admindash/Doctorlist';
import DashboardStats from '../admindash/DashboardStats';
import LatestBookings from '../admindash/LatestBooking';
import { AppointmentContext } from '../data/AppointmentContext';


const AdminDashboard = () => {
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);

  const { appointments } = useContext(AppointmentContext);
  const totalAppointments = appointments.length;

  useEffect(() => {
    // 🩺 Doctors fetch
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://192.168.138.151:5000/api/doctors'); // 🔁  backend doctors API
        const data = await response.json();
        setTotalDoctors(data.length);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    // 🧍 Patients fetch
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://192.168.138.151:5000/api/patients'); // 🔁 patients API
        const data = await response.json();
        setTotalPatients(data.length);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchDoctors();
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