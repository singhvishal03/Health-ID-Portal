import React, { useState } from 'react';
// import axios from 'axios';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    healthid: '',
    email: '',
    password: '',
    confirmpassword: '',
    phoneno: '',
  });

  const { fname, lname, healthid, email, password, confirmpassword, phoneno } =
    formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmpassword) {
      console.log("passwords doesn't match");
    } else {
      console.log('SUCCESS!!!');
      // const newUser = {
      //   fname,
      //   lname,
      //   healthid,
      //   email,
      //   password,
      //   confirmpassword,
      //   phoneno,
      // };
      // try {
      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   };
      //   const body = JSON.stringify(newUser);

      //   const res = await axios.post('/api/users', body, config);
      //   console.log(res.data);
      // } catch (err) {
      //   console.error(err.response.data);
      // }
    }
  };

  return (
    <>
      <div className="my-5">
        <h1 className="text-center text-primary">
          <i className="fas fa-user"></i>Register User
        </h1>
      </div>
      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <form className="form" onSubmit={e => onSubmit(e)}>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="fnameHelp"
                  name="fname"
                  value={fname}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="lnameHelp"
                  name="lname"
                  value={lname}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Health ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="healthid"
                  aria-describedby="healthID"
                  value={healthid}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmpassword"
                  value={confirmpassword}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone No</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneno"
                  value={phoneno}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" required />
                <label className="form-check-label">I agree</label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterUser;