import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import patientProfile from './patientProfile';

export default combineReducers({
  alert,
  auth,
  patientProfile,
});
