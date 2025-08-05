import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import doctorsData from "../data/doctorsData";
import { DoctorContext } from "../data/DoctorContext";

const LoginDoctor = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // password use karaycha asel tar data madhe add kara
  const { setLoggedInDoctorEmail } = useContext(DoctorContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    const doctor = doctorsData.find(d => d.email === email);

    if (doctor) {
      setLoggedInDoctorEmail(doctor.email);
      navigate("/doctordashboard");
    } else {
      alert("Doctor not found or incorrect email.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Doctor Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginDoctor;