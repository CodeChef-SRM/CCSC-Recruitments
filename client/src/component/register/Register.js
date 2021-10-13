import React, { useState } from "react";
// import { signup } from "../../flux/actions/authAction";
import "./Register.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { Redirect } from "react-router";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [token, setToken] = useState("");
  const [auth, setAuth] = useState(false);

  function onChange(value) {
    setToken(value);
    console.log(value);
  }

  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      enqueueSnackbar("verify captcha", {
        variant: "error",
      });
    } else {
      // Attempt to login
      const body = JSON.stringify(data);

      const config = {
        method: "post",
        url: "https://api.codechefsrm.in/apis/register",
        headers: {
          "Content-Type": "application/json",
          "X-RECAPTCHA-TOKEN": `${token}`,
        },
        data: body,
      };

      axios(config)
        .then((res) => {
          setAuth(true);
          enqueueSnackbar("Registered Successfully", { variant: "success" });
        })
        .catch((err) => {
          enqueueSnackbar("Registeration Failed", { variant: "error" });
          dispatch({
            type: "REGISTER_FAIL",
          });
        });
    }
  };
  const authenticated = useSelector((state) => state.auth.isAuthenticated);
  if (auth || authenticated) {
    history.push("/login");
  }

  return (
    <div>
      <section class="main vh-100">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-8 col-lg-6 col-xl-4">
              <form class="form">
                <p class="para-main">Register To Play!!</p>

                <div class="form-outline mb-4">
                  <label class="form-label" for="form3Example3">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="form3Example3"
                    onChange={handleChange}
                    value={data.name}
                    class="form-control form-control-lg"
                    placeholder="Enter you Name"
                  />
                </div>
                <div class="form-outline mb-4">
                  <label class="form-label" for="form3Example3">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="form3Example3"
                    onChange={handleChange}
                    value={data.email}
                    class="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                  />
                </div>

                <div class="form-outline mb-3">
                  <label class="form-label" for="form3Example4">
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={handleChange}
                    value={data.password}
                    id="form3Example4"
                    name="password"
                    class="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                </div>

                <div class="forgot d-flex justify-content-between align-items-center">
                  <div class="form-check mb-0"></div>
                </div>
                <div style={{ textAlign: "center", display: "inline-block" }}>
                  <ReCAPTCHA
                    sitekey="6LeEtHgaAAAAAJxL0UVKar6Yy_KdwtO16xirpkyx"
                    onChange={onChange}
                  />
                </div>
                <div class="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    onClick={handleOnSubmit}
                    class="btn btn btn-lg"
                    style={{
                      color: "white",
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",
                    }}
                  >
                    Register
                  </button>
                  <p class="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account?{" "}
                    <a href="/login" class="link">
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
