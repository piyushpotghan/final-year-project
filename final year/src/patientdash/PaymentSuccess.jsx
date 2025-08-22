import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state?.type || "online"; // online / offline

  useEffect(() => {
    if (type === "online") {
      const confirmAppointment = async () => {
        const appointmentData = JSON.parse(localStorage.getItem("pendingAppointment"));
        if (appointmentData) {
          try {
            await axios.post(
              "http://localhost:5000/api/payment/confirm-online-appointment",
              appointmentData
            );
            localStorage.removeItem("pendingAppointment");
            setTimeout(() => navigate("/my-appointments"), 2000);
          } catch (error) {
            console.error(error);
            alert("❌ Error saving appointment after payment");
          }
        }
      };
      confirmAppointment();
    }
  }, [navigate, type]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          {type === "online" ? "🎉 Payment Successful!" : "✅ Appointment Booked Successfully!"}
        </h2>
        <p className="text-gray-600 mb-4">
          {type === "online"
            ? "Your appointment has been confirmed after payment."
            : "Your appointment has been confirmed with Offline Payment."}
        </p>

        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto mb-4"></div>

        <button
          onClick={() => navigate("/my-appointments")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Go to My Appointments
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;