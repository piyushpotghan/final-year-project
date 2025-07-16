import React, { useState } from "react";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-white via-blue-300 to-gray-500 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-4xl font-bold text-blue-600">MediCare</div>

        {/* Desktop Menu */}
        <div className=" flex items-center justify-center  space-x-12">
          <a href="#home" className="hover:text-white  font-bold">Home</a>
          <a href="#doctors" className="hover:text-white font-bold">login</a>
          <a href="#about" className="hover:text-white  font-bold">About</a>
          <a href="#contact" className="hover:text-white font-bold">Contact</a>
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