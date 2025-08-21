import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
    navigate("/verify-otp", { state: { email } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 px-4">
      {/* Glassmorphic Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md transform transition-all hover:scale-[1.02] duration-300">
        
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-white drop-shadow mb-8 tracking-wide">
          Forgot Password
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-cyan-500 hover:to-blue-600 transform hover:scale-[1.02] transition duration-200"
          >
            Send OTP
          </button>
        </form>

        {/* Info Text */}
        <p className="text-center text-sm text-gray-200 mt-6">
          Enter your registered email. We’ll send you an OTP to reset your password.
        </p>
      </div>
    </div>
  );
}