import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AmbulanceSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const bookingId = new URLSearchParams(window.location.search).get("bookingId");
    if (bookingId) {
      axios.put(`http://localhost:5000/api/ambulance/${bookingId}/payment`)
        .then(() => {
          alert("✅ Payment successful! Ambulance booked.");
          navigate("/ambulance-history");
        })
        .catch((err) => console.error(err));
    }
  }, [navigate]);

  return <h2 className="text-center mt-20 text-green-600">Processing Payment...</h2>;
}