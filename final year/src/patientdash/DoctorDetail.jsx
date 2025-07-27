import React from "react";
import { useNavigate } from "react-router-dom"; //

const DoctorDetail = ({ doctor }) => {
  const navigate = useNavigate();

  if (!doctor)
    return <p className="text-center text-gray-500">No doctor selected.</p>;

  const handleBookAppointment = () => {
    navigate("/book-appointment", { state: { doctor } }); //
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">{doctor.name}</h2>
      <p className="text-sm text-gray-700">
        {doctor.specialty} • {doctor.experience} years
      </p>
      <p className="mt-2 text-sm">Education: {doctor.education}</p>
      <p className="text-sm">Certificate: {doctor.certificate}</p>
      <p className="text-sm">Available: {doctor.availability}</p>

      {/*  Book Appointment Button */}
      <div className="mt-4">
        <button
          onClick={handleBookAppointment}
          className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition duration-200"
        >
          Book an Appointment
        </button>
      </div>

      {/*  Doctor Reviews Section */}
      {doctor.reviews && doctor.reviews.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Doctor's Reviews</h3>
          {doctor.reviews.map((review, index) => (
            <div key={index} className="border p-3 rounded-md mb-3 bg-gray-50">
              <p className="font-bold">{review.name}</p>
              <p className="text-yellow-600">⭐ {review.rating}</p>
              <p className="text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorDetail;