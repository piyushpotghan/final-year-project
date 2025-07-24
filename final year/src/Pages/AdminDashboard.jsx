import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 
const items = [
  { name: 'Dashboard', icon: '🏠' },
  { name: 'Patients', icon: '👤' },
  { name: 'Appointments', icon: '📅' },
  { name: 'Doctors', icon: '🩺' },
  { name: 'Reports', icon: '📊' },
  { name: 'Settings', icon: '⚙️' },
];
export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/Login');
    }
  }, [navigate]);

  return (
    <div className="p-6 text-center">
      
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-500">Only visible to admin</p>
       <aside className="w-60 bg-white p-4">
      <h2 className="text-xl font-bold mb-6">Medicare</h2>
      <nav>
        {items.map(item => (
          <div key={item.name}
            className="flex items-center p-2 mb-2 rounded hover:bg-gray-200 cursor-pointer">
            <span className="mr-2">{item.icon}</span>
            {item.name}
          </div>
        ))}
      </nav>
    </aside>
    </div>
  );
}


