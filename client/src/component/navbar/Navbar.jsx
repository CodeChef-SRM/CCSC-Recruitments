import React, { useEffect, useState } from "react";
import image1 from "./Artboard 1.png";
import { Link as NavLink } from "react-scroll";
import "./Navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
  const [mode, setMode] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  const [back, setBack] = useState(false);
  window.addEventListener("scroll", (event) => {
    console.log(window.scrollY);
    if (window.scrollY >= 150) {
      setBack(true);
    } else {
      setBack(false);
    }
  });
  const calcScreenWidth = () => {
    let w = window.innerWidth;
    console.log(w);
    if (w <= 1023) {
      setMode(true);
    } else {
      setMode(false);
    }
    return w;
  };
  useEffect(() => {
    calcScreenWidth();
  }, []);

  return !mode ? (
    <div className={back ? "navbar back__change" : "navbar"}>
      <div className="navbar__left">
        <a className="navbar-brand" href="/">
          <img src={image1} width="50" alt="squid" height="50" />
        </a>
      </div>
      <div className="navbar__center">
        <ul className="nav__links">
          <li className="nav-item">
            <NavLink className="nav-link active" to="home">
              <span style={{ color: "#ffffff" }}>Home</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="features">
              <span style={{ color: "#ffffff" }}>Features</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="feat">
              <span style={{ color: "#ffffff" }}>Facts</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="Testimonials">
              <span style={{ color: "#ffffff" }}>Testimonials</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="Pricing">
              <span style={{ color: "#ffffff" }}>Pricing</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="Contact">
              <span style={{ color: "#ffffff" }}>Contact</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar__right">
        <Link to="/login">
          <button>Get Started</button>
        </Link>
      </div>
    </div>
  ) : (
    <div>
      <div className={back ? "navbar__mobile back__change" : "navbar__mobile"}>
        <div className="navbar__mobile__left">
          <img src={image1} width="50" alt="squid" height="50" />
        </div>
        <div className="navbar__mobile__right">
          <div
            className="burger"
            onClick={() => setMobileToggle(!mobileToggle)}
          ></div>
        </div>
      </div>
      <div
        className={
          mobileToggle ? "nav__options nav__options__visible" : "nav__options"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={{
            position: "absolute",
            top: "10px",
            right: "5px",
            height: "50px",
            transform: "rotate(45deg)",
          }}
          fill="#e93e7d"
          onClick={() => setMobileToggle(false)}
        >
          <g data-name="Layer 2">
            <g data-name="plus">
              <rect
                width="24"
                height="24"
                opacity="0"
                transform="rotate(180 12 12)"
              />
              <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" />
            </g>
          </g>
        </svg>
        <ul className="nav__links nav__links__vert">
          <li className="nav-item">
            <NavLink
              className="nav-link active"
              to="home"
              onClick={() => setMobileToggle(false)}
            >
              <span style={{ color: "#ffffff" }}>Home</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="features"
              onClick={() => setMobileToggle(false)}
            >
              <span style={{ color: "#ffffff" }}>Features</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="feat"
              onClick={() => setMobileToggle(false)}
            >
              <span style={{ color: "#ffffff" }}>Facts</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="Testimonials"
              onClick={() => setMobileToggle(false)}
            >
              <span style={{ color: "#ffffff" }}>Testimonials</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="Pricing"
              onClick={() => setMobileToggle(false)}
            >
              <span style={{ color: "#ffffff" }}>Pricing</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="Contact"
              onClick={() => setMobileToggle(false)}
            >
              <span style={{ color: "#ffffff" }}>Contact</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

/* <nav className="navbar navbar-expand-lg fixed-top">
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
                <NavLink className="nav-link active" to="home">
                  <span style={{ color: "#ffffff" }}>Home</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="features">
                  <span style={{ color: "#ffffff" }}>Features</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="feat">
                  <span style={{ color: "#ffffff" }}>Facts</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="Testimonials">
                  <span style={{ color: "#ffffff" }}>Testimonials</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="Pricing">
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
      </nav> */
