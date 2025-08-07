import React from 'react';
import { LogOut } from 'lucide-react';

const Topbar = () => {
  return (
    <div className="bg-white shadow-lg rounded-b-xl px-8 py-4 flex justify-between items-center border-b border-gray-100">
      {/* Left side: Branding */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-extrabold text-blue-600"> Admin</h1>
        <span className="text-sm text-gray-500 tracking-wide">Welcome back, Admin!</span>
      </div>

      {/* Right side: Profile + Logout */}
      <div className="flex items-center gap-4">
        {/* Profile Initials Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shadow-inner">
          AD
        </div>

      </div>
    </div>
  );
};

export default Topbar;
