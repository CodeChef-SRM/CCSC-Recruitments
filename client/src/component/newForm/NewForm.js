import { withRouter } from "react-router";
import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import "./NewForm.css";
import axios from "axios";
import errorHandler from "../../errors/error";

// import img from "./Abc-min-min-min.png";

function NewForm() {
  const [tech, techSet] = useState(false);
  const [corp, corpSet] = useState(false);
  const tokenVal = localStorage.getItem("token");
  const [creat, creatSet] = useState(false);
  const [gith, setGith] = useState("");
  const [form, setForm] = useState(false);
  const reRef = useRef(null);
  const dispatch = useDispatch();
  let history = useHistory();

  const [alerts, setAlerts] = useState([]);
  const key = process.env.REACT_APP_KEY;
  const [subdom, setSubdom] = useState({
    tech: [],
    corp: [],
    creat: [],
  });
  function logout() {
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    window.location.href = "/";
    // history.push("/");
  }

  const { enqueueSnackbar } = useSnackbar();
  const handleSelect = (e) => {
    const { name, value } = e.target;
    setSubdom((subdom) => ({
      ...subdom,
      [name]: [value],
    }));
    // setSubdomains((subdomains) => [...subdomains, e.target.value]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlerts([]);
    const toker = await reRef.current.executeAsync();
    // setSubdomains([]);
    const target = e.target.elements;

    if (target.branch.value === "--") {
      setAlerts((alerts) => [...alerts, "Please enter your branch!"]);
    }

    if (target.year.value === "--") {
      setAlerts((alerts) => [...alerts, "Please enter your year!"]);
    }

    if (!tech && !corp && !creat) {
      setAlerts((alerts) => [...alerts, "Please select a domain"]);
    }

    if (tech) {
      if (target.tech.value === "--") {
        setAlerts((alerts) => [
          ...alerts,
          "Please enter your technical subdomain!",
        ]);
      }
    }

    if (corp) {
      if (target.corp.value === "--") {
        setAlerts((alerts) => [
          ...alerts,
          "Please enter your corporate subdomain!",
        ]);
      }
    }

    if (creat) {
      if (target.creat.value === "--") {
        setAlerts((alerts) => [
          ...alerts,
          "Please enter your creatives subdomain!",
        ]);
      }
    }
    if (toker === "") {
      setAlerts((alerts) => [...alerts, "Captcha"]);
      enqueueSnackbar("Invalid captcha", {
        variant: "error",
      });
    }

    if (alerts.length === 0) {
      const formLoad = {
        reg_number: target.regno.value,
        github_id: gith,
        linkedin: target.linkedin.value,
        joining_details: target.ques1.value,
        domain_details: subdom,
        year: target.year.value,
        branch: target.branch.value,
      };

      const body = JSON.stringify(formLoad);
      //   console.log(body);
      const config = {
        headers: {
          // "":"",
          "Content-Type": "application/json",
          "X-RECAPTCHA-TOKEN": `${toker}`,
          Authorization: `Bearer ${tokenVal}`,
        },
      };
      //   console.log(config);
      axios
        .post(
          "https://api.codechefsrm.in/apis/registration-details",
          body,
          config
        )
        .then((res) => {
          // const tok = res.data.access_token;
          // const decoded = jwt_decode(tok);
          // console.log(decoded);
          enqueueSnackbar("Kindly check your mail", { variant: "success" });
          setForm(true);
          history.push("/confirmation");
        })
        .catch((err) => {
          const error = errorHandler(err);
          enqueueSnackbar(error, {
            variant: "error",
          });

          setTimeout(function () {
            window.location.reload();
          }, 1000);
        });

      // console.log(formLoad);
    }
  };

  return (
    <div>
      <section id="contact">
        <div class="inner">
          <section
            className="left-cons"
            style={{ paddingLeft: "50px", paddingRight: "50px" }}
          >
            <form onSubmit={handleSubmit}>
              <div class="fields">
                <div class="field half">
                  <label for="name">Registration Number</label>
                  <input
                    type="text"
                    name="regno"
                    id="regno"
                    placeholder="RA21XXXXXXXXX"
                    required
                  />
                </div>
                <div class="field half">
                  <label for="details">Choose Branch</label>
                  {/* <input type="text" name="email" id="email" /> */}
                  <select name="branch" id="details">
                    <option value="--">Select</option>
                    <option value="cse">CSE</option>
                    <option value="ece">ECE</option>
                    <option value="aero">Aerospace</option>
                    <option value="biotech">Biotech</option>
                    <option value="mech">Mechanical</option>
                    <option value="civil">Civil</option>
                    <option value="automobile">Automobile</option>
                    <option value="eee">EEE</option>
                  </select>
                </div>
                <div class="field">
                  <label for="details">Year</label>
                  <select name="year" id="details">
                    <option value="--">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                {/* <div className="field input-box">
                  <div className="gender-details">
                    <input
                      type="radio"
                      id="domain1"
                      value="domain1"
                      name="domain1"
                      onClick={() => {
                        techSet(!tech);
                      }}
                    />
                    <input
                      type="radio"
                      id="domain2"
                      value="domain2"
                      name="domain2"
                      onClick={() => {
                        corpSet(!corp);
                      }}
                    />
                    <input
                      type="radio"
                      onClick={() => {
                        creatSet(!creat);
                      }}
                      id="domain3"
                      value="domain3"
                      name="domain3"
                    />
                    <span class="gender-title">Domains</span>
                    <div class="category">
                      <label htmlFor="domain1">
                        <input
                          type="radio"
                          id="domain1"
                          value="domain1"
                          name="domain1"
                          onClick={() => {
                            techSet(!tech);
                          }}
                        />
                        <span className="gender">Technical Domain</span>
                      </label>
                      <label htmlFor="domain2">
                        <span className={corp ? "dot two" : "dot"}></span>
                        <span className="gender">Corporate Domain</span>
                      </label>
                      <label htmlFor="domain3">
                        <span className={creat ? "dot three" : "dot"}></span>
                        <span className="gender">Creatives Domain</span>
                      </label>
                    </div>
                  </div>
                </div> */}
                <div class="field">
                  <label>Domain Details (Select upto 2 domains)*</label>
                  <input
                    type="checkbox"
                    value="domain1"
                    checked={tech}
                    onClick={() => {
                      techSet(!tech);
                    }}
                    id="flexCheckDefault1"
                  />
                  <label class="form-check-label" for="flexCheckDefault1">
                    Technical Domain
                  </label>
                  <input
                    type="checkbox"
                    value="domain2"
                    checked={corp}
                    onClick={() => {
                      corpSet(!corp);
                    }}
                    id="flexCheckDefault2"
                  />
                  <label class="form-check-label" for="flexCheckDefault2">
                    Corporate Domain
                  </label>
                  <input
                    type="checkbox"
                    checked={creat}
                    onClick={() => {
                      creatSet(!creat);
                    }}
                    value="domain3"
                    id="flexCheckDefault3"
                  />
                  <label class="form-check-label" for="flexCheckDefault3">
                    Creatives Domain
                  </label>
                </div>

                {corp && (
                  <div className="field">
                    <label htmlFor="corp">SubDomain Choice Corporate</label>
                    <br />
                    <select onChange={handleSelect} name="corp" id="corp">
                      <option value="--">Select</option>
                      <option value="manage">Management</option>
                      <option value="spon">Sponsorship</option>
                    </select>
                  </div>
                )}

                {creat && (
                  <div className="field">
                    <label htmlFor="creat">SubDomain Choice Creatives</label>
                    <br />
                    <select onChange={handleSelect} name="creat" id="creat">
                      <option value="--">Select</option>
                      <option value="gd">Graphic Design</option>
                      <option value="vid">Video Editing</option>
                      <option value="edi">Editorial</option>
                      <option value="ui">UI/UX</option>
                    </select>
                  </div>
                )}
                {tech && (
                  <div className="field">
                    <label htmlFor="tech">SubDomain Choice Technical</label>
                    <br />
                    <select onChange={handleSelect} name="tech" id="tech">
                      <option value="--">Select</option>
                      <option value="web">Web Dev</option>
                      <option value="app">App Dev</option>
                      <option value="cp">CP</option>
                    </select>
                    <br />
                    <br />
                    <label htmlFor="github">Github username</label>
                    <input
                      type="text"
                      name="github"
                      placeholder="github username"
                      onChange={(e) => setGith(e.target.value)}
                      style={{ border: "none" }}
                      value={gith}
                      id="github"
                      required
                    ></input>
                  </div>
                )}

                <div class="field">
                  <label for="linkedin">LinkedIn</label>
                  <input
                    type="text"
                    name="linkedin"
                    placeholder="https://www.linkedin.com/in/jhondoe/"
                    id="linkedin"
                    required
                  ></input>
                </div>

                <div class="field">
                  <label for="ques1">Why do you want to join our club?</label>
                  <textarea
                    name="message"
                    type="text"
                    placeholder="mention in atleast 30 words"
                    // eslint-disable-next-line
                    name="ques1"
                    id="ques1"
                    required
                  ></textarea>
                </div>
              </div>
              <ReCAPTCHA ref={reRef} sitekey={key} size="invisible" />
              <ul class="actions">
                <li>
                  <button type="submit" class="primary">
                    Submit
                  </button>
                </li>
                <li>
                  {" "}
                  <button
                    style={{ textDecoration: "none" }}
                    onClick={logout}
                    type="button"
                    class="primary"
                  >
                    logout
                  </button>
                </li>
              </ul>
            </form>
            {alerts &&
              alerts.map((alert, index) => {
                return (
                  <p key={index} className="alert">
                    {alert}
                  </p>
                );
              })}
          </section>
          <section
            class="split"
            style={{
              backgroundColor: "black",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            {/* <img
              style={{
                zIndex: "2",
                textAlign: "center",
                justifyContent: "center",
              }}
              src={img}
              className="home-img"
              width="auto"
              height="30%"
              alt="box"
            /> */}
            <lottie-player
              src="https://assets7.lottiefiles.com/packages/lf20_qzgzwpo9.json"
              background="transparent"
              speed="1"
              style={{
                width: "400px",
                height: "400px",
                textAlign: "center",
                alignItems: "center",
                marginLeft: "10%",
              }}
              loop
              autoplay
            ></lottie-player>
          </section>
        </div>
      </section>
    </div>
  );
}

export default withRouter(NewForm);
