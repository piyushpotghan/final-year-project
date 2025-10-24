import React from "react";
import Sidebar from "./Sidebar";
import PatientTopbar from "./PatientTopbar";

export default function PatientLayout({ title = "", withNavbar = false, showTopbar = true, children }) {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      {/* If the global Navbar is visible (fixed at top), add top padding so content doesn't go under it */}
      <div className={`ml-20 p-6 md:p-8 lg:p-10 ${withNavbar ? "pt-28 md:pt-24" : ""}`}>
        {showTopbar && <PatientTopbar title={title} />}
        <div>{children}</div>
      </div>
    </div>
  );
}
