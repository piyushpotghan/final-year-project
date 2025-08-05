import React, { createContext, useState } from "react";
import doctorsData from "./doctorsdata";// 👈 Import your static data here

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [loggedInDoctorEmail, setLoggedInDoctorEmail] = useState(null);
  const [doctors, setDoctors] = useState(doctorsData); // ✅ Add this

  return (
    <DoctorContext.Provider
      value={{
        doctors,              // 👈 expose list of doctors
        setDoctors,
        loggedInDoctorEmail,  // 👈 expose login email
        setLoggedInDoctorEmail
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};