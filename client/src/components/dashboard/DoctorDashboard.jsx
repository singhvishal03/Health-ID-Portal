import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { getCurrentProfile } from '../../actions/patientProfile';
import { NavLink } from 'react-router-dom';

const DoctorDashboard = () => {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <div className="flex">
        <div className="container-fluid">
          <div
            className="row"
            style={{
              width: 'full',
              height: '250px',
              backgroundColor: '#198754',
            }}
          >
            <div className="text-left">
              {/* <h1 className="large text-white">Dashboard</h1> */}
            </div>
            <div className="text-left">
              <div className="row justify-content-left text-white">
                <h3>Hi Doctor, </h3>
              </div>
            </div>

            <div className="text-left">
              <div className="row justify-content-left text-white">
                <h6>Use the below dashboard to navigate faster.</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5">
          <div className="container d-flex flex-column">
            <div className="row">
              <div className="col-md-8 col-lg-7 col-xl-4 py-2 py-md-5">
                <div className="card shadow-lg z-index-100">
                  <div className="card-body">
                    <h5 className="card-title">View Patient Details</h5>
                    <p className="text-muted my-3 card-text">
                      View and Add Medical details.
                    </p>
                    <NavLink className="btn btn-success me-3" to="/">
                      View Patient Here!
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-lg-7 col-xl-4 py-2 py-md-5">
                <div className="card shadow-lg">
                  <div className="card-body">
                    <h5 className="card-title">View your profile</h5>
                    <p className="text-muted my-3 card-text">
                      Click on the below button.
                    </p>
                    <NavLink className="btn btn-primary me-3" to="/">
                      My Profile
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-lg-7 col-xl-4 py-2 py-md-5">
                <div className="card shadow-lg">
                  <div className="card-body">
                    <h5 className="card-title">Edit Profile</h5>
                    <p className="text-muted my-3 card-text">
                      Click on the below button.
                    </p>
                    <NavLink className="btn btn-danger me-3" to="/">
                      Edit Profile
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

DoctorDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(DoctorDashboard);
