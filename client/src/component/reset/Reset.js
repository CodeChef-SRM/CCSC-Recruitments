import React, { useState, useRef } from "react";
import "./Reset.css";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import errorHandler from "../../errors/error";

function Reset() {
  const [data, setData] = useState({
    new_password: "",
  });
  // const [token, setToken] = useState("");
  const key = process.env.REACT_APP_KEY;
  const url = process.env.REACT_APP_URL;
  const reRef = useRef(null);
  // function onChange(value) {
  //   setToken(value);
  // }

  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();
  const [pass, setPass] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const toker = await reRef.current.executeAsync();
    if (toker === "") {
      enqueueSnackbar("verify captcha", {
        variant: "error",
      });
    } else {
      if (data.new_password === pass) {
        const body = JSON.stringify(data);
        const config = {
          method: "post",
          url: url + "/apis/reset-password",
          headers: {
            "Content-Type": "application/json",
            "X-RECAPTCHA-TOKEN": `${toker}`,
            Authorization: `Bearer ${id}`,
          },
          data: body,
        };
        axios(config)
          .then((res) => {
            enqueueSnackbar("Password has been reset", { variant: "success" });
          })
          .catch((err) => {
            const error = errorHandler(err);
            enqueueSnackbar(error, {
              variant: "error",
            });
          });
      } else {
        enqueueSnackbar("Password not matching", { variant: "error" });
      }
    }
  };
  return (
    <div>
      <section class="main vh-100">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-8 col-lg-6 col-xl-4">
              <form class="form">
                <p class="para-main">Reset Password</p>

                <div class="form-outline mb-4">
                  <label class="form-label" for="form3Example3">
                    Password
                  </label>
                  <input
                    type="password"
                    name="new_password"
                    onChange={handleChange}
                    value={data.new_password}
                    id="form3Example3"
                    class="form-control form-control-lg"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number, one uppercase and one lowercase letter, and at least 8 or more characters"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div class="form-outline mb-3">
                  <label class="form-label" for="form3Example4">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="form3Example4"
                    name="pass"
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                    class="form-control form-control-lg"
                    placeholder="Re-enter password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number, one uppercase and one lowercase letter, and at least 8 or more characters"
                    required
                  />
                </div>

                <div style={{ textAlign: "center", display: "inline-block" }}>
                  <ReCAPTCHA ref={reRef} sitekey={key} size="invisible" />
                </div>

                <div class="forgot d-flex justify-content-between align-items-center">
                  <div class="form-check mb-0"></div>
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
                    Reset
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

export default Reset;
