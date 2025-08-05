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
      reviews: [] // initially no reviews
    };

    addDoctor(newDoctor);
    alert("Doctor added successfully!");
    navigate("/admin/dashboard/doctors-list");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Doctor</h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
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
              <label className="block font-medium">{label}</label>
              <input
                type="text"
                name={name}
                value={doctor[name]}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;