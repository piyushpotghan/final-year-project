import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import WhyUs from './whyUs'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './components/Login'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      
      <BrowserRouter>
       <Navbar/>
        <Routes>
          <Route path='/' element={<Hero/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/Contact' element={<Contact/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
