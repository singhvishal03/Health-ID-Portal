import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { NavLink } from 'react-router-dom';

const PatientDashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Fragment>
      <h1> Loading... </h1>
    </Fragment>
  ) : (
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
            <div style={{ margin: '20px' }}>
              <div className="text-left">
                <div className="row justify-content-left text-white">
                  <h3>Welcome {user && user.fname} , </h3>
                </div>
              </div>
              <div className="text-left">
                <div className="row justify-content-left text-white">
                  <h6>Start your digital health journey today!</h6>
                  <h6>Use the below dashboard to navigate faster.</h6>
                </div>
              </div>
            </div>

            {profile !== null ? (
              <Fragment>
                <div className="my-5">
                  <div className="container d-flex flex-column">
                    <div className="row">
                      <div className="col-md-8 col-lg-7 col-xl-4 py-2 py-md-5">
                        <div className="card shadow-lg z-index-100">
                          <div className="card-body">
                            <h5 className="card-title">View your profile</h5>
                            <p className="text-muted my-3 card-text">
                              Click on the below button.
                            </p>
                            <NavLink
                              className="btn btn-success me-3"
                              to="/my-profile"
                            >
                              My Profile
                            </NavLink>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8 col-lg-7 col-xl-4 py-2 py-md-5">
                        <div className="card shadow-lg">
                          <div className="card-body">
                            <h5 className="card-title">Edit your profile</h5>
                            <p className="text-muted my-3 card-text">
                              Click on the below button.
                            </p>
                            <NavLink
                              className="btn btn-primary me-3"
                              to="/edit-profile"
                            >
                              Edit My Profile
                            </NavLink>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8 col-lg-7 col-xl-4 py-2 py-md-5">
                        <div className="card shadow-lg">
                          <div className="card-body">
                            <h5 className="card-title">
                              View Treatment History
                            </h5>
                            <p className="text-muted my-3 card-text">
                              Click on the below button.
                            </p>
                            <NavLink
                              className="btn btn-danger me-3"
                              to="/view-treatment-history"
                            >
                              Your Treatment History
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="my-5">
                  <div className="container d-flex flex-column">
                    <div className="col-md-8 col-lg-7 col-xl-4 py-2 py-md-5">
                      <div className="row my-4">
                        <p>
                          You have not created your profile, please add some
                          info .
                        </p>
                        <div className="card shadow-lg">
                          <div className="card-body">
                            <h5 className="card-title">Create your profile</h5>
                            <p className="text-muted my-3 card-text">
                              Click on the below button.
                            </p>
                            <NavLink
                              className="btn btn-primary me-3"
                              to="/create-patient-profile"
                            >
                              Create My Profile
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

PatientDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(
  PatientDashboard
);
