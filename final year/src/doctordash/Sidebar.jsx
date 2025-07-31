import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/doctordashboard" },
    { name: "Appointments", path: "/doctordashboard/appointments" },
    { name: "Profile", path: "/doctordashboard/profile" },
  ];

  const handleLogout = () => {
    // No clearing localStorage
    navigate("/login");
  };

  return (
    <div className="w-60 bg-white shadow-md border-r p-5 min-h-screen flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-10">Medicare</h2>
        <div className="space-y-4">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-10 block w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;