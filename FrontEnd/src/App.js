// import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Patient/Profile';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContextProvider from './pages/Context/Context';
import axios from 'axios';
import CheckSymptoms from './pages/Patient/SymptomsChecker'
import DoctorDirectory from './pages/Patient/DoctorDirectory'
import InsuranceDetails from './pages/Patient/InsuranceDetails';
import Dashboard from './pages/Doctor/Dashboard'
import MedicalRecord from './pages/Patient/MedicalRecord';

axios.defaults.baseURL = 'http://localhost:9002';
axios.defaults.withCredentials = true;

function App() {
  return (
    <main>
      <Router>
        <UserContextProvider>
          <Routes>
            {/* <Route path="/" element={
              user && user._id ? <Profile mydata={user} setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />
            } />
            <Route path="/Login" element={<Login setLoginUser={setLoginUser} />} />
            <Route path="/Signup" element={<Signup />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/MedicalRecord" element={<MedicalRecord />} />
            <Route path="/CheckSymptoms" element={<CheckSymptoms />} />
            <Route path="/InsuranceDetails" element={<InsuranceDetails />} />
            <Route path="/DoctorDirectory" element={<DoctorDirectory />} />
          </Routes>
        </UserContextProvider>
      </Router>
    </main>
  );
}

export default App;
