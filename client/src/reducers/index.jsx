import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
// import doctorauth from './doctorauth';

export default combineReducers({
  alert,
  auth,
  profile,
  // doctorauth,
});
