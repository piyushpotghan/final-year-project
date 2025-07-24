<<<<<<< HEAD
import React from "react";
import Doctors from "./Doctors";
import Sidebar from "../dashboard/sidebar";
export default function PatientDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
=======
import React from 'react';
>>>>>>> c3c3a6b962cf7f264a786121c5d06f8c65dfaba6

export default function PatientDashboard() {
  return (
<<<<<<< HEAD

    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">Welcome, Patient</h1>
      <p className="text-gray-500 text-3xl font-bold">Logged in as  Patient: {user?.email}</p>
      <div>
        
        <Doctors/>
        <Sidebar/>
      </div>
=======
    <div className="p-10">
      <h1 className="text-4xl font-bold text-purple-700">Patient Dashboard</h1>
      <p className="mt-4 text-lg">Welcome, Patient!</p>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/Login";
        }}
        className="bg-red-500 text-white px-4 py-2 mt-6 rounded"
      >
        Logout
      </button>
>>>>>>> c3c3a6b962cf7f264a786121c5d06f8c65dfaba6
    </div>
    
  );
}
