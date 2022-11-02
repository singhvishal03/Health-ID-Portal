import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
// import adminauth from './adminauth';

export default combineReducers({
  alert,
  auth,
  profile,
  // adminauth,
  // doctorauth,
});
