import React, { createContext, useState, useEffect } from "react";
import doctorsData from "./doctorsdata"; // Import your static data

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [loggedInDoctorEmail, setLoggedInDoctorEmail] = useState(null);
  const [doctors, setDoctors] = useState(doctorsData);

  // ✅ Auto set doctor email from localStorage on app load
  useEffect(() => {
    const storedDoctor = JSON.parse(localStorage.getItem("doctor"));
    if (storedDoctor?.email) {
      setLoggedInDoctorEmail(storedDoctor.email);
    }
  }, []);

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
        addDoctor,
        loggedInDoctorEmail,
        setLoggedInDoctorEmail
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};