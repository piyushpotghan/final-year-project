import React from "react";
import {
  FaHome,
  FaUserMd,
  FaCalendarCheck,
  FaCommentDots,
  FaCog,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { BsClipboardCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="h-screen w-20 bg-white shadow-md flex flex-col justify-between items-center py-6 fixed top-0 left-0 z-50">
      {/* Logo */}
      <div className="flex flex-col items-center space-y-6">
        <div
          className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center font-bold text-white text-xl cursor-pointer"
          onClick={() => navigate("/patient/dashboard")}
        >
          H
        </div>

        {/* Navigation Icons */}
        <div className="flex flex-col items-center space-y-6 mt-8 text-gray-500 text-xl">
          <FaHome
            className="hover:text-cyan-500 cursor-pointer"
            onClick={() => navigate("/patient/dashboard")}
          />
          <FaCalendarCheck
            className="hover:text-cyan-500 cursor-pointer"
            onClick={() => navigate("/my-appointments")} // Example route
          />
          <FaUserMd
            className="hover:text-cyan-500 cursor-pointer"
            onClick={() => navigate("/doctors")} // Example route for doctor list
          />
      
          <FaCommentDots
            className="hover:text-cyan-500 cursor-pointer"
            onClick={() => navigate("/reviews")} // Example reviews route
          />
          <FaCog
            className="hover:text-cyan-500 cursor-pointer"
            onClick={() => navigate("/settings")} // Settings page
          />
        </div>
      </div>

      {/* Logout */}
      <div
        className="text-red-500 text-2xl cursor-pointer"
        onClick={handleLogout}
      >
        <MdLogout />
      </div>
    </div>
  );
};

export default Sidebar;