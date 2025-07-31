import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../patientdash/Sidebar';
import SearchBar from '../patientdash/SearchBar';
import CategoryFilter from '../patientdash/CategoryFilter';
import DoctorList from '../patientdash/DoctorList';
import DoctorDetail from '../patientdash/DoctorDetail';
import MyAppointments from '../patientdash/MyAppointments';
import { DoctorContext } from '../data/DoctorContext'; // 👈 import context

export default function PatientDashboard() {
  const { doctors } = useContext(DoctorContext); // 👈 get doctors from context
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      setSelectedDoctor(doctors[0]); // set initial doctor when context loads
    }
  }, [doctors]);

  const filteredDoctors =
    category === "All"
      ? doctors || [] // fallback to empty array
      : (doctors || []).filter((doc) => doc.category === category);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/Login";
  };

  const handleBookAppointment = (doctor) => {
    navigate('/book-appointment', { state: { doctor } });
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-h-screen pl-20">
        <div className="p-6 pt-20">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-700">
              {location.pathname === "/my-appointments"
                ? "My Appointments"
                : "Book Appointment"}
            </h1>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>

          {location.pathname === "/my-appointments" ? (
            <MyAppointments />
          ) : (
            <>
              <SearchBar />
              <CategoryFilter category={category} setCategory={setCategory} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                <DoctorList
                  doctors={filteredDoctors}
                  onSelectDoctor={setSelectedDoctor}
                  selectedDoctor={selectedDoctor}
                />
                <div className="lg:col-span-2">
                  {selectedDoctor && (
                    <DoctorDetail
                      doctor={selectedDoctor}
                      onBook={() => handleBookAppointment(selectedDoctor)}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}