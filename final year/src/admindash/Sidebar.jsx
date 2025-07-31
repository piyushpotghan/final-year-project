import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Calendar, UserPlus, Users, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // token etc. clear
    navigate('/'); // back to homepage or login
  };

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <Home size={18} /> },
    { name: "Appointments", path: "/admin/dashboard/appointments", icon: <Calendar size={18} /> },
    { name: "Add Doctor", path: "/admin/dashboard/add-doctor", icon: <UserPlus size={18} /> },
    { name: "Doctors List", path: "/admin/dashboard/doctors-list", icon: <Users size={18} /> },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-full p-5 flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold mb-8 text-blue-600">Medicare</div>
        <nav className="space-y-2">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md font-medium ${
                  isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout button at bottom */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2 mt-8 rounded-md font-medium text-red-600 hover:bg-red-50"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;