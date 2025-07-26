import React from 'react';


export default function AdminDashboard() {
  return (

    <div className="p-10">
      <h1 className="text-4xl font-bold text-blue-700 pt-10">Admin Dashboard</h1>
      <p className="mt-4 text-lg">Welcome, Admin!</p>

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