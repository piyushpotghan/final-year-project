import React from "react";
import { useNavigate } from "react-router-dom";

export default function PatientTopbar({ title = "" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold text-gray-700">{title}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
