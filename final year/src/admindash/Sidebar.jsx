import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  UserPlus, 
  Users, 
  LogOut, 
  Mail, 
  Ambulance 
} from 'lucide-react';  // ✅ Ambulance icon import

const Sidebar = () => {
  const navigate = useNavigate();

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // ✅ Sidebar menu items
  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <Home size={20} /> },
    { name: "Appointments", path: "/admin/dashboard/appointments", icon: <Calendar size={20} /> },
    { name: "Add Doctor", path: "/admin/dashboard/add-doctor", icon: <UserPlus size={20} /> },
    { name: "Doctors List", path: "/admin/dashboard/doctors-list", icon: <Users size={20} /> },
    { name: "Contact Messages", path: "/admin/dashboard/contact-messages", icon: <Mail size={20} /> },
    { name: "Donors List", path: "/admin/dashboard/donors-list", icon: <Users size={20} /> },
    { name: "Ambulance Bookings", path: "/admin/ambulance", icon: <Ambulance size={20} /> }, // ✅ New option
  ];

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg border-r border-gray-200 flex flex-col justify-between p-6">
      {/* ✅ Sidebar header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-600 mb-10 text-center tracking-wide">
          MediCare
        </h1>

        {/* ✅ Navigation links */}
        <nav className="flex flex-col space-y-3">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-500'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* ✅ Logout button */}
      <div className="mt-10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition duration-200"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;