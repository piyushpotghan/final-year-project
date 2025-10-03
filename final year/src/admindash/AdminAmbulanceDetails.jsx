import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

export default function AdminAmbulanceDetails() {
  const [bookings, setBookings] = useState([]);

  // ✅ Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ambulance");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  // ✅ Update Status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/ambulance/${id}/status`, {
        status: newStatus,
      });
      setBookings(
        bookings.map((b) =>
          b._id === id ? { ...b, status: newStatus } : b
        )
      );
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  // ✅ Delete Booking
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/ambulance/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-900 text-white min-h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">🚑 Ambulance Bookings</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 shadow-md rounded-lg bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Pickup</th>
                <th className="px-4 py-2 border">Hospital</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((b) => (
                  <tr key={b._id} className="text-center">
                    <td className="px-4 py-2 border">{b.name}</td>
                    <td className="px-4 py-2 border">{b.phone}</td>
                    <td className="px-4 py-2 border">{b.pickup}</td>
                    <td className="px-4 py-2 border">{b.hospital}</td>
                    <td className="px-4 py-2 border">
                      {new Date(b.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border">
                      <select
                        value={b.status}
                        onChange={(e) =>
                          handleStatusChange(b._id, e.target.value)
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleDelete(b._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-6 text-gray-500">
                    No ambulance bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}