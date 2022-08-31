import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../src/index.css';
import Home from './Home';
import RegisterUser from './RegisterUser';
import RegisterDoctor from './RegisterDoctor';
import UserLogin from './UserLogin';
import AdminLogin from './AdminLogin';
import DoctorLogin from './DoctorLogin';
import Navbar from './Navbar';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registeruser" element={<RegisterUser />} />
        <Route path="/registerdoctor" element={<RegisterDoctor />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/doctorlogin" element={<DoctorLogin />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <h1>There's nothing here!</h1>
            </main>
          }
        />
      </Routes>
    </>
  );
};

export default App;