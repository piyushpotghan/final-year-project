import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("http://localhost:5000m/api/auth/reset-password", {
        email: state.email,
        password,
      });
      alert("✅ Password reset successful!");
      navigate("/");
    } catch (err) {
      alert("❌ Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
      <div className="w-full max-w-md p-8 bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/30 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-center text-white drop-shadow-lg">
          Reset Password
        </h2>
        <p className="text-sm text-gray-200 text-center mt-2">
          Enter your new password below
        </p>

        <form onSubmit={handleReset} className="mt-6 space-y-5">
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-3 border border-gray-300/40 rounded-xl bg-white/30 backdrop-blur-md placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-600 hover:to-indigo-600 shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            {loading ? (
              <svg
                className="w-5 h-5 mr-2 text-white animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : null}
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}