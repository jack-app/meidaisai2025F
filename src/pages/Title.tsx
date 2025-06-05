import React from "react";
import "./LogoWithEffect.css"; 



const LogoWithEffect: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "400px",
        height: "200px",
        overflow: "hidden",
        backgroundColor: "#edfbd8", // 任意の背景色
        borderRadius: "20px",
      }}
    >
      <h1
        style={{
          position: "absolute",
          zIndex: 1,
          width: "100%",
          textAlign: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#13d2eb",
          pointerEvents: "none",
        }}
      >
        a
      </h1>

      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <source src="/logo.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LogoWithEffect;