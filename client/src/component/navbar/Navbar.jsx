import React from "react";
import image1 from "./Artboard 1.png";
import { Link as NavLink } from "react-scroll";
import "./Navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
          <a class="navbar-brand" href="/">
            <img src={image1} width="50" alt="ccsc" height="50" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto mr-auto">
              <li class="nav-item">
                <Link to="/" className="nav-link active">
                  <span style={{ color: "#ffffff" }}>Home</span>
                </Link>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="Domain">
                  <span style={{ color: "#ffffff" }}>Domains</span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink className="nav-link" to="About">
                  <span style={{ color: "#ffffff" }}>About Us</span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink className="nav-link" to="Phase">
                  <span style={{ color: "#ffffff" }}>Phases</span>
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="FAQs">
                  <span style={{ color: "#ffffff" }}>FAQs</span>
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink class="nav-link" to="Reach">
                  <span style={{ color: "#ffffff" }}>Reach Us</span>
                </NavLink>
              </li>
            </ul>

            <li style={{ listStyle: "none" }}>
              <Link to="/login" class="btn btn-2  button-spacing">
                Get Started <i class="fas fa-share"></i>
              </Link>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
