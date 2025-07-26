import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../patientdash/Sidebar';
import SearchBar from '../patientdash/SearchBar';
import CategoryFilter from '../patientdash/CategoryFilter';
import DoctorList from '../patientdash/DoctorList';
import DoctorDetail from '../patientdash/DoctorDetail';
import Footer from '../components/Footer';

const doctorsData = [
  {
    id: 1,
    name: "Dr. Cris Jhonson",
    specialty: "Psychology Specialist",
    experience: 5,
    fee: "$25 - $385",
    available: ["Online Consultation", "Office at Doctor Hospitals, California"],
    rating: 4.9,
    category: "Psychology",
    reviews: [
      { name: "Walia Tilda", rating: 4.9, comment: "Highly recommended!" },
      { name: "Ethen Park", rating: 5.0, comment: "Truly transformative help." },
      { name: "Sofia Arena", rating: 4.8, comment: "Empowering therapy." },
    ],
    education: "PhD in Clinical Psychology, UCLA",
    certificate: "Certified CBT Therapist, APA",
    availability: "Monday - Saturday, 10:00 - 12:00 & 14:00 - 20:00",
  },
  {
    id: 2,
    name: "Dr. Vikram Sinha",
    specialty: "Cardiologist",
    experience: "15 years",
    fee: "$200 - $350",
    available: ["Heart Care Center, NY", "Online Video Call"],
    rating: 4.7,
    category: "Cardiology",
    reviews: [
      { name: "John Miles", rating: 4.9, comment: "Expert heart care." },
      { name: "Linda Ray", rating: 4.8, comment: "Very professional and caring." }
    ],
    education: "DM Cardiology, AIIMS Delhi",
    certificate: "Fellow of the American College of Cardiology (FACC)",
    availability: "Monday - Friday, 09:00 - 13:00 & 16:00 - 19:00"
  },
  {
    id: 3,
    name: "Dr. Emily Carter",
    specialty: "Neurologist",
    experience: "10 years",
    fee: "$180 - $250",
    available: ["Neuro Clinic, Texas", "Online Zoom Sessions"],
    rating: 4.6,
    category: "Neurology",
    reviews: [
      { name: "Sam Alex", rating: 4.6, comment: "Very detailed explanations." },
      { name: "Tina George", rating: 4.7, comment: "Helped me with migraines." }
    ],
    education: "MD Neurology, Johns Hopkins University",
    certificate: "Board Certified in Neurology",
    availability: "Tuesday - Saturday, 10:00 - 14:00"
  },
  {
    id: 4,
    name: "Dr. Rajesh Khanna",
    specialty: "Orthopedic Surgeon",
    experience: "18 years",
    fee: "$150 - $300",
    available: ["City Hospital, Mumbai", "Video Consultation"],
    rating: 4.8,
    category: "Orthopedics",
    reviews: [
      { name: "Imran Sheikh", rating: 4.9, comment: "Fixed my sports injury quickly." },
      { name: "Anu Sharma", rating: 4.8, comment: "Explains everything well." }
    ],
    education: "MS Orthopedics, KEM Hospital",
    certificate: "Fellowship in Joint Replacement, Germany",
    availability: "Monday - Saturday, 08:00 - 12:00 & 17:00 - 21:00"
  },
  {
    id: 5,
    name: "Dr. Neha Shah",
    specialty: "Pediatrician",
    experience: "9 years",
    fee: "$100 - $180",
    available: ["Children's Hospital, Bengaluru", "Online Pediatric Care"],
    rating: 4.9,
    category: "Pediatrics",
    reviews: [
      { name: "Ritika Jain", rating: 5.0, comment: "Great with kids!" },
      { name: "Manish Agarwal", rating: 4.8, comment: "Very compassionate and skilled." }
    ],
    education: "MD Pediatrics, NIMHANS",
    certificate: "Member of Indian Academy of Pediatrics (IAP)",
    availability: "Monday - Friday, 09:00 - 12:00 & 15:00 - 18:00"
  },
];

export default function PatientDashboard() {
  const [selectedDoctor, setSelectedDoctor] = useState(doctorsData[0]);
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const filteredDoctors =
    category === "All"
      ? doctorsData
      : doctorsData.filter((doc) => doc.category === category);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/Login";
  };

  // Handle navigation to booking page
  const handleBookAppointment = (doctor) => {
    navigate('/book-appointment', { state: { doctor } });
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-h-screen pl-20">
        {/* Top Header + Logout */}
        <div className="p-6 pt-20">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-700">Book Appointment</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>

          <SearchBar />
          <CategoryFilter category={category} setCategory={setCategory} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
            <DoctorList
              doctors={filteredDoctors}
              onSelectDoctor={setSelectedDoctor}
              selectedDoctor={selectedDoctor}
            />

            <div className="lg:col-span-2">
              <DoctorDetail
                doctor={selectedDoctor}
                onBook={() => handleBookAppointment(selectedDoctor)}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}