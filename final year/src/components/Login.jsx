import React from "react";

export default function Login() {
  return (
    <section className="min-h-screen flex">
      {/* Left: Large Image Section (70%) */}
      <div className="w-[60%] hidden md:flex items-center justify-center bg-blue-100">
        <img
          src="loginpage.svg"
          alt="Login Illustration"
          className="w-[90%] h-auto object-contain"
        />
      </div>

      {/* Right: Small Login Panel (30%) */}
      <div className="w-full md:w-[40%] flex items-center justify-center bg-white shadow-lg">
        <div className="w-full px-8">
          <h2 className="text-5xl font-bold text-center text-blue-600 mb-6">
            Login
          </h2>

          <form className="space-y-4">
            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-700 text-2xl">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
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
