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
    <div className="main form-outline mb-4">
      <p className="heading">Enter your details in this form</p>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="regno">Registration Number </label>
          <input
            className="form-control input-size"
            type="text"
            name="regno"
            placeholder="RA21XXXXXXXXX"
            id="regno"
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="branch">Choose Branch </label>
          <br />
          <select className="form-control input-size" name="branch" id="branch">
            <option value="--">Select</option>
            <option value="cse">CSE</option>
            <option value="ece">ECE</option>
            <option value="aero">Aerospace</option>
            <option value="biotech">Biotech</option>
            <option value="mech">Mechanical</option>
            <option value="civil">Civil</option>
          </select>
        </div>
        <div className="form-group input-size">
          <label htmlFor="year">Year </label>
          <br />
          <select className="form-control" name="year" id="year">
            <option value="--">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <br/>
        <div className="form-group checkbox-inline">
          <label  htmlFor="domain">Domain Choice </label>
         <div style={{display:'flex',alignItems:"center",justifyContent:'center'}}>
          <div>
          <input
            type="checkbox"
            onClick={() => techSet(!tech)}
            id="domain1"
            value="domain1"
            name="domain1"
          ></input>
          <label   className="spacing" htmlFor="domain1">
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
        <div className="form-group">
          <label htmlFor="ques2">Why should we choose you?</label>
          <br />
          <textarea
            className="form-control input-size"
            type="text"
            name="ques2"
            id="ques2"
            required
          ></textarea>
        </div>
        <br />
        <div style={{textAlign:"center"}}>
          <div
            data-sitekey="6LeEtHgaAAAAAJxL0UVKar6Yy_KdwtO16xirpkyx"
            style={{display: 'inline-block'}}
          >
                <ReCAPTCHA
          sitekey="6LeEtHgaAAAAAJxL0UVKar6Yy_KdwtO16xirpkyx"
          onChange={onChange}
        />
          </div>
        </div>
    

        <br />
        <button class="btn" type="submit" id="form-btn">
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
    </div>
  );
};

export default withRouter(Form);
