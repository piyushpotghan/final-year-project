import React from 'react';

export default function AdminDashboard() {
<<<<<<< HEAD
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
=======
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-blue-700">Admin Dashboard</h1>
      <p className="mt-4 text-lg">Welcome, Admin!</p>
>>>>>>> c3c3a6b962cf7f264a786121c5d06f8c65dfaba6
    </div>
  );
}
