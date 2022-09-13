import React from 'react';

const AdminLogin = () => {
  return (
    <>
      <div className="my-5">
        <h1 className="text-center text-primary">
          <i className="fas fa-user"></i>Admin Login
        </h1>
      </div>
      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <form className="form">
              <div className="mb-3">
                <label className="form-label">Admin ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="doctorid"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  required
                />
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

export default AdminLogin;
