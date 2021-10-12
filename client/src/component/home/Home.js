import React from "react";
import "./Home.css";
import image from "./Abc-min-min-min.png";
import image1 from "./Doll1.png";

import Navbar from "../navbar/Navbar";

function Home() {
  return (
    <>
      <div id="home-link" className="wrap">
        <Navbar />

        <section
          className="home d-flex align-items-center"
          data-scroll-index="0"
          id="home"
        >
          <div className="container">
            <div className="row align-items-center flex-md-row flex-column-reverse">
              <div className="col-md-7">
                <div className="home-text">
                  <h1>
                    #Onboard <span>CCSC</span>
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Totam ipsum nulla officiis officia porro accusamus in quia
                    aperiam omnis eum fugiat velit ratione ducimus ad commodi
                    neque, hic, esse, suscipit consectetur. At repudiandae iusto
                    hic, aut vitae cum inventore quidem?
                  </p>
                  <div className="home-btn">
                    <a href="/signup" className="btn btn-1">
                      Register Now
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-5 text-center">
                <div className="home-img section-padding">
                  <img src={image} alt="squid_pic" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="section-padding" id="Domain" data-scroll-index="1">
        <div className="events">
          <div
            className="container"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="row section-padding d-flex justify-content-center">
              <div className="col-12">
                <div className="section-title text-center">
                  <h2>
                    Our<span>&nbsp;Domains</span>
                  </h2>
                </div>
              </div>

              <div
                className="col-lg-4 spacing justify-content-center d-flex align-items-stretch mb-5 mb-lg-0"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="eventitem text-center">
                  <i className="fas fa-cog"></i>
                  <h3>Technical</h3>
                  <p>
                    “Programmer” – An organism that turns caffeine into
                    software. With CodeChef SRM, get a chance to expand your
                    boundaries and learn to code no matter what your career
                    ambitions are.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-4 spacing justify-content-center d-flex align-items-stretch mb-5 mb-lg-0"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="eventitem text-center">
                  <i className="fas fa-paint-brush"></i>
                  <h3>Creative</h3>
                  <p>
                    Design is in everything we make, but it’s also between those
                    things. It’s a mix of craft, science, storytelling and
                    philosophy. With CodeChef SRM, use what you have and do what
                    you can.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-4 spacing justify-content-center d-flex align-items-stretch mb-5 mb-lg-0"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="eventitem text-center">
                  <i className="fas fa-suitcase"></i>
                  <h3>Corporate</h3>
                  <p>
                    The corporate world has the resources to improve the world.
                    It's where people live and work. With CodeChef SRM, explore
                    the power to connect the seemingly unconnected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="fun-facts section-padding"
        id="About"
        data-scroll-index="2"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-5 d-flex align-items-center justify-content-center">
              <div className="fun-facts-img">
                <img src={image1} alt="fun fact img" />
              </div>
            </div>
            <div className="col-lg-6 col-md-7">
              <div className="section-title">
                <h2>
                  About<span>&nbsp;Us</span>
                </h2>
              </div>
              <div className="fun-fact-text">
                <p>
                  CodeChef SRM KTR Chapter is officially the Star College
                  Chapter of CodeChef, a non-profit educational initiative of
                  Unacademy. The club is dedicated to motivate SRM students to
                  indulge their maximum time in competitive and advanced coding
                </p>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="fun-facts-item style-1">
                      <h3>90+</h3>
                      <span>Chefs</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="fun-facts-item style-2">
                      <h3>200+</h3>
                      <span>Team Meets</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="fun-facts-item style-3">
                      <h3>5000 +</h3>
                      <span>Event Registrations</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="fun-facts-item style-4">
                      <h3>20+</h3>
                      <span>Speakers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="how-it-work section-padding"
        id="Phase"
        data-scroll-index="3"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title">
                <h2>
                  How it <span>works</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="how-it-work-item line-right">
                <div className="step">1</div>
                <h3>Registration</h3>
                <p>
                  “In Here, I Stand A Chance At Least. But Out There I've got
                  Nothing.” Get yourself on board the game. Smash the
                  registration link!
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="how-it-work-item line-right">
                <div className="step">2</div>
                <h3>Task Submission</h3>
                <p>
                  “Doing something is always more fun than just watching.”
                  Domain related tasks will prove your competency to withstand!
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="how-it-work-item line-right">
                <div className="step">3</div>
                <h3>Interview</h3>
                <p>
                  “Taking one little step at a time, you have reached the final
                  stage.” Technicalities checked. Practicalities to be
                  discussed!
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="how-it-work-item">
                <div className="step">4</div>
                <h3>Results</h3>
                <p>
                  “I’m alive right now because I tried hard to stay alive.” That
                  was as intense the real squid game. Welcome to the team chef!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq section-padding" id="FAQs" data-scroll-index="4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title">
                <h2>
                  {" "}
                  Frequently <span>asked</span> qureies
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div id="accordion">
                <div className="accordion-item">
                  <div
                    className="accordion-header"
                    data-toggle="collapse"
                    data-target="#collapse-01"
                  >
                    <h3>What can a new recruit expect from the club? </h3>
                  </div>
                  <div
                    className="collapse show"
                    id="collapse-01"
                    data-parent="#accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        You can expect a little work, an amazing bunch of
                        seniors and batchmates, a lot of fun and a zeal to learn
                        a lot of new things.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div
                    className="accordion-header collapsed"
                    data-toggle="collapse"
                    data-target="#collapse-02"
                  >
                    <h3>
                      Do we need basic coding knowledge to be a part of the
                      technical domain?
                    </h3>
                  </div>
                  <div
                    className="collapse"
                    id="collapse-02"
                    data-parent="#accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        Yes, beginner level knowledge in coding is a must to be
                        a part of the technical domain.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div
                    className="accordion-header collapsed"
                    data-toggle="collapse"
                    data-target="#collapse-03"
                  >
                    <h3>
                      Can I apply in the club if I don't know programming?
                    </h3>
                  </div>
                  <div
                    className="collapse"
                    id="collapse-03"
                    data-parent="#accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        Yes you can also apply to Non-Tech doamins like Creative
                        and Corporate depending on your interest.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div
                    className="accordion-header collapsed"
                    data-toggle="collapse"
                    data-target="#collapse-04"
                  >
                    <h3>
                      Can I work for different domains of the club too,
                      otherthan my primary domain?
                    </h3>
                  </div>
                  <div
                    className="collapse"
                    id="collapse-04"
                    data-parent="#accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        Yes the club is very flexible when it comes to work
                        culture. You can also contribute to other domains
                        depending on your skills, after informing your Domain
                        Leads.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-5 pt-5 pb-5 footer" id="Reach" data-scroll-index="5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title">
                <h2>
                  Reach<span>Out</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-7 col-xs-12 about-company">
              <h3>CodeChef SRM KTR Chapter</h3>
              <p className="pr-5 text-white-50">
                CCSC, an initiative for the students who are enthusiastic about
                coding. Our M.O. is to Learn and Teach.
              </p>
              <p>
                <a href="https://www.facebook.com/CodeChefSRM/">
                  <i className="fab fa-facebook-square"></i>
                </a>
                <a href="https://www.instagram.com/codechefsrm/">
                  <i className="fab fa-instagram-square"></i>
                </a>
                <a href="https://www.linkedin.com/company/ccscsrm/mycompany">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="mailto:codechefsrm@gmail.com">
                  <i className="fas fa-envelope-square"></i>
                </a>
              </p>
            </div>

            <div className="col-lg-5 col-xs-12 location">
              <h4 className="mt-lg-0 mt-sm-4">Location</h4>
              <p>SRMIST Kattankulathur, Chennai</p>
              <p className="mb-1">
                <a href="tel:+91 7668467906">
                  <i className="fas fa-phone"></i>Harshita Mathur&nbsp; (Team
                  President)
                </a>
              </p>
              <p className="mb-1">
                <a href="tel:+91 80829 27210">
                  <i className="fas fa-phone"></i>Mimansa Sharma&nbsp; (Team
                  Secretary)
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col copyright">
            <p style={{ textAlign: "center", marginTop: "5px" }}>
              <small className="text-white-50">
                Codechef SRM KTR Chapter © All Rights Reserved.
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
