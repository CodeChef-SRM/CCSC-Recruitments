import React, { useState } from "react";
import "./Phase.css";
import "../newForm/NewForm.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

function Phase() {
  // eslint-disable-next-line
  const [dom, setDom] = useState({
    tech: "web",
    corpe: "manage",
  });
  // const [tech, setTech] = useState("");
  // const [creat, setCreat] = useState("");
  // const [corp, setCorp] = useState("");

  // useEffect(() => {
  //   // to fetch the domains choosed
  //   axios.post("");
  //   //setting those domains and generating the form
  // }, []);

  //3 functions to be declared 1 for each

  return (
    <div className="App">
      {/* <h1>Sample</h1> */}

      <Tabs className="tabs-element">
        <TabList className="left-tab-div">
          {Object.keys(dom).map(function (key, index) {
            return (
              <Tab>
                <p>{key}</p>
              </Tab>
            );
          })}
        </TabList>
        {Object.keys(dom).map(function (key, index) {
          if (dom[key] === "web" && key === "tech") {
            return (
              <TabPanel>
                <div className="panel-content">
                  <section id="contact">
                    <section className="left-cons">
                      <form>
                        <div class="fields">
                          <div class="field">
                            <ul
                              className="mb-0 mt-3 px-4"
                              style={{
                                borderRadius: "5px",
                                backgroundColor: "#222327",
                                padding: "10px",
                              }}
                            >
                              <h3 className="instructions mb-0">
                                Instructions for candidates
                              </h3>
                              <div className="list-items-div mt-4">
                                <li className="list-indiv-item text-left">
                                  1. Lorem ipsum dolor sit.
                                </li>
                                <li className="list-indiv-item text-left">
                                  2. Lorem ipsum dolor sit.
                                </li>
                                <li className="list-indiv-item text-left">
                                  3. Lorem ipsum dolor sit.
                                </li>
                                <li className="list-indiv-item text-left">
                                  4. Lorem ipsum dolor sit.
                                </li>
                              </div>
                            </ul>
                          </div>
                          <div class="field">
                            <label for="linkedin">LinkedIn</label>
                            <input
                              type="text"
                              name="linkedin"
                              placeholder="https://www.linkedin.com/in/janedoe/"
                              id="linkedin"
                              required
                            ></input>
                          </div>
                        </div>

                        {/* <ReCAPTCHA ref={reRef} sitekey={key} size="invisible" /> */}
                        <div className="btn-div">
                          <ul class="actions">
                            <li className="li-btn">
                              <button
                                type="submit"
                                class="primary-btn"
                                id="submit"
                              >
                                Submit
                              </button>
                            </li>
                            <li>
                              {" "}
                              <button
                                style={{ textDecoration: "none" }}
                                type="button"
                                class="primary-btn"
                                id="logout"
                              >
                                logout
                              </button>
                            </li>
                          </ul>
                        </div>
                      </form>
                    </section>
                  </section>
                </div>
              </TabPanel>
            );
          }
          if (dom[key] === "app") {
            return (
              <TabPanel>
                <div className="panel-content">
                  <h2>app content</h2>
                </div>
              </TabPanel>
            );
          }
          if (dom[key] === "gd") {
            return (
              <TabPanel>
                <div className="panel-content">
                  <h2>gd content</h2>
                </div>
              </TabPanel>
            );
          }
          if (dom[key] === "manage") {
            return (
              <TabPanel>
                <div className="panel-content">
                  <h2>Manage</h2>
                </div>
              </TabPanel>
            );
          } else {
            return (
              <TabPanel>
                <div className="panel-content">
                  <h2>Else</h2>
                </div>
              </TabPanel>
            );
          }
        })}
      </Tabs>
    </div>
  );
}

export default Phase;
