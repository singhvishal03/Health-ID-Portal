import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from './actions/alert';
import { register } from './actions/doctorauth';
import PropTypes from 'prop-types';

// import axios from 'axios';

const RegisterDoctor = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    doctorid: '',
    department: '',
    email: '',
    password: '',
    confirmpassword: '',
    phoneno: '',
    gender: '',
    experience: '',
    consultancycharge: '',
    status: '',
  });

  const {
    fname,
    lname,
    doctorid,
    department,
    email,
    password,
    confirmpassword,
    phoneno,
    gender,
    experience,
    consultancycharge,
    status,
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        fname,
        lname,
        doctorid,
        department,
        email,
        password,
        confirmpassword,
        phoneno,
        gender,
        experience,
        consultancycharge,
        status,
      });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/doctorlogin" />;
  }

  return (
    <>
      <div className="my-5">
        <h1 className="text-center text-primary">
          <i className="fas fa-user"></i>Register Doctor
        </h1>
      </div>
      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <form className="form" onSubmit={e => onSubmit(e)}>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="fnameHelp"
                  name="fname"
                  value={fname}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="lnameHelp"
                  name="lname"
                  value={lname}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Doctor ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="doctorid"
                  aria-describedby="doctorID"
                  value={doctorid}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  aria-describedby="department"
                  value={department}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmpassword"
                  value={confirmpassword}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone No</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneno"
                  value={phoneno}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <input
                  type="text"
                  className="form-control"
                  name="gender"
                  value={gender}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Experience</label>
                <input
                  type="text"
                  className="form-control"
                  name="experience"
                  value={experience}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Consultancy Charge</label>
                <input
                  type="text"
                  className="form-control"
                  name="consultancycharge"
                  value={consultancycharge}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <input
                  type="text"
                  className="form-control"
                  name="status"
                  value={status}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label">I agree</label>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

RegisterDoctor.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(RegisterDoctor);
