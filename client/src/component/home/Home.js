import React from "react";
import "./Home.css";
import image from "./Abc.png";
import image1 from "./Artboard 1.png";

function Home() {
  return (
    <div class="wrap">
      <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
          <a class="navbar-brand" href="/">
            <img src={image1} width="50" alt="squid" height="50" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto mr-auto">
              <li class="nav-item">
                <a class="nav-link active" data-scroll-nav="0" href="#home">
                  <span style={{ color: "#ffffff" }}>Home</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-scroll-nav="1" href="#feat">
                  <span style={{ color: "#ffffff" }}>Features</span>
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link" data-scroll-nav="2" href="#feat">
                  <span style={{ color: "#ffffff" }}>Facts</span>
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link" data-scroll-nav="2" href="#Testimonials">
                  <span style={{ color: "#ffffff" }}>Testimonials</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-scroll-nav="3" href="#Pricing">
                  <span style={{ color: "#ffffff" }}>Pricing</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-scroll-nav="4" href="#Contact">
                  <span style={{ color: "#ffffff" }}>Contact</span>
                </a>
              </li>
            </ul>

            <li>
              <a href="/login" class="btn btn-2  button-spacing">
                Get Started
              </a>
            </li>
          </div>
        </div>
      </nav>

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
