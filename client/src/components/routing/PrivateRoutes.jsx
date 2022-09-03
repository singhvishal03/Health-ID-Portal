import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoutes = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Outlet
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Navigate to="/loginuser" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoutes.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoutes);
