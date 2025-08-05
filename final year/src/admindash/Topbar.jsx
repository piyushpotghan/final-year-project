import React from 'react';

const Topbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <h2 className="text-xl font-semibold">Admin</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Logout
      </button>
    </div>
  );
};

export default Topbar;