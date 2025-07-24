import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Appointments from '../pages/Appointments';
import Patients from '../pages/Patients';
import Doctors from '../pages/Doctors';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/doctors" element={<Doctors />} />
    </Routes>
  );
}