import React, { useState } from "react";
import "./Reset.css";
import axios from "axios";
import { useSnackbar } from "notistack";
// import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

function Reset() {
  const [data, setData] = useState({
    password: "",
  });

  const { id } = useParams();
  // console.log(id);

  const { enqueueSnackbar } = useSnackbar();
  const [pass, setPass] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
  };
  // const search = useLocation().search;
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // const token = new URLSearchParams(search).get("token");

    if (data.password === pass) {
      const body = JSON.stringify(data);

      // console.log(body);
      // console.log(token);
      const config = {
        method: "post",
        url: "https://api.codechefsrm.in/apis/new_password",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${id}`,
        },
        data: body,
      };

      console.log(body);
      // Request body

      axios(config)
        .then((res) => {
          enqueueSnackbar("Password has been reset", { variant: "success" });
        })
        .catch((err) => {
          enqueueSnackbar("Error while resetting password", {
            variant: "error",
          });
        });
    } else {
      enqueueSnackbar("Password not matching", { variant: "error" });
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
                    name="password"
                    onChange={handleChange}
                    value={data.password}
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
