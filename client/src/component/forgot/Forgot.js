import React, { useState } from "react";
import "./Forgot.css";
import axios from "axios";
import { useSnackbar } from "notistack";
import ReCAPTCHA from "react-google-recaptcha";

function Forgot() {
  const [token, setToken] = useState("");
  const key = process.env.REACT_APP_KEY;
  const [data, setData] = useState({
    email: "",
  });

  function onChange(value) {
    setToken(value);
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
      const body = JSON.stringify(data);

      const config = {
        method: "post",
        url: "https://api.codechefsrm.in/apis/forgot-password",
        headers: {
          "Content-Type": "application/json",
          "X-RECAPTCHA-TOKEN": `${token}`,
        },
        data: body,
      };

      axios(config)
        .then((res) => {
          enqueueSnackbar("Kindly check your mail", { variant: "success" });
        })
        .catch((err) => {
          enqueueSnackbar("mail doesn't exist", { variant: "error" });
        });
    }
  };
  return (
    <div>
      <section class="main vh-100">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-8 col-lg-6 col-xl-4">
              <form class="form">
                <p class="para-main">Forgot Password?</p>
                <div class="form-outline mb-4">
                  <label class="form-label" for="form3Example3">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    id="form3Example3"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    class="form-control form-control-lg"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div class="forgot d-flex justify-content-between align-items-center">
                  <div class="form-check mb-0"></div>
                </div>
                <div style={{ textAlign: "center", display: "inline-block" }}>
                  <ReCAPTCHA
                    sitekey={key}
                    size="invisible"
                    onChange={onChange}
                  />
                </div>
                <div class="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    onClick={handleOnSubmit}
                    class="btn btn btn-lg"
                    style={{
                      color: "white",
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Forgot;
