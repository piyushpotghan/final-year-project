// src/data/DoctorContext.js
import React, { createContext, useState } from "react";
import doctorsData from "./doctorsdata"; // Import your static data

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [loggedInDoctorEmail, setLoggedInDoctorEmail] = useState(null);
  const [doctors, setDoctors] = useState(doctorsData);

  // ✅ Add Doctor function
  const addDoctor = (newDoctor) => {
    setDoctors((prevDoctors) => [...prevDoctors, newDoctor]);
    console.log("Doctor added:", newDoctor);
  };

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        setDoctors,
        addDoctor, // ✅ EXPOSE this
        loggedInDoctorEmail,
        setLoggedInDoctorEmail
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};
