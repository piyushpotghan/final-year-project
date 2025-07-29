import React, { useState } from "react";
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

const navItems = [
  { icon: <FaHome />, label: "Home", path: "/patient/dashboard" },
  { icon: <FaCalendarCheck />, label: "Appointments", path: "/my-appointments" },
  { icon: <FaUserMd />, label: "Doctors", path: "/doctors" },
 
  { icon: <FaCommentDots />, label: "Reviews", path: "/reviews" },
  { icon: <FaCog />, label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className={`h-screen bg-white shadow-md fixed top-0 left-0 z-50
        flex flex-col justify-between transition-width duration-300
        ${collapsed ? "w-16" : "w-60"}
      `}
    >
      {/* Logo / Toggle */}
      <div className="flex flex-col items-center p-4 space-y-6">
        <div
          className="cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? "☰" : "✕"}
        </div>
        <div
          className={`w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center
            font-bold text-white text-2xl cursor-pointer transition-transform duration-300
            hover:scale-110
          `}
          onClick={() => navigate("/patient/dashboard")}
          title="Dashboard"
        >
          M
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="mt-8 space-y-4">
          {navItems.map(({ icon, label, path }) => (
            <li key={label}>
              <button
                className="flex items-center w-full text-gray-600 hover:text-cyan-500
                  transition-colors duration-200 hover:bg-cyan-50 py-2 px-3 rounded-md"
                onClick={() => navigate(path)}
                title={collapsed ? label : undefined}
              >
                <span className="text-xl">{icon}</span>
                {!collapsed && (
                  <span className="ml-3 text-base font-medium">{label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-red-500 hover:text-red-600
            transition-colors duration-200 py-2 px-3 rounded-md"
          title={collapsed ? "Logout" : undefined}
        >
          <span className="text-2xl">
            <MdLogout />
          </span>
          {!collapsed && <span className="ml-3 text-base font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;