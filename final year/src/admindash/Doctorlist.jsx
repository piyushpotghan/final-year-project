// import React, { useState, useContext } from 'react';
// import Sidebar from './Sidebar';
// import { DoctorContext } from '../data/DoctorContext';
// import SearchBar from '../patientdash/SearchBar';

// const DoctorsList = () => {
//   const { doctors } = useContext(DoctorContext);
//   const [query, setQuery] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Filter doctors by name or specialty
//   const filteredDoctors = doctors.filter((doc) =>
//     doc.name.toLowerCase().includes(query.toLowerCase()) ||
//     doc.specialty.toLowerCase().includes(query.toLowerCase())
//   );

//   const doctor = filteredDoctors[currentIndex];

//   const handleNext = () => {
//     if (currentIndex < filteredDoctors.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />

//       <div className="flex-1 p-6">
//         <SearchBar query={query} setQuery={setQuery} />

//         {filteredDoctors.length === 0 ? (
//           <p className="text-center text-red-500 font-medium mt-10">
//             No matching doctors found.
//           </p>
//         ) : (
//           <>
//             <h2 className="text-2xl font-bold mb-4 text-center">
//               Doctor {currentIndex + 1} of {filteredDoctors.length}
//             </h2>

//             <div className="w-full max-w-2xl mx-auto border rounded-xl shadow-md p-6 bg-white">
//               <h3 className="text-xl font-semibold text-blue-700">{doctor.name}</h3>
//               <p className="text-gray-600 mb-1"><strong>Specialty:</strong> {doctor.specialty}</p>
//               <p className="mb-1"><strong>Experience:</strong> {doctor.experience} years</p>
//               <p className="mb-1"><strong>Fee:</strong> {doctor.fee}</p>
//               <p className="mb-1"><strong>Rating:</strong> ⭐ {doctor.rating}</p>
//               <p className="mb-1"><strong>Category:</strong> {doctor.category}</p>

//               <div className="mt-3">
//                 <p className="font-medium">Available At:</p>
//                 <ul className="list-disc list-inside text-gray-700">
//                   {doctor.available?.map((place, index) => (
//                     <li key={index}>{place}</li>
//                   ))}
//                 </ul>
//               </div>

//               <p className="mt-3"><strong>Availability:</strong> {doctor.availability}</p>
//               <p className="mt-1"><strong>Education:</strong> {doctor.education}</p>
//               <p className="mt-1"><strong>Certificate:</strong> {doctor.certificate}</p>

//               <div className="mt-4">
//                 <p className="font-medium">Top Reviews:</p>
//                 <ul className="text-gray-700 space-y-1">
//                   {doctor.reviews?.slice(0, 2).map((review, idx) => (
//                     <li key={idx} className="border-l-4 border-blue-400 pl-2">
//                       <strong>{review.name}</strong>: ⭐{review.rating} — <em>{review.comment}</em>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             <div className="flex gap-4 mt-6 justify-center">
//               <button
//                 onClick={handlePrev}
//                 disabled={currentIndex === 0}
//                 className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
//               >
//                 Previous
//               </button>

//               <button
//                 onClick={handleNext}
//                 disabled={currentIndex === filteredDoctors.length - 1}
//                 className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorsList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import SearchBar from '../patientdash/SearchBar';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [query, setQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Fetch doctors on mount
  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5000/api/doctors");
  //       setDoctors(res.data);
  //     } catch (err) {
  //       console.error("Failed to load doctors", err);
  //     }
  //   };

  //   fetchDoctors();
  // }, []);
  useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Failed to load doctors", err);
    }
  };

  fetchDoctors();
}, []);


  // ✅ Filter search
  const filteredDoctors = doctors.filter((doc) =>
    doc.name?.toLowerCase().includes(query.toLowerCase()) ||
    doc.specialty?.toLowerCase().includes(query.toLowerCase())
  );

  const doctor = filteredDoctors[currentIndex];

  const handleNext = () => {
    if (currentIndex < filteredDoctors.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <SearchBar query={query} setQuery={setQuery} />

        {filteredDoctors.length === 0 ? (
          <p className="text-center text-red-500 font-medium mt-10">
            No matching doctors found.
          </p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Doctor {currentIndex + 1} of {filteredDoctors.length}
            </h2>

            <div className="w-full max-w-2xl mx-auto border rounded-xl shadow-md p-6 bg-white">
              <h3 className="text-xl font-semibold text-blue-700">{doctor.name}</h3>
              <p className="text-gray-600 mb-1"><strong>Specialty:</strong> {doctor.specialty}</p>
              <p className="mb-1"><strong>Experience:</strong> {doctor.experience} years</p>
              <p className="mb-1"><strong>Fee:</strong> ₹{doctor.fee}</p>
              <p className="mb-1"><strong>Rating:</strong> ⭐ {doctor.rating}</p>
              <p className="mb-1"><strong>Category:</strong> {doctor.category}</p>

              <div className="mt-3">
                <p className="font-medium">Available At:</p>
                <ul className="list-disc list-inside text-gray-700">
                  {doctor.available?.map((place, index) => (
                    <li key={index}>{place}</li>
                  ))}
                </ul>
              </div>

              <p className="mt-3"><strong>Availability:</strong> {doctor.availability}</p>
              <p className="mt-1"><strong>Education:</strong> {doctor.education}</p>
              <p className="mt-1"><strong>Certificate:</strong> {doctor.certificate}</p>

              <div className="mt-4">
                <p className="font-medium">Top Reviews:</p>
                <ul className="text-gray-700 space-y-1">
                  {doctor.reviews?.slice(0, 2).map((review, idx) => (
                    <li key={idx} className="border-l-4 border-blue-400 pl-2">
                      <strong>{review.name}</strong>: ⭐{review.rating} — <em>{review.comment}</em>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* ✅ Verify Button Here */}
            {!doctor.isVerified && (
              <button
                onClick={async () => {
                  try {
                    await axios.patch(`http://localhost:5000/api/admin/verify-doctor/${doctor.id}`);
                    alert("Doctor verified!");
                    // Refetch updated doctor list
                    const res = await axios.get("http://localhost:5000/api/admin/doctors");
                    setDoctors(res.data);
                  } catch (err) {
                    console.error("Failed to verify doctor", err);
                    alert("Error verifying doctor");
                  }
                }}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                ✅ Verify Doctor
              </button>
            )}


            <div className="flex gap-4 mt-6 justify-center">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredDoctors.length - 1}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
