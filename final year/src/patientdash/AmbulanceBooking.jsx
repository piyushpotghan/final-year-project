import React, { useMemo, useState } from "react";
import PatientLayout from "./PatientLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AmbulanceBooking() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pickup: "",
    hospital: "",
    paymentMethod: "offline",
    ambulanceType: "Basic", // UI-only field (not stored server-side)
    schedule: "now", // now | later
    datetime: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidPhone = useMemo(() => /^\+?[0-9]{7,15}$/.test(formData.phone), [formData.phone]);
  const isLaterInvalid = formData.schedule === "later" && !formData.datetime;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isValidPhone) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (isLaterInvalid) {
      setError("Please select a date and time for scheduled pickup.");
      return;
    }
    setSubmitting(true);
    try {
      // Only send fields the backend expects to avoid strict schema drops
      const payload = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        pickup: formData.pickup,
        hospital: formData.hospital,
        paymentMethod: formData.paymentMethod,
      };

      const res = await axios.post("http://localhost:5000/api/ambulance", payload);
      const booking = res.data.booking;

      if (formData.paymentMethod === "online") {
        const stripeRes = await axios.post(
          "http://localhost:5000/api/payment/create-ambulance-session",
          {
            bookingId: booking._id,
            amount: 500, // fixed ambulance charge
          }
        );
        window.location.href = stripeRes.data.url; // redirect to Stripe
      } else {
        alert("🚑 Ambulance booked with Offline Payment (Unpaid)!");
        navigate("/ambulance-history");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const estimatedFare = 500; // could be dynamic in future

  return (
    <PatientLayout title="Ambulance Booking" withNavbar showTopbar={false}>
        {/* Page Heading */}
        <div className="w-full text-center mb-6">
          <h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-blue-700 drop-shadow-sm"
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
          >
            My Ambulance Page
          </h1>
          <div className="mt-2 h-1 w-24 mx-auto rounded-full bg-blue-600/80"></div>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Form */}
          <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 w-full lg:col-span-12 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-red-600">Book an Ambulance</h2>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 shadow-sm ring-1 ring-emerald-300/50">Fast</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-sky-100 to-sky-200 text-sky-800 shadow-sm ring-1 ring-sky-300/50">Safe</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 shadow-sm ring-1 ring-amber-300/50">24×7</span>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            Enter your details and we’ll dispatch the nearest available ambulance.
          </p>

          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                    isValidPhone ? "focus:ring-red-200" : "border-red-300 focus:ring-red-300"
                  }`}
                  required
                />
                {!isValidPhone && formData.phone && (
                  <p className="mt-1 text-xs text-red-600">Invalid phone number</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Address</label>
              <input
                type="text"
                name="address"
                placeholder="House no., street, landmark"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                <input
                  type="text"
                  name="pickup"
                  placeholder="Current location or address"
                  value={formData.pickup}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hospital/Clinic</label>
                <input
                  type="text"
                  name="hospital"
                  placeholder="Destination hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ambulance Type</label>
                <select
                  name="ambulanceType"
                  value={formData.ambulanceType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
                >
                  <option>Basic</option>
                  <option>ICU</option>
                  <option>Neonatal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="schedule"
                      value="now"
                      checked={formData.schedule === "now"}
                      onChange={handleChange}
                    />
                    <span className="text-sm">Now</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="schedule"
                      value="later"
                      checked={formData.schedule === "later"}
                      onChange={handleChange}
                    />
                    <span className="text-sm">Later</span>
                  </label>
                </div>
              </div>
            </div>

            {formData.schedule === "later" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date & Time</label>
                <input
                  type="datetime-local"
                  name="datetime"
                  value={formData.datetime}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
              <textarea
                name="notes"
                placeholder="Any additional instructions for the driver or medical staff"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                <option value="offline">Offline (Cash)</option>
                <option value="online">Online (Stripe)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full bg-red-600 text-white py-2 rounded-lg transition hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {submitting ? "Processing..." : "Confirm Ambulance Booking"}
            </button>
          </form>
          </div>

        {/* Recent Bookings Table removed per request */}
        </div>
    </PatientLayout>
  );
}