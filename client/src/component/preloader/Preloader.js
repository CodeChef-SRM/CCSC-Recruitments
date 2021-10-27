import React from "react";

function Preloader() {
  return (
    <div
      style={{
        margin: "0",
        padding: "0",
        objectFit: "contain",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
      }}
    >
      <iframe
        src="https://embed.lottiefiles.com/animation/79181"
        title="ifr"
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          backgroundColor: "black",
          border: "none",
        }}
      ></iframe>
      {/* <lottie-player
        src="https://assets2.lottiefiles.com/packages/lf20_2khcyazm.json"
        background="transparent"
        speed="1"
        style={{ objectFit: "contain", width: "100vw", height: "100vh" }}
        loop
        autoplay
      ></lottie-player> */}
    </div>
  );
}

export default Preloader;
