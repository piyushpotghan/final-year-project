import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/Auth"; // Make sure this file exists and is imported

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = login({ email, password });

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/patient/dashboard");
      }
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    
    <section className="min-h-screen flex">
      {/* Left: Image Section */}
      <div className="w-[60%] hidden md:flex items-center justify-center bg-blue-100">
        <img
          src="loginpage.svg"
          alt="Login Illustration"
          className="w-[90%] h-auto object-contain"
        />
      </div>

      {/* Right: Login Form */}
      <div className="w-full md:w-[40%] flex items-center justify-center bg-white shadow-lg">
        <div className="w-full px-8">
          <h2 className="text-5xl font-bold text-center text-blue-600 mb-6">
            Login
          </h2>

          {error && (
            <p className="text-red-500 text-center text-lg mb-4">{error}</p>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-700 text-2xl">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-gray-700 text-2xl">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-[20px]"
            >
              Log In
            </button>

            {/* Links */}
            <div className="flex justify-between mt-3 text-[15px] text-gray-600">
              <a href="#" className="hover:underline">Forgot?</a>
              <a href="#" className="hover:underline">Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </section>
    
  );
}