import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

export default function AmbulanceHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/ambulance")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-900 text-white min-h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          📋 My Ambulance Bookings
        </h2>

        {bookings.length === 0 ? (
          <p className="text-gray-600">No ambulance bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Pickup</th>
                  <th className="border p-2">Hospital</th>
                  <th className="border p-2">Address</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="text-center">
                    <td className="border p-2">{b.name}</td>
                    <td className="border p-2">{b.phone}</td>
                    <td className="border p-2">{b.pickup}</td>
                    <td className="border p-2">{b.hospital}</td>
                    <td className="border p-2">{b.address}</td>
                    <td className="border p-2">
                      {new Date(b.createdAt).toLocaleString()}
                    </td>
                    <td className="border p-2 font-semibold">{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}