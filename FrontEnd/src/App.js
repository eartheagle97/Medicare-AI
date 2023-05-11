// import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Patient/Profile';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
import PaCheckSymptoms from './pages/Patient/SymptomsChecker'
import DaCheckSymptoms from './pages/Doctor/SymptomsChecker'
import DoctorDirectory from './pages/Patient/DoctorDirectory'
import InsuranceDetails from './pages/Patient/InsuranceDetails';
import Dashboard from './pages/Doctor/Dashboard'
import MedicalRecord from './pages/Patient/MedicalRecord';
import DoctorProfile from './pages/Doctor/Profile';
import Availability from './pages/Doctor/Availability';
import BookAppointment from './pages/Patient/BookAppointment';
import PAppointments from './pages/Patient/Appointments';
import DAppointments from './pages/Doctor/Appointments';
import UserContextProvider from './pages/Context/Context';
import PatientDetails from './pages/Doctor/PatientDetails';
import PatientMedicalRecords from './pages/Doctor/PatientMedicalRecords';
import AddDieases from './pages/SymptomsChecker/AddDieases'

axios.defaults.baseURL = 'https://medicare-ai-backend.onrender.com';
axios.defaults.withCredentials = true;

function App() {

  return (
    <main>
      <Router>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />

            {/* Doctor Routes - Starts */}
            <Route path="Doctor/Dashboard" element={<Dashboard />} />
            <Route path="Doctor/Profile" element={<DoctorProfile />} />
            <Route path="Doctor/Availability" element={<Availability />} />
            <Route path="Doctor/Appointments" element={<DAppointments />} />
            <Route path="Doctor/:id/PatientDetails/" element={<PatientDetails />} />
            <Route path="Doctor/:id/MedicalRecords/" element={<PatientMedicalRecords />} />
            <Route path="Doctor/CheckSymptoms" element={<DaCheckSymptoms />} />
            {/* Doctor Routes - End */}

            {/* Patients Routes - Starts */}
            <Route path="Patient/Profile" element={<Profile />} />
            <Route path="Patient/MedicalRecord" element={<MedicalRecord />} />
            <Route path="Patient/CheckSymptoms" element={<PaCheckSymptoms />} />
            <Route path="Patient/InsuranceDetails" element={<InsuranceDetails />} />
            <Route path="Patient/DoctorDirectory" element={<DoctorDirectory />} />
            <Route path="Patient/BookAppointment/:id" element={<BookAppointment />} />
            <Route path="Patient/Appointments" element={<PAppointments />} />
            {/* Patient Routes - End */}

            {/* Admin Routes - Starts */}
            <Route path="Admin/AddDieases" element={<AddDieases />} />
            {/* Admin Routes - End */}
          </Routes>
        </UserContextProvider>
      </Router>
    </main>
  );
}

export default App;
