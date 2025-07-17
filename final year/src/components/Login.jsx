import React from 'react';

export default function Login() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100 px-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Welcome Back</h2>
        
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Login Button */}
          <div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </div>

          {/* Forgot Password / Register */}
          <div className="flex justify-between text-sm text-gray-600 mt-4">
            <a href="#" className="hover:underline">Forgot password?</a>
            <a href="#" className="hover:underline">Create account</a>
          </div>
        </form>
      </div>
    </section>
  );
}
