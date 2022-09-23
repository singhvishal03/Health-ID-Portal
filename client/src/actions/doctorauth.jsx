import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load Doctor
export const loadDoctor = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('api/doctorauth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register Doctor
export const register =
  ({ fname, lname, doctorid, password, confirmpassword }) =>
  async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      fname,
      lname,
      doctorid,
      password,
      confirmpassword,
    });

    try {
      const res = await axios.post('./api/registerDoctor', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadDoctor());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login Doctor
export const login = (doctorid, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    doctorid,
    password,
  });

  try {
    const res = await axios.post('./api/doctorauth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadDoctor());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
