import React from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import web from '../src/Images/415.jpg';

const Home = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/patientdashboard" />;
  }

  return (
    <>
      <section id="header" className="d-flex align-items-center">
        {/* <div className="container-fluid "> */}
        {/* <div className="row"> */}
        <div className="container d-flex flex-column">
          {/* <div className="col-10 mx-auto"> */}
          <div className="row my-5">
            <div className="col-md-6 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
              <div>
                <h1>
                  Creating India's
                  <span className="text-primary"> Digital</span>
                </h1>
                <h1>
                  <span className="text-primary">Health Ecosystem</span>
                </h1>
                <p className="text-muted my-3">
                  Health ID - Key to your digital healthcare journey.
                </p>
                <NavLink
                  to="/registeruser"
                  className="btn btn-outline-primary my-3"
                >
                  Create Your Health ID Now
                </NavLink>
              </div>
            </div>
            <div className="col-md-6 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
              <img
                className="img-fluid animated"
                src={web}
                alt=""
                style={{ width: '50' }}
              />
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </section>
    </>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
