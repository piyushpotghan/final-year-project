import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './components/Login'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import HealthConcern from './Pages/healthConcerns'
import WhyUs from './Pages/whyUs'
import UserTestimonials from './Pages/testimonials';
import Map from './Pages/Map';
import TrustedBy from './Pages/TrustedBy'
import AdminDashboard from './Pages/AdminDashboard'
import PatientDashboard from './Pages/PatientDashboard'



const App = () => {
  return (
    <div>
      
      <BrowserRouter>
       <Navbar/>
        <Routes>
          
          {/* <Route path='/' element={<Hero/>}/> */}
          <Route
            path='/'
            element={
              <>
                <Hero />
                <HealthConcern/> 
                {/* <TrustedBy/> */}
                <div id="whyus">
                <TrustedBy/>
                   <WhyUs/>
                </div>
                <Map/>

                <UserTestimonials/>

              
              
              </>
            }
          />
          <Route path='/Login' element={<Login/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/Contact' element={<Contact/>}/>

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/patient/dashboard" element={<PatientDashboard />} />
          
        </Routes>
       <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
