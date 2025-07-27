import React from "react";

const categories = [
  "All",
  "Psychology",
  "Pediatrician",
  "Traumatology",
  "Opthalmology",
  "Dermatologist",
  "Cardiologist",
  "Orthopedics",
  "General Physician",
  "Neurologist",
  
];

const CategoryFilter = ({ category, setCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-1 border rounded-full ${
            category === cat ? "bg-cyan-500 text-white" : "bg-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;