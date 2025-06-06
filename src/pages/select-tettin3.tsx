import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const SelectTettin3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const id = query.get("id") || "me";
  const name = query.get("name") || "まっつんくん";
  const die = query.get("die") || "500";
  const rate = query.get("rate") || "500";

  const [step, setStep] = useState(0); // 0: 色設定, 1: テキスト設定
  const [colorStage, setColorStage] = useState(0); // 0~3
  const [player, setPlayer] = useState("blue");
  const [enemy, setEnemy] = useState("green");
  const [beam, setBeam] = useState("red");
  const [back, setBack] = useState("black");

  const [win, setWin] = useState("Game Clear");
  const [lose, setLose] = useState("Game Over");

  const colorOptions = ["pink", "blue", "green", "yellow", "black","orange"];
  const labels = ["プレイヤーの色", "敵の色", "ビームの色", "背景の色"];

  const handleColorSelect = (color: string) => {
    if (colorStage === 0) setPlayer(color);
    else if (colorStage === 1) setEnemy(color);
    else if (colorStage === 2) setBeam(color);
    else if (colorStage === 3) setBack(color);
  };

  const goToNextStage = () => {
    if (colorStage < 3) {
      setColorStage(colorStage + 1);
    } else {
      setStep(1);
    }
  };

  const handleFinish = () => {
    navigate(
      `/programTettin?id=me4&name=${name}&die=${die}&rate=${rate}&player=${player}&enemy=${enemy}&beam=${beam}&back=${back}&win=${encodeURIComponent(
        win
      )}&lose=${encodeURIComponent(lose)}`
    );
  };

  return (
    <div className="first-story-container">
      {/* キャラクター画像表示エリア */}
      <div className="characters-container">
        <div className="character-left active">
          <img src="/girl.png" alt="女の子キャラクター" />
        </div>
        <div className="character-right inactive">
          <img src="/boy.png" alt="男の子キャラクター" />
        </div>
      </div>

      <div className="story-box" style={{ textAlign: 'center' }}>
        {step === 0 && (
          <>
            <div className="speaker-name">キャラクターA</div>
            <p>最後の仕上げだよ！{labels[colorStage]}を選んでね！</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              {colorOptions.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  style={{
                    backgroundColor: color,
                    color: color === "black" ? "white" : "black",
                    margin: "5px",
                    padding: "10px 20px",
                    border:
                      (colorStage === 0 && player === color) ||
                      (colorStage === 1 && enemy === color) ||
                      (colorStage === 2 && beam === color) ||
                      (colorStage === 3 && back === color)
                        ? "4px solid white"
                        : "2px solid transparent",
                    boxShadow:
                      (colorStage === 0 && player === color) ||
                      (colorStage === 1 && enemy === color) ||
                      (colorStage === 2 && beam === color) ||
                      (colorStage === 3 && back === color)
                        ? "0 0 10px 2px white"
                        : "none",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    minWidth: "80px"
                  }}
                >
                  {color}
                </button>
              ))}
            </div>
            <button className="start-button" style={{ marginTop: "20px" }} onClick={goToNextStage}>
              {colorStage < 3 ? "次へ" : "テキスト設定へ進む"}
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <div className="speaker-name">キャラクターA</div>
            <p>🎉 勝利＆敗北メッセージを決めよう！</p>
            <div style={{ marginTop: "15px" }}>
              <label>勝利メッセージ：</label><br />
              <input
                type="text"
                value={win}
                onChange={(e) => setWin(e.target.value)}
                style={{ fontSize: "1em", padding: "10px", width: "80%" }}
              />
            </div>
            <div style={{ marginTop: "15px" }}>
              <label>敗北メッセージ：</label><br />
              <input
                type="text"
                value={lose}
                onChange={(e) => setLose(e.target.value)}
                style={{ fontSize: "1em", padding: "10px", width: "80%" }}
              />
            </div>
            <button className="start-button" style={{ marginTop: "30px" }} onClick={handleFinish}>
              🚀 ゲームを完成させる！
            </button>
          </>
        )}
      </div>
    </div>
  );
};