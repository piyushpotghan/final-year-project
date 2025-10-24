import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

export default function AdminAmbulanceDetails() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("http://localhost:5000/api/ambulance");
      const list = Array.isArray(res.data) ? res.data : [];
      setBookings(list);
    } catch (err) {
      console.error("Error fetching:", err);
      setError("Failed to load ambulance bookings.");
    } finally {
      setLoading(false);
    }
  };

  // (Status update select removed from UI per request)

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

  const sorted = useMemo(() => {
    return [...bookings].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [bookings]);

  const statusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-bold";
    if (status === "Approved") return `${base} bg-green-100 text-green-700`;
    if (status === "Pending") return `${base} bg-yellow-100 text-yellow-800`;
    if (status === "Cancelled") return `${base} bg-red-100 text-red-700`;
    if (status === "Completed") return `${base} bg-blue-100 text-blue-700`;
    return `${base} bg-gray-100 text-gray-700`;
  };

  const paymentBadge = (paymentStatus) => {
    const base = "px-3 py-1 rounded-full text-xs font-bold";
    if (paymentStatus === "Paid") return `${base} bg-green-100 text-green-700`;
    if (paymentStatus === "Unpaid") return `${base} bg-red-100 text-red-700`;
    return `${base} bg-gray-100 text-gray-700`;
  };

  

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">🚑 Ambulance Bookings</h2>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full table-auto bg-white border">
            <thead className="bg-blue-600 text-white uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left font-bold">Name</th>
                <th className="py-3 px-6 text-left font-bold">Phone</th>
                <th className="py-3 px-6 text-left font-bold">Pickup</th>
                <th className="py-3 px-6 text-left font-bold">Hospital</th>
                <th className="py-3 px-6 text-left font-bold">Date</th>
                <th className="py-3 px-6 text-left font-bold">Time</th>
                <th className="py-3 px-6 text-left font-bold">Status</th>
                <th className="py-3 px-6 text-left font-bold">Payment</th>
                <th className="py-3 px-6 text-left font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm font-medium divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="9" className="py-6 px-6">
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-gray-100 rounded" />
                      <div className="h-4 bg-gray-100 rounded" />
                      <div className="h-4 bg-gray-100 rounded" />
                    </div>
                  </td>
                </tr>
              ) : sorted.length > 0 ? (
                sorted.map((b) => (
                  <tr key={b._id} className="hover:bg-blue-50 transition duration-150">
                    <td className="py-4 px-6 font-semibold">{b.name}</td>
                    <td className="py-4 px-6">{b.phone}</td>
                    <td className="py-4 px-6">{b.pickup}</td>
                    <td className="py-4 px-6">{b.hospital}</td>
                    <td className="py-4 px-6">{new Date(b.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-6">{new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="py-4 px-6">
                      <span className={statusBadge(b.status)}>{b.status}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={paymentBadge(b.paymentStatus)}>{b.paymentStatus}</span>
                    </td>
                    <td className="py-4 px-6">
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
                  <td colSpan="9" className="text-center py-6 text-gray-500 italic">
                    No ambulance bookings found.
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