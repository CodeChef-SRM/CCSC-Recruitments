import React from 'react'
import image1 from "./Artboard 1.png";
import {Link as NavLink} from 'react-scroll'
import './Navbar.css'
import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <div>
             <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={image1} width="50" alt="squid" height="50" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link active"  to="home">
                  <span style={{ color: "#ffffff" }}>Home</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link"  to="features">
                  <span style={{ color: "#ffffff" }}>Features</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link"  to="feat">
                  <span style={{ color: "#ffffff" }}>Facts</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link"  to="Testimonials">
                  <span style={{ color: "#ffffff" }}>Testimonials</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link"  to="Pricing">
                  <span style={{ color: "#ffffff" }}>Pricing</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="Contact">
                  <span style={{ color: "#ffffff" }}>Contact</span>
                </NavLink>
              </li>
            </ul>

            <li>
              <Link to="/login" className="btn btn-2  button-spacing">
                Get Started
              </Link>
            </li>
          </div>
        </div>
      </nav>

        </div>
    )
}

export default Navbar
