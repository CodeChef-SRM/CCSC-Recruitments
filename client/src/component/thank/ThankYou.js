import React from "react";
import "./Thank.css";
import NavAfter from "../navAfter/NavAfter";
function ThankYou() {
  return (
    <>
      <NavAfter />
      <br />
      <br />
      <div className="thankyou-main">
        <h6 className="thankyou-heading">THANKYOU FOR REGISTERING</h6>
        <lottie-player
          src="https://assets8.lottiefiles.com/packages/lf20_846siclb.json"
          background="transparent"
          speed="1"
          style={{
            width: "300px",
            height: "300px",
            display: "inline",
            margin: "auto",
          }}
          loop
          autoplay
        ></lottie-player>
        <h3 className="thankyou-text">
          check your email for conformation mail
        </h3>
      </div>
    </>
  );
}

export default ThankYou;
