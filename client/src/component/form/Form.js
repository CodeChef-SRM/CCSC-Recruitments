import { withRouter } from "react-router";
import { useState } from "react";
// import jwt_decode from "jwt-decode";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import "./Form.css";

const Form = () => {
  const [tech, techSet] = useState(false);
  const [corp, corpSet] = useState(false);
  const [creat, creatSet] = useState(false);
  const [token, setToken] = useState("");
  let history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  const [alerts, setAlerts] = useState([]);

  const [gith, setGith] = useState("");
  const [form, setForm] = useState(false);
  const tokenVal = localStorage.getItem("token");

  const [subdom, setSubdom] = useState({
    tech: [],
    corp: [],
    creat: [],
  });

  function onChange(value) {
    setToken(value);
  }

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setSubdom((subdom) => ({
      ...subdom,
      [name]: [value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlerts([]);
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
    if (!token) {
      setAlerts((alerts) => [...alerts, "Please complete captcha!"]);
      enqueueSnackbar("verify captcha", {
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

      const config = {
        headers: {
          // "":"",
          "Content-Type": "application/json",
          "X-RECAPTCHA-TOKEN": `${token}`,
          Authorization: `Bearer ${tokenVal}`,
        },
      };
      axios
        .post(
          "https://api.codechefsrm.in/apis/registration-details",
          body,
          config
        )
        .then((res) => {
          enqueueSnackbar("Kindly check your mail", { variant: "success" });
          setForm(true);
          history.push("/confirmation");
        })
        .catch((err) => {
          enqueueSnackbar("error while registration or already registered", {
            variant: "error",
          });
        });
    }
  };

  return (
    <div className="container form-outline mb-4">
      <div className="title">Enter your details in this form</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box-1">
              <label htmlFor="details">Registration Number </label>
              <input
                className="form-control input-size"
                type="text"
                name="regno"
                placeholder="RA21XXXXXXXXX"
                id="regno"
                required
              ></input>
            </div>

            <div className="input-box">
              <label htmlFor="details">Choose Branch </label>
              <br />
              <select
                className="form-control input-size"
                name="branch"
                id="branch"
              >
                <option value="--">Select</option>
                <option value="cse">CSE</option>
                <option value="ece">ECE</option>
                <option value="aero">Aerospace</option>
                <option value="biotech">Biotech</option>
                <option value="mech">Mechanical</option>
                <option value="civil">Civil</option>
              </select>
            </div>
            <div className="input-box">
              <label htmlFor="details">Year </label>
              <br />
              <select className="form-control" name="year" id="year">
                <option value="--">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div className="input-box">
              <div className="gender-details">
                <input
                  type="radio"
                  id="domain1"
                  value="domain1"
                  name="domain1"
                  checked={tech}
                  onClick={() => techSet(!tech)}
                />
                <input
                  type="radio"
                  id="domain2"
                  value="domain2"
                  name="domain2"
                  checked={corp}
                  onClick={() => corpSet(!corp)}
                />
                <input
                  type="radio"
                  onClick={() => creatSet(!creat)}
                  id="domain3"
                  value="domain3"
                  checked={creat}
                  name="domain3"
                />
                <span class="gender-title">Domain Choice</span>
                <div class="category">
                  <label for="domain1">
                    <span className="dot one"></span>
                    <span className="gender">Technical Domain</span>
                  </label>
                  <label for="domain2">
                    <span className="dot two"></span>
                    <span className="gender">Corporate Domain</span>
                  </label>
                  <label for="domain3">
                    <span className="dot three"></span>
                    <span className="gender">Creatives Domain</span>
                  </label>
                </div>
              </div>
            </div>

            {/* <div className="checkbox-inline">
              <label htmlFor="domain">Domain Choice </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <input
                    type="checkbox"
                    onClick={() => techSet(!tech)}
                    id="domain1"
                    value="domain1"
                    name="domain1"
                  ></input>
                  <label className="spacing" htmlFor="domain1">
                    {" "}
                    Technical Domain
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    onClick={() => corpSet(!corp)}
                    id="domain2"
                    value="domain2"
                    name="domain2"
                  ></input>
                  <label className="spacing" htmlFor="domain2">
                    {" "}
                    Corporate Domain
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    onClick={() => creatSet(!creat)}
                    id="domain3"
                    value="domain3"
                    name="domain3"
                  ></input>
                  <label className="spacing" htmlFor="domain3">
                    {" "}
                    Creatives Domain
                  </label>
                </div>
              </div>
            </div> */}
            {corp && (
              <div className="input-box">
                <label htmlFor="details">SubDomain Choice Corporate</label>
                <select onChange={handleSelect} name="corp" id="corp">
                  <option value="--">Select</option>
                  <option value="manage">Management</option>
                  <option value="spon">Sponsorship</option>
                </select>
              </div>
            )}

            {creat && (
              <div className="form-group">
                <label htmlFor="creat">SubDomain Choice Creatives</label>
                <select onChange={handleSelect} name="creat" id="creat">
                  <option value="--">Select</option>
                  <option value="gd">Graphic Design</option>
                  <option value="vid">Video Editing</option>
                  <option value="edi">Editorial</option>
                </select>
              </div>
            )}
            {tech && (
              <div className="input-box">
                <label htmlFor="details">SubDomain Choice Technical</label>
                <select
                  className="custom"
                  onChange={handleSelect}
                  name="tech"
                  id="tech"
                >
                  <option value="--">Select</option>
                  <option value="web">Web Dev</option>
                  <option value="app">App Dev</option>
                  <option value="cp">CP</option>
                </select>
                <input
                  className="form-control input-size"
                  type="text"
                  name="github"
                  placeholder="jhondoe"
                  onChange={(e) => setGith(e.target.value)}
                  value={gith}
                  id="github"
                  required
                ></input>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="linkedin">LinkedIn</label>
              <br />
              <input
                className="form-control input-size"
                type="text"
                name="linkedin"
                placeholder="https://www.linkedin.com/in/jhondoe/"
                id="linkedin"
                required
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="ques1">Why do you want to join our club?</label>
              <br />
              <textarea
                className="form-control input-size"
                type="text"
                name="ques1"
                id="ques1"
                required
              ></textarea>
            </div>

            <br />
            <div style={{ textAlign: "center", display: "inline-block" }}>
              {/* <div
            data-sitekey="6LeEtHgaAAAAAJxL0UVKar6Yy_KdwtO16xirpkyx"
            style={{ display: "inline-block" }}
          > */}
              <ReCAPTCHA
                sitekey="6LeEtHgaAAAAAJxL0UVKar6Yy_KdwtO16xirpkyx"
                onChange={onChange}
              />
              {/* </div> */}
            </div>

            <br />
            <button class="btn" type="submit" id="form-btn">
              Submit
            </button>
          </div>
        </form>
        {alerts &&
          alerts.map((alert, index) => {
            return (
              <p key={index} className="alert">
                {alert}
              </p>
            );
          })}
      </div>
    </div>
  );
};

export default withRouter(Form);
