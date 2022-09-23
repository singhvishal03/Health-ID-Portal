import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../../actions/profile';
import { NavLink } from 'react-router-dom';

const CreateProfile = ({ createProfile, navigate }) => {
  const [formData, setFormData] = useState({
    gender: '',
    dob: '',
    bloodgroup: '',
    state: '',
    district: '',
    address: '',
    healthidno: '',
  });

  let { gender, dob, bloodgroup, state, district, address } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = e => {
    e.preventDefault();
    var id = dob.replaceAll('-', '');
    var finalid = id.substring(0, 8);
    var seq = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    formData.healthidno = finalid.concat(seq);
    console.log(formData.healthidno);
    createProfile(formData, navigate);
  };

  return (
    <Fragment>
      <div className="my-5">
        <h1 className="text-center text-primary">
          <i className="fas fa-user"></i>Create User Profile
        </h1>
      </div>
      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <form className="form" onSubmit={e => onSubmit(e)}>
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  aria-describedby="gender"
                  style={{ height: '30px', width: '100%' }}
                  value={gender}
                  onChange={e => onChange(e)}
                >
                  <option value="0"></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  aria-describedby="dob"
                  name="dob"
                  value={dob}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Blood Group</label>
                <select
                  name="bloodgroup"
                  aria-describedby="bloodgroup"
                  style={{ height: '30px', width: '100%' }}
                  value={bloodgroup}
                  onChange={e => onChange(e)}
                >
                  <option value="0"></option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">State</label>
                <input
                  type="state"
                  className="form-control"
                  aria-describedby="state"
                  name="state"
                  value={state}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">District</label>
                <input
                  type="district"
                  className="form-control"
                  name="district"
                  value={district}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="address"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Submit
                </button>
              </div>
              <div className="mb-3">
                <NavLink
                  type="submit"
                  className="btn btn-info"
                  style={{ width: '100%' }}
                  to="/patientdashboard"
                >
                  Go back
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  // profile: PropTypes.object,
};

// const mapStateToProps = state => ({
//   profile: state.profile,
// });

export default connect(null, { createProfile })(CreateProfile);
