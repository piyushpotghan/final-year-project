import React from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero"; // adjust path if Hero is elsewhere

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // check login

  return (
    <div>
      <Hero />

      {user && (
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}