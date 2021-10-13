import React from "react";
import image1 from "./Artboard 1.png";
// import { Link as NavLink } from "react-scroll";
import { useHistory } from "react-router-dom";
import "./NavAfter.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
function NavAfter() {
  const dispatch = useDispatch();
  let history = useHistory();
  function logout() {
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    history.push("/login");
  }

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
              =
            </ul>

            <li style={{ listStyle: "none" }}>
              <button onClick={logout} class="btn btn-2  button-spacing">
                logout <i class="fas fa-share"></i>
              </button>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavAfter;
