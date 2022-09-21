import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../../actions/profile';
import { NavLink } from 'react-router-dom';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  navigate,
}) => {
  const [formData, setFormData] = useState({
    gender: '',
    dob: '',
    bloodgroup: '',
    state: '',
    district: '',
    address: '',
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      gender: loading || !profile.gender ? '' : profile.gender,
      dob: loading || !profile.dob ? '' : profile.dob,
      bloodgroup: loading || !profile.bloodgroup ? '' : profile.bloodgroup,
      state: loading || !profile.state ? '' : profile.state,
      district: loading || !profile.district ? '' : profile.district,
      address: loading || !profile.address ? '' : profile.address,
    });
  }, [loading]);

  const { gender, dob, bloodgroup, state, district, address } = formData;

  const dobUpdated = dob.substring(0, 10);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, navigate, true);
  };

  return (
    <Fragment>
      <div className="my-5">
        <h1 className="text-center text-primary">
          <i className="fas fa-user"></i>Edit User Profile
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
                  value={dobUpdated}
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfile
);
