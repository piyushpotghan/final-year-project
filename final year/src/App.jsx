import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HealthConcern from './Pages/healthConcerns';
import WhyUs from './Pages/whyUs';
import UserTestimonials from './Pages/testimonials';
import Map from './Pages/Map';
import TrustedBy from './Pages/TrustedBy';
import AdminDashboard from './Pages/AdminDashboard';
import PatientDashboard from './Pages/PatientDashboard';
import DoctorDashboard from './Pages/DoctorDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import BookAppointment from './patientdash/BookAppoinment';

const LayoutWrapper = () => {
  const location = useLocation();

  const hideNavbarFooterRoutes = [
    "/admin/dashboard",
    "/doctor/dashboard",
    "/patient/dashboard",
    '/Login',
    '/SignUp',
  ];

  const shouldHideLayout = hideNavbarFooterRoutes.some(path =>
  location.pathname.toLowerCase().startsWith(path.toLowerCase())
  );

  return (
    <>
      {/* Show Navbar only if not in dashboard */}
      {!shouldHideLayout && <Navbar />}

      <Routes>
        <Route
          path='/'
          element={
            <>
              <Hero />
              <HealthConcern />
              <div id="whyus">
                <TrustedBy />
                <WhyUs />
              </div>
              <Map />
              <UserTestimonials />
            </>
          }
        />
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />

        <Route path="/admin/dashboard" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/doctor/dashboard" element={
          <ProtectedRoute role="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        } />
        <Route path="/patient/dashboard" element={
          <ProtectedRoute role="patient">
            <PatientDashboard />
          </ProtectedRoute>
        } />
        <Route path="/book-appointment" element={<BookAppointment />} />
      </Routes>

      {/* Show Footer only if not in dashboard */}
      {!shouldHideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <LayoutWrapper />
    </BrowserRouter>
  );
};

export default App;
