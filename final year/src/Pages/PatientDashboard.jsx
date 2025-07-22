import React from "react";
export default function PatientDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">Welcome, Patient</h1>
      <p className="text-gray-500">Logged in as: {user?.email}</p>
    </div>
  );
}