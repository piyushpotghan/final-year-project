import React, { useState } from "react";
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  // const user = JSON.parse(localStorage.getItem("user"));// Assuming user data is stored in localStorage

  return (
    <nav className="bg-gradient-to-r from-white via-blue-300 to-gray-500 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-4xl font-bold text-blue-600">MediCare</div>

        {/* Desktop Menu */}
        <div className=" flex items-center justify-center  space-x-12">
          <Link to="/" className="hover:text-white font-bold">Home</Link>
          <Link to="/" className="hover:text-white font-bold" onClick={() => {
            setTimeout(() => {
              const el = document.getElementById("whyus");
              el?.scrollIntoView({ behavior: "smooth" });
            }, 100); // delay ensures Home page loads first
          }}>
            About
          </Link>
          <Link to="/Contact" className="hover:text-white font-bold">Contact</Link>   
          <Link to="/Login" className="hover:text-white font-bold">Login</Link>
         <Link to="/SignUp" className="hover:text-white font-bold">Sign Up</Link> 
         {/* {user?.isAdmin && (
            <Link to="/admin" className="px-4 py-2 text-white">Admin</Link>
          )}      */}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <a href="#home" className="block text-gray-700 font-medium">Home</a>
          <a href="#doctors" className="block text-gray-700 font-medium">Doctors</a>
          <a href="#appointments" className="block text-gray-700 font-medium">Appointments</a>
          <a href="#about" className="block text-gray-700 font-medium">About</a>
          <a href="#contact" className="block text-gray-700 font-medium">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


