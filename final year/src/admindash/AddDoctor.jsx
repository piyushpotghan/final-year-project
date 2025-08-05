import React, { useState, useContext } from "react";
import Sidebar from "./Sidebar";
import { DoctorContext } from "../data/DoctorContext";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const { addDoctor } = useContext(DoctorContext);
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: "",
    specialty: "",
    experience: "",
    fee: "",
    rating: "",
    category: "",
    available: "",
    availability: "",
    education: "",
    certificate: ""
  });

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDoctor = {
      ...doctor,
      id: Date.now(),
      available: doctor.available.split(",").map(p => p.trim()),
      reviews: []
    };

    addDoctor(newDoctor);
    alert("Doctor added successfully!");
    navigate("/admin/dashboard/doctors-list");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Add New Doctor</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: "Name", name: "name" },
              { label: "Specialty", name: "specialty" },
              { label: "Experience (years)", name: "experience" },
              { label: "Fee (e.g. ₹800)", name: "fee" },
              { label: "Rating (e.g. 4.5)", name: "rating" },
              { label: "Category", name: "category" },
              { label: "Available At (comma-separated)", name: "available" },
              { label: "Availability (e.g. Mon-Fri)", name: "availability" },
              { label: "Education", name: "education" },
              { label: "Certificate", name: "certificate" }
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={doctor[name]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add Doctor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
