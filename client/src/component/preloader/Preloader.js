import React from "react";

function Preloader() {
  return (
    <div
      style={{
        margin: "0",
        padding: "0",
        objectFit: "contain",
        backgroundColor: "black",
      }}
    >
      {/* <iframe
        src="https://embed.lottiefiles.com/animation/79181"
        title="ifr"
        style={{ height: "10vh", width: "100vw", overflow: "hidden" }}
      ></iframe> */}
      <lottie-player
        src="https://assets2.lottiefiles.com/packages/lf20_2khcyazm.json"
        background="transparent"
        speed="1"
        style={{ width: "100vw", height: "100vh" }}
        loop
        autoplay
      ></lottie-player>
    </div>
  );
}

export default Preloader;
