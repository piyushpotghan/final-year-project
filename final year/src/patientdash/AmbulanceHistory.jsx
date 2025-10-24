import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import PatientLayout from "./PatientLayout";

export default function AmbulanceHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/ambulance");
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load ambulance bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
    <PatientLayout title="My Ambulance Bookings" withNavbar showTopbar={false}>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xl font-semibold text-gray-800 mb-6">
            My ambulance Page
          </p>

          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-700 text-center">
              {error}
            </div>
          )}

          <div className="w-full flex justify-center">
            <div className="overflow-x-auto shadow-lg rounded-lg inline-block">
              <table className="table-auto bg-white border">
              <thead className="bg-blue-600 text-white uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left font-bold">Name</th>
                  <th className="py-3 px-6 text-left font-bold">Phone</th>
                  <th className="py-3 px-6 text-left font-bold">Pickup</th>
                  <th className="py-3 px-6 text-left font-bold">Hospital</th>
                  <th className="py-3 px-6 text-left font-bold">Address</th>
                  <th className="py-3 px-6 text-left font-bold">Date</th>
                  <th className="py-3 px-6 text-left font-bold">Time</th>
                  <th className="py-3 px-6 text-left font-bold">Status</th>
                  <th className="py-3 px-6 text-left font-bold">Payment</th>
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
                      <td className="py-4 px-6">{b.address}</td>
                      <td className="py-4 px-6">{new Date(b.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 px-6">{new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                      <td className="py-4 px-6">
                        <span className={statusBadge(b.status)}>{b.status}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={paymentBadge(b.paymentStatus)}>{b.paymentStatus}</span>
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
    </PatientLayout>
  );
}