import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Patients from '../pages/Patients'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/Appointments " element={<Appointments />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/doctors" element={<Doctors />} />
    </Routes>
  );
}