import React, { useState } from "react";
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
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Save booking first
      const res = await axios.post("http://localhost:5000/api/ambulance", formData);
      const booking = res.data.booking;

      if (formData.paymentMethod === "online") {
        // 2️⃣ Call Stripe session
        const stripeRes = await axios.post("http://localhost:5000/api/payment/create-ambulance-session", {
          bookingId: booking._id,
          amount: 500, // fixed ambulance charge
        });
        window.location.href = stripeRes.data.url; // redirect to stripe
      } else {
        alert("🚑 Ambulance booked with Offline Payment (Unpaid)!");
        navigate("/ambulance-history");
      }
    } catch (error) {
      console.error(error);
      alert("Error booking ambulance!");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          🚑 Book Ambulance
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name"
            value={formData.name} onChange={handleChange}
            className="w-full p-2 border rounded" required />
          <input type="tel" name="phone" placeholder="Phone Number"
            value={formData.phone} onChange={handleChange}
            className="w-full p-2 border rounded" required />
          <input type="text" name="address" placeholder="Your Address"
            value={formData.address} onChange={handleChange}
            className="w-full p-2 border rounded" required />
          <input type="text" name="pickup" placeholder="Pickup Location"
            value={formData.pickup} onChange={handleChange}
            className="w-full p-2 border rounded" required />
          <input type="text" name="hospital" placeholder="Hospital/Clinic Name"
            value={formData.hospital} onChange={handleChange}
            className="w-full p-2 border rounded" required />

          {/* Payment Method */}
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="offline">Offline (Cash)</option>
            <option value="online">Online (Stripe)</option>
          </select>

          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-lg">
            Confirm Ambulance Booking
          </button>
        </form>
      </div>
    </div>
  );
}