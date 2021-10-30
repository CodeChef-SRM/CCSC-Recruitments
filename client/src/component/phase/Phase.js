import React, { useState, useEffect } from "react";
import "./Phase.css";
import "../newForm/NewForm.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useSnackbar } from "notistack";
import axios from "axios";
import errorHandler from "../../errors/error";
import { useDispatch } from "react-redux";

function Phase() {
  function logout() {
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    window.location.href = "/";
    // history.push("/");
  }
  // eslint-disable-next-line
  const url = process.env.REACT_APP_URL;

  // const [dom, setDom] = useState({});
  const dispatch = useDispatch();
  const [tech, setTech] = useState("");
  const [creat, setCreat] = useState("");
  const [corp, setCorp] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  // let [posts, setPosts] = useState({});

  // const [pp, setPP] = useState({
  //   tech: ["app"],
  //   corp: ["manage"],
  // });
  const [dom, setDom] = useState({});
  useEffect(() => {
    function getResults() {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      // https://c998-103-121-204-234.ngrok.io
      //api.codechefsrm.in/apis/task-submission?task=2
      axios
        .get(url + "/apis/domain-details", config)
        .then((res) => {
          // console.log(res.data);
          setDom(res.data);
          // alert(res.data);
          // enqueueSnackbar("Submitted successfully", { variant: "success" });
        })
        .catch((err) => {
          const error = errorHandler(err);

          enqueueSnackbar(error, {
            variant: "error",
          });
          localStorage.removeItem("token");
          setTimeout(function () {
            window.location.href = "/login";
          }, 1000);
        });
    }
    getResults();

    // console.log(dom);
    // eslint-disable-next-line
  }, []);

  //3 functions to be declared 1 for each
  const handleOnSubmit = async (e, domain, sub_dom, url) => {
    e.preventDefault();
    // console.log(domain, sub_dom);
    const user = {
      task_link: url,
      domain: domain,
      sub_domain: sub_dom,
    };

    const body = JSON.stringify(user);
    // Headers
    const tokenVal = localStorage.getItem("token");
    const config = {
      headers: {
        // "":"",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenVal}`,
      },
    };
    console.log(body);
    axios
      .post(
        "https://api.codechefsrm.in/apis/task-submission?task=1",
        body,
        config
      )
      .then((res) => {
        enqueueSnackbar("Submitted successfully", { variant: "success" });
        // history.push("/getting-started");
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
  };

  return (
    <div className="App">
      <Tabs scrollButtons="auto" className="tabs-element">
        <TabList
          className="left-tab-div"
          style={{ overflowX: "hidden", overflowY: "auto" }}
        >
          {Object.keys(dom).map(function (key, index) {
            return (
              <Tab>
                <p>
                  {key === "tech"
                    ? "Technical"
                    : key === "corp"
                    ? "Corporate"
                    : key === "creat"
                    ? "Creatives"
                    : "Instructions"}
                </p>
              </Tab>
            );
          })}
        </TabList>
        {Object.keys(dom).map(function (key, index) {
          if (dom[key][0] === "web" && key === "tech") {
            return (
              <TabPanel style={{ overflowX: "hidden", overflowY: "auto" }}>
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
                                padding: "25px",
                              }}
                            >
                              <h3 className="instructions mb-0">
                                Task for Web development(1st Year):
                              </h3>
                              <div className="list-items-div mt-4">
                                <li className="list-indiv-item text-left">
                                  1. Make a portfolio website
                                </li>
                                <li className="list-indiv-item text-left">
                                  2. Try to recreate codechefs website
                                </li>
                                <li className="list-indiv-item text-left">
                                  3. Making use of the Rest principles make a
                                  simple API for library management (best if
                                  deployed).
                                </li>
                              </div>
                            </ul>

                            <ul
                              className="mb-0 mt-3 px-4"
                              style={{
                                borderRadius: "5px",
                                backgroundColor: "#222327",
                                padding: "25px",
                              }}
                            >
                              <h3 className="instructions mb-0">
                                Task for Web development(2nd Year):
                              </h3>
                              <div className="list-items-div mt-4">
                                <li className="list-indiv-item text-left">
                                  1. What are methods of authentication you use
                                  for your application (In layman terms how do
                                  you implement your login and register routes
                                  and protect your routes), make a basic web
                                  application to demonstrate the same.
                                </li>
                                <li className="list-indiv-item text-left">
                                  2. Design a web application to replicate an
                                  online image viewer (google photos just the
                                  design)
                                </li>
                              </div>
                            </ul>
                          </div>
                          <div class="field">
                            <label for="github">Github url</label>
                            <input
                              type="text"
                              name="github"
                              placeholder="https://www.github.com/sorting-visualizer"
                              id="github"
                              onChange={(e) => setTech(e.target.value)}
                              value={tech}
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
                                onClick={(e) =>
                                  handleOnSubmit(e, "tech", "web", tech)
                                }
                              >
                                Submit
                              </button>
                            </li>
                            <li>
                              {" "}
                              <button
                                style={{ textDecoration: "none" }}
                                type="button"
                                onClick={logout}
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
          if (dom[key][0] === "app") {
            return (
              <TabPanel style={{ overflowX: "hidden", overflowY: "auto" }}>
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
                                padding: "25px",
                              }}
                            >
                              <h3 className="instructions mb-0">
                                Task for App development(1st Year):Quiz
                                Application
                              </h3>
                              <div className="list-items-div mt-4">
                                <li className="list-indiv-item text-left">
                                  1. Include a beautiful UI interface.
                                </li>
                                <li className="list-indiv-item text-left">
                                  2. Include at least 7 questions in the
                                  application.
                                </li>
                                <li className="list-indiv-item text-left">
                                  3. Pick questions at random.
                                </li>
                                <li className="list-indiv-item text-left">
                                  4. Have at least 2 types of quizzes.
                                </li>
                                <li className="list-indiv-item text-left">
                                  5. Get creative
                                </li>
                              </div>
                            </ul>
                            <ul
                              className="mb-0 mt-3 px-4"
                              style={{
                                borderRadius: "5px",
                                backgroundColor: "#222327",
                                padding: "25px",
                              }}
                            >
                              <h3 className="instructions mb-0">
                                Task for App development(2nd Year):OTT Platform
                              </h3>
                              <div className="list-items-div mt-4">
                                <li className="list-indiv-item text-left">
                                  1. Include a beautiful UI interface.
                                </li>
                                <li className="list-indiv-item text-left">
                                  2. Include at least 7 videos to view.
                                </li>
                                <li className="list-indiv-item text-left">
                                  3. Create genre specific pages.
                                </li>
                                <li className="list-indiv-item text-left">
                                  4. Have at least 2 types of videos in each
                                  genre
                                </li>
                                <li className="list-indiv-item text-left">
                                  5. Get creative
                                </li>
                              </div>
                            </ul>
                          </div>
                          <div class="field">
                            <label for="github">Github url</label>
                            <input
                              type="text"
                              name="github"
                              placeholder="https://www.github.com/sorting-visualizer"
                              id="github"
                              onChange={(e) => setTech(e.target.value)}
                              value={tech}
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
                                onClick={(e) =>
                                  handleOnSubmit(e, "tech", "app", tech)
                                }
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
                                onClick={logout}
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

          if (dom[key][0] === "cp") {
            return (
              <TabPanel style={{ overflowX: "hidden", overflowY: "auto" }}>
                <div className="panel-content">
                  <section id="contact">
                    <section className="left-cons">
                      <form>
                        <div class="fields">
                          <div class="field">
                            <h3 className="instructions mb-0">
                              Task for Competitive Programming
                            </h3>
                            <ul
                              className="mb-0 mt-3 px-4"
                              style={{
                                borderRadius: "5px",
                                backgroundColor: "#222327",
                                padding: "25px",
                              }}
                            >
                              <a
                                href="https://drive.google.com/file/d/1LxZN7GaXLDDlAOUl0AYp3wLG77dP5V97/view?usp=sharing"
                                className="list-indiv-item mb-0"
                              >
                                https://drive.google.com/file/d/1LxZN7GaXLDDlAOUl0AYp3wLG77dP5V97/view?usp=sharing
                              </a>
                            </ul>
                          </div>
                        </div>
                        <div class="field">
                          <label for="url">Link</label>
                          <input
                            type="text"
                            name="url"
                            placeholder="Link"
                            id="url"
                            onChange={(e) => setTech(e.target.value)}
                            value={tech}
                            required
                          ></input>
                        </div>
                        <br></br>
                        {/* <ReCAPTCHA ref={reRef} sitekey={key} size="invisible" /> */}
                        <div className="btn-div">
                          <ul class="actions">
                            <li className="li-btn">
                              <button
                                type="submit"
                                class="primary-btn"
                                id="submit"
                                onClick={(e) =>
                                  handleOnSubmit(e, "tech", "cp", tech)
                                }
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
                                onClick={logout}
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

          if (dom[key][0] === "gd") {
            return (
              <TabPanel style={{ overflowX: "hidden", overflowY: "auto" }}>
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
                                padding: "25px",
                              }}
                            >
                              <h3 className="instructions mb-0">
                                Graphic Designing: Complete at least one of the
                                given following tasks. Upload all the final file
                                and also the used elements in a drive link and
                                submit the link.
                              </h3>
                              <div className="list-items-div mt-4">
                                <li className="list-indiv-item text-left">
                                  1. Design a logo for an upcoming hackathon
                                  event of Codechef SRM Ktr Chapter.
                                </li>
                                <li className="list-indiv-item text-left">
                                  2. Recreate “A Pinch of Code” poster available
                                  on the timeline of Codechef SRM. Link to the
                                  post:{" "}
                                  <a
                                    href="https://www.instagram.com/p/B3TvCnvn12v/
"
                                  >
                                    https://www.instagram.com/p/B3TvCnvn12v/
                                  </a>
                                </li>
                                <li className="list-indiv-item text-left">
                                  3. Create a typography for the phrase
                                  “#ONBOARD CCSC” in Adobe Illustrator and
                                  submit its AI file.
                                </li>
                                <li className="list-indiv-item text-left">
                                  4. Do illustrations of any squid game
                                  character but use yellow-black color theme
                                  instead of the pink-black one.
                                </li>
                              </div>
                            </ul>
                          </div>
                          <div class="field">
                            <label for="url">Link</label>
                            <input
                              type="text"
                              name="url"
                              placeholder="https://www.github.com/sorting-visualizer"
                              id="url"
                              onChange={(e) => setCreat(e.target.value)}
                              value={creat}
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
                                onClick={(e) =>
                                  handleOnSubmit(e, "creat", "gd", creat)
                                }
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
                                onClick={logout}
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
          if (dom[key][0] === "edi") {
            return (
              <TabPanel style={{ overflowX: "hidden", overflowY: "auto" }}>
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
                                padding: "25px",
                              }}
                            >
                              <h3 className="instructions mb-0">
                                Content Writing:
                              </h3>
                              <div className="list-items-div mt-4">
                                <li className="list-indiv-item text-left">
                                  1. There is an event coming up and we have to
                                  take permission from the dean, so draft a
                                  letter addressing it to the dean asking for
                                  permission to hold the event with the details
                                  such as venue and time.
                                </li>
                                <li className="list-indiv-item text-left">
                                  2. A hackathon is coming up, so prepare a
                                  caption for the hackathon's poster.
                                </li>
                                <li className="list-indiv-item text-left">
                                  3. Briefly write down the necessary details
                                  needed during an event.
                                </li>
                              </div>
                            </ul>
                          </div>
                          <div class="field">
                            <label for="github">Link</label>
                            <input
                              type="text"
                              name="github"
                              placeholder="post your link here"
                              id="github"
                              onChange={(e) => setCreat(e.target.value)}
                              value={creat}
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
                                onClick={(e) =>
                                  handleOnSubmit(e, "creat", "edi", creat)
                                }
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
                                onClick={logout}
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

          if (dom[key][0] === "vid") {
            return (
              <TabPanel style={{ overflowX: "hidden", overflowY: "auto" }}>
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
                                padding: "25px",
                              }}
                            >
                              <h3 className="instructions mb-0">
                                Task for Video Editing:
                              </h3>
                              <div className="list-items-div mt-4">
                                <li className="list-indiv-item text-left">
                                  1. Create a 30 sec instagram reel based on the
                                  topic of your choice.
                                </li>
                                <li className="list-indiv-item text-left">
                                  2. Create an instagram story based on
                                  Halloween theme / diwali theme.
                                </li>
                                <li className="list-indiv-item text-left">
                                  3. Make a reel on any Webseries/movie of your
                                  choice. Use appropriate transitions, effects,
                                  motion graphics etc. You will marked based on
                                  your creativity.
                                </li>
                                <li className="list-indiv-item text-left">
                                  4. Use any predesigned template and make an
                                  insta reel of topic of your choice.
                                  (30sec-1minute)
                                </li>
                              </div>
                            </ul>
                          </div>
                          <div class="field">
                            <label for="github">Link</label>
                            <input
                              type="text"
                              name="github"
                              placeholder="url"
                              id="github"
                              onChange={(e) => setCreat(e.target.value)}
                              value={creat}
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
                                onClick={(e) =>
                                  handleOnSubmit(e, "creat", "vid", creat)
                                }
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
                                onClick={logout}
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

          if (dom[key][0] === "ui") {
            return (
              <TabPanel style={{ overflowX: "hidden", overflowY: "auto" }}>
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
                                padding: "25px",
                              }}
                            >
                              <h3 className="instructions mb-0">
                                Task for UI/UX:
                              </h3>
                              <div className="list-items-div mt-4">
                                <li className="list-indiv-item text-left">
                                  1. Design a landing page for a programming
                                  contest / event webpage with proper fonts and
                                  ui components based on the theme of your
                                  choice.
                                </li>
                                <li className="list-indiv-item text-left">
                                  2. Design webform ui for a user input form
                                  into event registration,implement UX in form
                                  to make users comfortable filling the form.
                                </li>
                                <li className="list-indiv-item text-left">
                                  3. Create a dashboard UI for any one of these
                                  <ul>
                                    <li>
                                      Web portal for community events
                                      (Ex:programming events,tech talks,coding
                                      contests etc..)
                                    </li>
                                    <li>Event statistics display webpage</li>
                                    <li>
                                      List of upcoming, ongoing and past events
                                      ,with images(posters or related images).
                                    </li>
                                  </ul>
                                </li>
                              </div>
                            </ul>
                          </div>
                          <div class="field">
                            <label for="github">Link</label>
                            <input
                              type="text"
                              name="github"
                              placeholder="url"
                              id="github"
                              onChange={(e) => setCreat(e.target.value)}
                              value={creat}
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
                                onClick={(e) =>
                                  handleOnSubmit(e, "creat", "ui", creat)
                                }
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
                                onClick={logout}
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

          if (dom[key][0] === "manage") {
            return (
              <TabPanel style={{ overflowX: "hidden", overflowY: "auto" }}>
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
                                padding: "25px",
                              }}
                            >
                              <h3 className="instructions mb-0">
                                Task for Management:
                              </h3>
                              <p>
                                *4 questions will be given in total to each sub
                                domain applicant . 2 questions are compulsory 2
                                are optional.
                              </p>
                              <div className="list-items-div mt-4">
                                <li className="list-indiv-item text-left">
                                  1. What if the speaker (or guest) arrives late
                                  to the venue, how are you going to handle the
                                  audience for the time being?
                                </li>
                                <li className="list-indiv-item text-left">
                                  2. Plan an online/offline event for a
                                  technical event .
                                </li>
                                <li className="list-indiv-item text-left">
                                  3. List out different social media strategies
                                  that can maximise our reach .
                                </li>
                                <li className="list-indiv-item text-left">
                                  4. How will you segregate the work into
                                  different domains ?
                                </li>
                              </div>
                            </ul>
                          </div>
                          <div class="field">
                            <label for="link">Link</label>
                            <input
                              type="text"
                              name="link"
                              placeholder="url"
                              id="link"
                              onChange={(e) => setCorp(e.target.value)}
                              value={corp}
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
                                onClick={(e) =>
                                  handleOnSubmit(e, "corp", "manage", corp)
                                }
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
                                onClick={logout}
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
          if (dom[key][0] === "spon") {
            return (
              <TabPanel style={{ overflowX: "hidden", overflowY: "auto" }}>
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
                                padding: "25px",
                              }}
                            >
                              <h3 className="instructions mb-0">
                                Task for sponsorship:
                              </h3>
                              <div className="list-items-div mt-4">
                                <li className="list-indiv-item text-left">
                                  1. Key Differences between sponsorship
                                  collaboration and partnership.
                                </li>
                                <li className="list-indiv-item text-left">
                                  2. How will you segregate sponsors for
                                  technical and non-technical?
                                </li>
                                <li className="list-indiv-item text-left">
                                  3. List our 3 sponsors with their proper
                                  contact details for an event . Give reason for
                                  your choice.
                                </li>
                                <li className="list-indiv-item text-left">
                                  4. If a sponsor backs out at the last moment
                                  what will you do ?
                                </li>
                              </div>
                            </ul>
                          </div>
                          <div class="field">
                            <label for="github">Link</label>
                            <input
                              type="text"
                              name="github"
                              placeholder="url"
                              id="github"
                              onChange={(e) => setCorp(e.target.value)}
                              value={corp}
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
                                onClick={(e) =>
                                  handleOnSubmit(e, "corp", "spon", corp)
                                }
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
                                onClick={logout}
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
          if (dom[key][0] === "Instructions") {
            return (
              <TabPanel style={{ overflowX: "hidden", overflowY: "auto" }}>
                <div className="panel-content">
                  <section id="contact">
                    <section className="left-cons">
                      <div class="fields">
                        <div class="field">
                          <ul
                            className="mb-0 mt-3 px-4"
                            style={{
                              borderRadius: "5px",
                              backgroundColor: "#222327",
                              padding: "25px",
                            }}
                          >
                            <h3
                              className="instructions mb-0"
                              style={{ textDecoration: "underline" }}
                            >
                              General Instructions:
                            </h3>
                            <div className="list-items-div mt-4">
                              <li className="list-indiv-item text-left">
                                1. Only one link to be provided for each task in
                                the respective domain .
                                <ul>
                                  <li>Technical - GitHub link</li>
                                  <li>Corporate - GoogleDocument Link</li>
                                  <li>Creative - Google Drive Link</li>
                                </ul>
                              </li>
                              <li className="list-indiv-item text-left">
                                2. Ensure that the links provided is public
                                .Access should be given . Any document with the
                                private link ,will be rejected automatically
                              </li>
                              <li className="list-indiv-item text-left">
                                3. Make sure the name of the google document and
                                the google drive provided is named after your
                                name and make sure to include your registration
                                number.
                              </li>
                              <li className="list-indiv-item text-left">
                                4. The link of the document is to be put in the
                                input box provided.
                              </li>
                              <li className="list-indiv-item text-left">
                                5. Plagiarism is strictly prohibited.If any kind
                                of plagiarized content is found in the submitted
                                work it will lead to disqualification
                              </li>
                              <li className="list-indiv-item text-left">
                                6. Make sure all the tasks are completed before
                                the deadline .
                              </li>
                            </div>
                          </ul>

                          <ul
                            className="mb-0 mt-3 px-4"
                            style={{
                              borderRadius: "5px",
                              backgroundColor: "#222327",
                              padding: "25px",
                            }}
                          >
                            <h3
                              className="instructions mb-0"
                              style={{ textDecoration: "underline" }}
                            >
                              Technical Instructions
                            </h3>
                            <div className="list-items-div mt-4">
                              <li className="list-indiv-item text-left">
                                1. Web Development :
                                <ul>
                                  <li>
                                    1st Year : Out of the three given tasks, 1
                                    has to be completed.
                                  </li>
                                  <li>
                                    2nd Year : Out of the two given tasks at
                                    least 1 task completion is mandatory.{" "}
                                  </li>
                                </ul>
                              </li>
                              <li className="list-indiv-item text-left">
                                2. App Development : For the first and second
                                year , only one task has been assigned and it is
                                mandatory to complete it
                                <ul>
                                  <li>
                                    Make sure all the specifications mentioned
                                    under the task are present in your
                                    submission
                                  </li>
                                </ul>
                              </li>
                              <li className="list-indiv-item text-left"></li>
                            </div>
                          </ul>
                          <ul
                            className="mb-0 mt-3 px-4"
                            style={{
                              borderRadius: "5px",
                              backgroundColor: "#222327",
                              padding: "25px",
                            }}
                          >
                            <h3
                              className="instructions mb-0"
                              style={{ textDecoration: "underline" }}
                            >
                              Non-Tech Instructions:
                            </h3>
                            <div className="list-items-div mt-4">
                              <li className="list-indiv-item text-left">
                                1. Corporate
                                <ul>
                                  <li>
                                    4 tasks are given in total to each sub
                                    domain applicant . 2 tasks are compulsory 2
                                    are optional
                                  </li>
                                  <li>
                                    Both the task need to be done in the same
                                    document.{" "}
                                  </li>
                                </ul>
                              </li>
                              <li className="list-indiv-item text-left">
                                2. Creatives : Complete at least one of the
                                given tasks for each subdomain.
                              </li>
                            </div>
                          </ul>
                        </div>
                      </div>
                    </section>
                  </section>
                </div>
              </TabPanel>
            );
          } else {
            return <div>nothing</div>;
          }
        })}
      </Tabs>
    </div>
  );
}

export default Phase;
