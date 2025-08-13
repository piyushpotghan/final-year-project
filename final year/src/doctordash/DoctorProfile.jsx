import React, { useContext } from "react";
import { DoctorContext } from "../data/DoctorContext";

const DoctorProfile = () => {
  const { loggedInDoctorEmail, doctors } = useContext(DoctorContext);

  // Logged in doctor (backend fetched doctors list )
  const doctor = doctors.find(d => d.email === loggedInDoctorEmail);

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">
          Doctor details not found. Please log in.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition duration-300">
        <div className="bg-blue-600 py-5 px-6">
          <h2 className="text-3xl font-bold text-white text-center">
            {doctor.name}
          </h2>
          <p className="text-blue-100 text-center text-sm mt-1">
            {doctor.specialty || doctor.speciality}
          </p>
        </div>

        <div className="p-6 space-y-4 text-gray-700 text-base">
          <div className="flex justify-between">
            <span className="font-medium">Experience:</span>
            <span>{doctor.experience && typeof doctor.experience === 'string' ? doctor.experience : `${doctor.experience} years`}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span className="text-blue-600">{doctor.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Phone:</span>
            <span>{doctor.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;