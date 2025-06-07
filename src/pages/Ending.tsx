import React from "react";
import './css/magic-game.css';
import { useNavigate } from "react-router-dom";
import './css/Button-magicgame.css';

export const Ending = () => {
  const navigate = useNavigate();

  return (
    <div className="ending" style={{ minHeight: "100vh", position: "relative" }}>
      <h1
        style={{
          color: "#fff",
          fontSize: "4em",
          textShadow: "2px 2px 8px #000, 0 0 20px #ff9800",
          fontWeight: "bold",
          letterSpacing: "0.1em",
          background: "rgba(0,0,0,0.3)",
          borderRadius: "16px",
          padding: "0.5em 2em",
        }}
      >
        ポーション完成！
        <br />
        さて、飲む？飲まない？どうする？
      </h1>
      <button
        className="ending-button"
        style={{
          position: "fixed",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
        onClick={() => navigate("/")}
      >
        ゲーム選択へ
      </button>
    </div>
  );
};

export default Ending;