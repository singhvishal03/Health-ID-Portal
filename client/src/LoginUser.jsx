import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from './actions/auth';

import PropTypes from 'prop-types';

const LoginUser = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    phoneno: '',
    password: '',
  });

  const { phoneno, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(phoneno, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/patientdashboard" />;
  }

  return (
    <>
      <div className="my-5">
        <h1 className="text-center text-primary">
          <i className="fas fa-user"></i>Patient Login
        </h1>
      </div>
      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <form className="form" onSubmit={e => onSubmit(e)}>
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
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

LoginUser.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(LoginUser);
