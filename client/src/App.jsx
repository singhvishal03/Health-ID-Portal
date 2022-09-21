import React, { useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../src/index.css';
import Home from './Home';
import RegisterUser from './RegisterUser';
import RegisterDoctor from './RegisterDoctor';
import LoginUser from './LoginUser';
import AdminLogin from './AdminLogin';
import DoctorLogin from './DoctorLogin';
import Navbar from './Navbar';
import Alert from './Alert';
import PatientDashboard from '../src/components/dashboard/PatientDashboard';
import DoctorDashboard from '../src/components/dashboard/DoctorDashboard';
import AdminDashboard from '../src/components/dashboard/PatientDashboard';
import CreatePatientProfile from './components/Profile/PatientProfile/CreateProfile';
import EditProfile from './components/Profile/PatientProfile/EditProfile';
import ViewProfile from './components/Profile/PatientProfile/ViewProfile';
import PrivateRoutes from './components/routing/PrivateRoutes';
import { Routes, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registeruser" element={<RegisterUser />} />
          <Route path="/registerdoctor" element={<RegisterDoctor />} />
          <Route path="/loginuser" element={<LoginUser />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/doctorlogin" element={<DoctorLogin />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/patientdashboard" element={<PatientDashboard />} />
            <Route path="/doctordashboard" element={<DoctorDashboard />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route
              path="/create-patient-profile"
              element={<CreatePatientProfile />}
            />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/my-profile" element={<ViewProfile />} />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <h1>There's nothing here!</h1>
              </main>
            }
          />
        </Routes>
      </Provider>
    </>
  );
};

export default App;
