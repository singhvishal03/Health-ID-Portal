import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from './actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div className="container-fluid">
      <ul></ul>
      <NavLink className="btn btn-primary" onClick={logout} to="/">
        Logout
      </NavLink>
    </div>
  );

  const guestLinks = (
    <div className="container-fluid">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <NavLink className="btn btn-outline-success me-3" to="/loginuser">
          Patient Login
        </NavLink>
        <NavLink className="btn btn-outline-warning me-3" to="/doctorlogin">
          Doctor / Facility Login
        </NavLink>
        <NavLink className="btn btn-outline-primary me-3" to="/adminlogin">
          Admin Login
        </NavLink>

        {/* </form> */}
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* <div className="col-10 mx-auto"> */}
          <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
              <NavLink className="navbar-brand active" to="/">
                Health ID Portal
              </NavLink>
            </div>
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </nav>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
