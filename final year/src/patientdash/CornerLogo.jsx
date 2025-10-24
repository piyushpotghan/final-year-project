import React from "react";
import { useNavigate } from "react-router-dom";

export default function CornerLogo({ topClass = "top-20" }) {
  const navigate = useNavigate();
  return (
    <div className={`fixed ${topClass} left-4 z-40`}>
      <div
        className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center font-bold text-white text-xl cursor-pointer shadow"
        title="Home"
        onClick={() => navigate("/patient/dashboard")}
      >
        H
      </div>
    </div>
  );
}
