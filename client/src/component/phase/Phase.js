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

      <Tabs>
        <TabList>
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
                              style={{
                                borderRadius: "5px",
                                backgroundColor: "#222327",
                                padding: "10px",
                              }}
                            >
                              <li>adwadadawdadada</li>
                              <li>adwadadawdadada</li>
                            </ul>
                          </div>
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
                        </div>

                        {/* <ReCAPTCHA ref={reRef} sitekey={key} size="invisible" /> */}
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
                              type="button"
                              class="primary"
                            >
                              logout
                            </button>
                          </li>
                        </ul>
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
