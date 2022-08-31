import React from 'react';
import { NavLink } from 'react-router-dom';
// import web from '../src/Images/415.jpg';

const Home = () => {
  return (
    <>
      <section id="header" className="d-flex align-items-center">
        <div className="container-fluid nav_bg">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="col-md-6 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                  <div>
                    <h1>
                      Creating India's
                      <span className="text-primary"> Digital</span>
                    </h1>
                    <h1>
                      <span className="text-primary">Health Ecosystem</span>
                    </h1>
                    <p className="text-muted my-3">
                      Health ID - Key to your digital healthcare journey.
                    </p>
                    <NavLink
                      to="/registeruser"
                      className="btn btn-outline-primary my-3"
                    >
                      Create Your Health ID Now
                    </NavLink>
                  </div>
                </div>
                <img className="img-fluid animated" src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
