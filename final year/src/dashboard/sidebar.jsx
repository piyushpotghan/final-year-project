import React from 'react';
import {
  Home,
  Users,
  Settings,
  Menu,
  LogOut,
  BarChart3,
} from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const menus = [
    { name: 'Dashboard', icon: Home },
    { name: 'Users', icon: Users },
    { name: 'appointment', icon: BarChart3 },
    { name: 'Settings', icon: Settings },

  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gradient-to-b from-blue-800 to-blue-900 text-white min-h-screen
        ${isOpen ? 'w-64' : 'w-20'} duration-300 shadow-2xl p-5 relative font-sans`}
      >
        {/* Toggle Button */}
        <div
          className="absolute -right-3 top-6 bg-white text-blue-800 rounded-full shadow-md cursor-pointer"
          onClick={toggleSidebar}
        >
          <Menu className="w-6 h-6 m-1" />
        </div>

        {/* Logo */}
        <div className="text-center py-6">
          <h1 className={`text-2xl font-extrabold tracking-wide uppercase transition-all duration-300 ${!isOpen && 'scale-0'}`}>
            Admin
          </h1>
        </div>

        {/* Menu Items */}
        <ul className="space-y-4 mt-6">
          {menus.map((menu, index) => {
            const Icon = menu.icon;
            
            return (
              <li
                key={index}
                className="group flex items-center gap-4 p-3 hover:bg-blue-700 rounded-xl transition duration-200 cursor-pointer"
              >
                <Icon className="w-6 h-6" />
                <span
                  className={`text-base font-semibold tracking-wide transition-all duration-300 ${
                    !isOpen && 'hidden'
                  }`}
                >
                  {menu.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-3xl font-extrabold text-blue-900">Welcome, Admin</h2>
        <p className="text-lg text-gray-700 mt-2 font-medium">This is your stylish dashboard with bold fonts.</p>
        
      </div>
    </div>
  );
}
