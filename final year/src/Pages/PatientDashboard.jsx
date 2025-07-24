import React from "react";
import Doctors from "./Doctors";
import Sidebar from "../dashboard/sidebar";
export default function PatientDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (

    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">Welcome, Patient</h1>
      <p className="text-gray-500 text-3xl font-bold">Logged in as  Patient: {user?.email}</p>
      <div>
        
        <Doctors/>
        <Sidebar/>
      </div>
    </div>
    
  );
}