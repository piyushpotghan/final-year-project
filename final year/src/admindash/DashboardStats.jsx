import React from 'react';

const DashboardStats = ({ totalDoctors, totalPatients, totalAppointments }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white shadow rounded-lg p-4 text-center">
        <h3 className="text-xl font-bold">{totalDoctors}</h3>
        <p className="text-gray-600">Total Doctors</p>
      </div>

      <div className="bg-white shadow rounded-lg p-4 text-center">
        <h3 className="text-xl font-bold">{totalPatients}</h3>
        <p className="text-gray-600">Total Patients</p>
      </div>

      <div className="bg-white shadow rounded-lg p-4 text-center">
        <h3 className="text-xl font-bold">{totalAppointments}</h3>
        <p className="text-gray-600">Total Appointments</p>
      </div>
    </div>
  );
};

export default DashboardStats;