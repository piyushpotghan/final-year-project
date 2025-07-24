import React from 'react';
import { NavLink } from 'react-router-dom';


const Sidebar = () => (
  <div className="w-64 bg-white shadow-md text-2xl font-bold" >
    <div className="p-6 text-3xl font-bold text-blue-600 ">MediCare</div>
    <nav className="flex flex-col gap-4 px-4 text-gray-700">
      <NavLink to="#" className="hover:text-blue-600 flex gap-2 items-center">
          Dashboard
      </NavLink>
      <NavLink to="/appointments" className="hover:text-blue-600 flex gap-2 items-center pt-2.5">
         Appointments
      </NavLink>
      <NavLink to="/Doctors" className="hover:text-blue-600 flex gap-2 items-center pt-2.5">
         Doctors
      </NavLink>
      <NavLink to="/patients" className="hover:text-blue-600 flex gap-2 items-center pt-2.5">
        Patients
      </NavLink>
    </nav>
  </div>
);

export default Sidebar;