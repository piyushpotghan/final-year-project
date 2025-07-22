import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/Login');
    }
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-500">Only visible to admin</p>
    </div>
  );
}