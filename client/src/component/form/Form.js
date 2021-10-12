import { withRouter } from "react-router";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import "./Form.css";

const Form = () => {
  const [tech, techSet] = useState(false);
  const [corp, corpSet] = useState(false);
  const [creat, creatSet] = useState(false);
  const [token, setToken] = useState("");

  const [alerts, setAlerts] = useState([]);
  const [subdomains, setSubdomains] = useState([]);
  const [form, setForm] = useState(false);

  function onChange(value) {
    setToken(value);
  }

  const handleSelect = (e) => {
    setSubdomains((subdomains) => [...subdomains, e.target.value]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlerts([]);
    setSubdomains([]);
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

    if (alerts.length === 0) {
      const formLoad = {
        token: token,
        jwt: localStorage.getItem("token"),
        regno: target.regno.value,
        branch: target.branch.value,
        year: target.year.value,
        linkedin: target.linkedin.value,
        ques1: target.ques1.value,
        ques2: target.ques2.value,
        subdomains,
      };
      const body = JSON.stringify(formLoad);
      const config = {
        headers: {
          // "":"",
          "Content-Type": "application/json",
        },
      };
      axios
        .post("https://api.codechefsrm.in/apis/form", body, config)
        .then((res) => {
          const tok = res.data.access_token;
          const decoded = jwt_decode(tok);
          console.log(decoded);
          //   dispatch(login({ token: tok, user: decoded }));
          setForm(true);
        })
        .catch((err) => {
          console.log(err);
          alert("error while registration");
        });

      console.log(formLoad);
    }
  };

  return (
    <>
      <p>This is the form page.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="regno">Registration Number </label>
          <input
            type="text"
            name="regno"
            placeholder="RA21XXXXXXXXX"
            id="regno"
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="branch">Choose Branch </label>
          <select name="branch" id="branch">
            <option value="--">Select</option>
            <option value="cse">CSE</option>
            <option value="ece">ECE</option>
            <option value="aero">Aerospace</option>
            <option value="biotech">Biotech</option>
            <option value="mech">Mechanical</option>
            <option value="civil">Civil</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="year">Year </label>
          <select name="year" id="year">
            <option value="--">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="domain">Domain Choice </label>
          <br />
          <input
            type="checkbox"
            onClick={() => techSet(!tech)}
            id="domain1"
            value="domain1"
            name="domain1"
          ></input>
          <label htmlFor="domain1"> Technical Domain</label>
          <input
            type="checkbox"
            onClick={() => corpSet(!corp)}
            id="domain2"
            value="domain2"
            name="domain2"
          ></input>
          <label htmlFor="domain2"> Corporate Domain</label>
          <input
            type="checkbox"
            onClick={() => creatSet(!creat)}
            id="domain3"
            value="domain3"
            name="domain3"
          ></input>
          <label htmlFor="domain3"> Creatives Domain</label>
        </div>
        {corp && (
          <div className="form-group">
            <label htmlFor="corp">SubDomain Choice Corporate</label>
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
          <div className="form-group">
            <label htmlFor="tech">SubDomain Choice Technical</label>
            <select onChange={handleSelect} name="tech" id="tech">
              <option value="--">Select</option>
              <option value="web">Web Dev</option>
              <option value="app">App Dev</option>
              <option value="cp">CP</option>
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            placeholder="https://www.linkedin.com/in/jhondoe/"
            id="linkedin"
            required
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="ques1">Why do you want to join our club?</label>
          <input type="text" name="ques1" id="ques1" required></input>
        </div>
        <div className="form-group">
          <label htmlFor="ques2">Why should we choose you?</label>
          <input type="text" name="ques2" id="ques2" required></input>
        </div>
        <ReCAPTCHA
          sitekey="6LfnrcIcAAAAANFfMbEjQFK9Ur41kSCqYFl9pk3P"
          onChange={onChange}
        />
        <button type="submit" id="form-btn">
          Submit
        </button>
      </form>
      {alerts &&
        alerts.map((alert, index) => {
          return (
            <p key={index} className="alert">
              {alert}
            </p>
          );
        })}
    </>
  );
};

export default withRouter(Form);
