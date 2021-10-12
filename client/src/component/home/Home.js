import React from "react";
import "./Home.css";
import image from "./Abc.png";
import Navbar from "../navbar/Navbar";


function Home() {
  return (
    <div id='home-link' class="wrap">
     <Navbar />
      <section
        class="home d-flex align-items-center"
        data-scroll-index="0"
        id="home"
      >
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-7">
              <div class="home-text">
                <h1>Lorem ipsum dolor </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                  ipsum nulla officiis officia porro accusamus in quia aperiam
                  omnis eum fugiat velit ratione ducimus ad commodi neque, hic,
                  esse, suscipit consectetur. At repudiandae iusto hic, aut
                  vitae cum inventore quidem?
                </p>
                <div class="home-btn">
                  <a href="/signup" class="btn btn-1">
                    Register Now
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-5 text-center">
              <div class="home-img section-padding">
                <img src={image} alt="arushi_pic"></img>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
