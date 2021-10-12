import React, { useState, useEffect } from "react";
import "./Login.css";
import { login } from "../../flux/actions/authAction";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Login() {
  const dispatch = useDispatch();
  let history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const authenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (authenticated) {
      history.push("/getting-started");
    }
    //eslint-disable-next-line
  }, [authenticated]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const user = { email: data.email, password: data.password };
    // Attempt to login
    const body = JSON.stringify(user);
    // Headers
    const config = {
      headers: {
        // "":"",
        "Content-Type": "application/json",
      },
    };
    // Request body
    axios
      .post("https://api.codechefsrm.in/apis/login", body, config)
      .then((res) => {
        const tok = res.data.access_token;
        const decoded = jwt_decode(tok);
        localStorage.setItem("token", tok);
        dispatch(login({ token: tok, user: decoded }));
        // setAuth(true);
        enqueueSnackbar("LogIn Successful", { variant: "success" });
        // history.push("/getting-started");
      })
      .catch((err) => {
        enqueueSnackbar("LogIn Failed", { variant: "error" });
        // console.log(err);
        dispatch({
          type: "REGISTER_FAIL",
        });
        // history.push("/login");
      });
  };

  return (
    <div>
      <section class="main vh-100">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-8 col-lg-6 col-xl-4">
              <form class="form">
                {/* <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                /> */}
                <p class="para-main">Welcome back let's Play!!</p>

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
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    class="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    required
                  />
                </div>

                <div class="form-outline mb-3">
                  <label class="form-label" for="form3Example4">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="form3Example4"
                    onChange={handleChange}
                    value={data.password}
                    class="form-control form-control-lg"
                    placeholder="Enter password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number, one uppercase and one lowercase letter, and at least 8 or more characters"
                    required
                  />
                </div>

                <div class="forgot d-flex justify-content-between align-items-center">
                  <div class="form-check mb-0"></div>

                  <a href="/forgot" class="small fw-bold mt-2 pt-1 mb-0">
                    Forgot password?
                  </a>
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
                    Login
                  </button>
                  <p class="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <a href="/signup" class="link">
                      Register
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
}

export default Login;
