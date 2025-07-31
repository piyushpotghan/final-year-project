import React, { useContext } from "react";
import { DoctorContext } from "../data/DoctorContext";
import doctorsData from "../data/doctorsData";

const DoctorProfile = () => {
  const { loggedInDoctorEmail } = useContext(DoctorContext);

  const doctor = doctorsData.find(d => d.email === loggedInDoctorEmail);

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">Doctor details not found. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{doctor.name}</h2>
      <div className="space-y-2 text-gray-700">
        <p><span className="font-semibold">Speciality:</span> {doctor.speciality}</p>
        <p><span className="font-semibold">Experience:</span> {doctor.experience}</p>
        <p><span className="font-semibold">Email:</span> {doctor.email}</p>
        <p><span className="font-semibold">Phone:</span> {doctor.phone}</p>
      </div>
    </div>
  );
};

export default DoctorProfile;