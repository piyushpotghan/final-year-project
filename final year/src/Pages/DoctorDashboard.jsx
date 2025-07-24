import React from 'react';

export default function DoctorDashboard() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-green-700">Doctor Dashboard</h1>
      <p className="mt-4 text-lg">Welcome, Doctor!</p>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/Login";
        }}
        className="bg-red-500 text-white px-4 py-2 mt-6 rounded"
      >
        Logout
      </button>
    </div>
  );
}
