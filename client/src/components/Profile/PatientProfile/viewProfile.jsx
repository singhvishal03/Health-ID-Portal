import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profile';
import { NavLink } from 'react-router-dom';

const ViewProfile = ({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile,
}) => {
  const dobUpdated = profile.dob.substring(0, 10);
  //=> {
  //   const [formData, setFormData] = useState({
  //     fname: '',
  //     lname: '',
  //     healthid: '',
  //     email: '',
  //     phoneno: '',
  //     gender: '',
  //     dob: '',
  //     bloodgroup: '',
  //     state: '',
  //     district: '',
  //     address: '',
  //   });

  useEffect(() => {
    getCurrentProfile();

    //   setFormData({
    //     fname: loading || !user.fname ? '' : user.fname,
    //     lname: loading || !user.lname ? '' : user.lname,
    //     healthid: loading || !user.healthid ? '' : user.healthid,
    //     email: loading || !user.email ? '' : user.email,
    //     phoneno: loading || !user.phoneno ? '' : user.phoneno,
    //     gender: loading || !profile.gender ? '' : profile.gender,
    //     dob: loading || !profile.dob ? '' : profile.dob,
    //     bloodgroup: loading || !profile.bloodgroup ? '' : profile.bloodgroup,
    //     state: loading || !profile.state ? '' : profile.state,
    //     district: loading || !profile.district ? '' : profile.district,
    //     address: loading || !profile.address ? '' : profile.address,
    //   });
  }, [loading, getCurrentProfile]);

  // const {
  //   fname,
  //   lname,
  //   healthid,
  //   email,
  //   phoneno,
  //   gender,
  //   dob,
  //   bloodgroup,
  //   state,
  //   district,
  //   address,
  // } = formData;

  //   const onChange = e =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  //   const onSubmit = e => {
  //     e.preventDefault();
  //     createProfile(formData, navigate, true);
  //   };

  return (
    <Fragment>
      <div className="my-5">
        <h1 className="text-center text-primary">
          <i className="fas fa-user"></i>View Profile
        </h1>
      </div>
      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <table className="table table-bordered">
              <thead
                className="thead-dark"
                style={{ background: 'rgb(242 228 177)' }}
              >
                <tr>
                  <th> Health ID Number </th>
                  <th> {profile.healthidno}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>
                    {user.fname} {user.lname}
                  </td>
                </tr>
                <tr>
                  <td>Health ID</td>
                  <td>{user.healthid}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>Phone No</td>
                  <td>{user.phoneno}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>{profile.gender}</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>{dobUpdated}</td>
                </tr>
                <tr>
                  <td>Blood Group</td>
                  <td>{profile.bloodgroup}</td>
                </tr>
                <tr>
                  <td>State</td>
                  <td>{profile.state}</td>
                </tr>
                <tr>
                  <td>District</td>
                  <td>{profile.district}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{profile.address}</td>
                </tr>
              </tbody>
            </table>
            <div className="mb-3">
              <NavLink
                className="btn btn-primary me-3"
                to="/edit-profile"
                style={{ width: '100%' }}
              >
                Edit My Profile
              </NavLink>
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ViewProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(ViewProfile);
