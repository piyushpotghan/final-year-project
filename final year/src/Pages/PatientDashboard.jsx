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
    fee: "₹800 -₹1000",
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
    fee: "₹800 -₹1000",
    available: ["Heart Care Center, NY", "Online Video Call"],
    rating: 4.7,
    category: "Cardiologist",
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
    fee: "₹800 -₹1000",
    available: ["Neuro Clinic, Texas", "Online Zoom Sessions"],
    rating: 4.6,
    category: "Neurologist",
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
    fee: "₹800 -₹1000 ",
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
    fee: "₹800 -₹1000 ",
    available: ["Children's Hospital, Bengaluru", "Online Pediatric Care"],
    rating: 4.9,
    category: "Pediatrician",
    reviews: [
      { name: "Ritika Jain", rating: 5.0, comment: "Great with kids!" },
      { name: "Manish Agarwal", rating: 4.8, comment: "Very compassionate and skilled." }
    ],
    education: "MD Pediatrics, NIMHANS",
    certificate: "Member of Indian Academy of Pediatrics (IAP)",
    availability: "Monday - Friday, 09:00 - 12:00 & 15:00 - 18:00"
  },
  {
    id: 6,
    name: "Dr.Subhash Musale",
    specialty: "General Physician",
    experience: 5,
    fee: "₹800 -₹1000 ",
    available: ["Online Consultation", "Office at Doctor Hospitals, California"],
     rating: 4.9,
     category: "General Physician",
     education: "PhD in Clinical Psychology, UCLA",
    certificate: "Certified CBT Therapist, APA",
    availability: "Monday - Saturday, 10:00 - 12:00 & 14:00 - 20:00",
  },

   {
    id: 7,
    name: "Dr.Vishal Naik",
    specialty: "Paediatrician",
    experience: 8 ,
    fee: " ₹800 -₹1000 ",
    available: ["Online Consultation", "Office at Doctor Hospitals, India , Pune "],
    rating: 4.9,
    category: "Paediatrician",
    reviews: [
      { name: "Pravin patil", rating: 4.9, comment: "Highly recommended!" },
      { name: "Prashant kale ", rating: 5.0, comment: "Truly transformative help." },
      { name: "Sofia Arena", rating: 4.8, comment: "Empowering therapy." },
    ],
    education: "MD in Pediatrics  , ",
    certificate: "Certified Pediatrics  ",
    availability: "Monday - Saturday, 10:00 - 12:00 & 14:00 - 20:00",
  },

  {
    id: 8,
    name: "Dr.Nishita Das",
    specialty: "Traumatology",
    experience: 8 ,
    fee: " ₹800 -₹1000 ",
    available: ["Online Consultation", "Office at Doctor Hospitals, India , Pune "],
    rating: 4.9,
    category: "Traumatology",
    reviews: [
      { name: "kali Prasad", rating: 4.9, comment: "Highly recommended!" },
      { name: "sanjay Kumar ", rating: 5.0, comment: "Truly transformative help." },
      { name: "Raj ", rating: 4.8, comment: "Empowering therapy." },
    ],
    education: "MD in Traumatology , AIIMS New Delhi ",
    certificate: "Certified Traumatology  ",
    availability: "Monday - Saturday, 10:00 - 12:00 & 14:00 - 20:00",
  },
  {
    id: 9,
    name: "Dr.Vikas Chavan",
    specialty: "Radiologist",
    experience: 15 ,
    fee: " ₹1200 -₹2000 ",
    available: ["Online Consultation", "Office at Doctor Hospitals, India , Pune "],
    rating: 5,
    category: "Radiologist",
    reviews: [
      { name: "Satyendra Kumar", rating: 4.9, comment: "Highly recommended!" },
      { name: "jai narain ", rating: 5.0, comment: "Truly transformative help." },
      { name: "nalini", rating: 4.8, comment: "Empowering therapy." },
    ],
    education: "MD in Radiology , AIIMS New Delhi ",
    certificate: "Certified Radiologist  ",
    availability: "Monday - Saturday, 10:00 - 12:00 & 14:00 - 20:00",
  },

  {
    id: 10,
    name: "Dr.Sanjeev M N",
    specialty: "Dermatologist",
    experience: 15 ,
    fee: " ₹1200 -₹1500 ",
    available: ["Online Consultation", "Office at Doctor Hospitals, India , Pune "],
    rating: 5,
    category: "Dermatologist",
    reviews: [
      { name: "Satyendra lal", rating: 4.9, comment: "Highly recommended!" },
      { name: "jai kumar ", rating: 5.0, comment: "Truly transformative help." },
      { name: "Anant Kumar", rating: 4.8, comment: "Empowering therapy." },
    ],
    education: "MD in Dermatology , AIIMS New Delhi ",
    certificate: "Certified Dermatologist  ",
    availability: "Monday - Saturday, 10:00 - 12:00 & 14:00 - 20:00",
  },

   {
    id: 11,
    name: "Dr.Shruti Devkar",
    specialty: "Cardiologist",
    experience: 15 ,
    fee: " ₹1200 -₹1500 ",
    available: ["Online Consultation", "Office at Doctor Hospitals, India , Pune "],
    rating: 5,
    category: "Cardiologist",
    reviews: [
      { name: "Satyendra lal", rating: 4.9, comment: "Highly recommended!" },
      { name: "jai kumar ", rating: 5.0, comment: "Truly transformative help." },
      { name: "Anant Kumar", rating: 4.8, comment: "Empowering therapy." },
    ],
    education: "MD in Cardiologist , AIIMS New Delhi ",
    certificate: "Certified Cardiologist  ",
    availability: "Monday - Saturday, 10:00 - 12:00 & 14:00 - 20:00",
  },

  {
    id: 12,
    name: "Dr.Aditya Kale",
    specialty: "Neurologist",
    experience: 26 ,
    fee: " ₹2000 -₹3000 ",
    available: ["Online Consultation", "Office at Doctor Hospitals, India , Pune "],
    rating: 5,
    category: "Neurologist",
    reviews: [
      { name: "Satyendra lal", rating: 4.9, comment: "Highly recommended!" },
      { name: "jai kumar ", rating: 5.0, comment: "Truly transformative help." },
      { name: "Anant Kumar", rating: 4.8, comment: "Empowering therapy." },
    ],
    education: "MD in Neurology , Harvard Medical School",
    certificate: "Certified Neurologist  ",
    availability: "Monday - Saturday, 10:00 - 12:00 & 14:00 - 20:00",
  },
  {
    id: 13,
    name: "Dr.Prashanth Nagraj",
    specialty: "Anesthesiologist",
    experience: 20 ,
    fee: " ₹1000 -₹1500 ",
    available: ["Online Consultation", "Office at Doctor Hospitals, India , Pune "],
    rating: 5,
    category: "Anesthesiologist",
    reviews: [
      { name: "Satyendra lal", rating: 4.9, comment: "Highly recommended!" },
      { name: "jai kumar ", rating: 5.0, comment: "Truly transformative help." },
      { name: "Anant Kumar", rating: 4.8, comment: "Empowering therapy." },
    ],
    education: "MD in Anesthesiologist , AIIMS New Delhi ",
    certificate: "Certified Anesthesiologist  ",
    availability: "Monday - Saturday, 10:00 - 12:00 & 14:00 - 20:00",
  },
  {
    id: 14,
    name: "Dr.Anant Gaikwad",
    specialty: "Opthalmology",
    experience: 18 ,
    fee: " ₹1000 -₹1500 ",
    available: ["Online Consultation", "Office at Doctor Hospitals, India , Pune "],
    rating: 5,
    category: "Opthalmology",
    reviews: [
      { name: "Satyendra lal", rating: 4.9, comment: "Highly recommended!" },
      { name: "jai kumar ", rating: 5.0, comment: "Truly transformative help." },
      { name: "Anant Kumar", rating: 4.8, comment: "Empowering therapy." },
    ],
    education: "MD in Opthalmology , AIIMS New Delhi ",
    certificate: "Certified Opthalmology  ",
    availability: "Monday - Saturday, 10:00 - 12:00 & 14:00 - 20:00",
  }

    
    

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