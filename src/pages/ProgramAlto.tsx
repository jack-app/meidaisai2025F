import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import './css/program-alto.css'; // スタイルシートをインポート
import tokeiImage from '../images/tokei.jpg';

export const ProgramAlto = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const name = query.get("name");

  const screenOrder = ["start-screen", "article-screen", "choice-screen", "result-screen", "game-over"];
  const [currentScreen, setCurrentScreen] = useState("start-screen");
  const [countdown, setCountdown] = useState(20); // カウントダウンの初期値

  function showScreen(screenId: string) {
    setCurrentScreen(screenId);
    if (screenId === "article-screen") {
      setCountdown(20); // 記事画面に移動したらカウントダウンをリセット
    }
  }

  // 記事画面でカウントダウンを開始
  useEffect(() => {
    if (currentScreen === "article-screen") {
      const interval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      const timeout = setTimeout(() => {
        showScreen("choice-screen");
      }, 20000);

        // 🔊 3秒前に効果音を鳴らす
    if (countdown === 3) {
      const warningSound = new Audio("/sounds/warning.mp3");
      warningSound.volume = 1.0; // 🔹 音量を最大に
      warningSound.play().catch(error => console.error("音声の再生に失敗しました:", error));
    }



      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [currentScreen]);

  return (
    <>
     <style>
  {`
    body {
      font-family: "Poppins", sans-serif;
      background:white;
      color: #444;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }

    .screen {
      display: none;
    }

    .screen.active {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 120%;
      max-width: 700px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 15px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
      text-align: center;
    }

    h1 {
      font-size: 2rem;
      color:#FFBBCF
      margin-bottom: 15px;
    }

    p {
      font-size: 1.2rem;
      color: #555;
    }

    button {
      background:#D5C7B8;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 20px;
      font-size: 1rem;
      cursor: pointer;
      transition: 0.3s;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    }

    button:hover {
      background: #ff85a2;
      transform: scale(1.05);
    }

    .countdown-timer {
      position: absolute;
      top: 10px;
      right: 20px;
      font-size: 1.5rem;
      font-weight: bold;
      color: #ff6f61;
      background: rgba(255, 255, 255, 0.5);
      padding: 5px 10px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  `}
</style>

<style>
  {`
    .start-screen h1 {
      font-size: 3.0rem;
      font-weight: bold;
      text-align: center;
      background: linear-gradient(90deg, #ff91a4, #ffccf9, #a0e7e5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: fadeIn 2s ease-in-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
      

    @keyframes bubbleFloat {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px);
  }
}
  .game-rules{
  font-size:1rem;
  color:#555;
  background:rgba(255,255,255,0.8);
  padding:15px;
  border-radius:10px;
  box-shadow:0 3px 6px rgba(0,0,0,0.3);
  text-align: left;
  maw-width: 400px;
  margin: 20px auto;
  }


  `}
</style>
    
<style>
  {`
    .news-container {
      position:fixed;
      top:0;
      left:0;
      right:0;
      width:100vw;
      height:100vh;
      background: #fff;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      font-family: "Times New Roman", serif;
      max-width: 800px;
      margin: auto;
      border: 1px solid #ddd;
    }

    .news-header {
      text-align: center;
      border-bottom: 3px solid #333;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }

    .news-header h1 {
      font-size: 2rem;
      color: #222;
    }

    .news-header p {
      font-size: 1rem;
      color: #555;
    }

    
    .news-content {
      display: flex;
      flex-direction: row;
      gap: 20px;
    }

    .news-image {
      flex: 1;
    }

    .news-image img {
      height: 30vh;
      border-radius: 8px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    }

    .caption {
      font-size: 0.9rem;
      text-align: center;
      color: #666;
      margin-top: 5px;
    }

    .news-text {
      flex: 2;
    }

    .news-text h2 {
      font-size: 1.6rem;
      color: #222;
      margin-bottom: 10px;
    }

    .lead-text {
      font-weight: bold;
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 10px;
    }

    .news-text p {
      font-size: 1rem;
      color: #555;
      line-height: 1.6;
    }

    .countdown-timer {
      position: absolute;
      top: 10px;
      right: 20px;
      font-size: 1.5rem;
      font-weight: bold;
      color: #d32f2f;
      background: white;
      padding: 5px 10px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    button {
      display: block;
      background:#F6DDC2; //  ここでボタンの初期カラーを変更可能
      color: white; //ボタン上のフォントカラー
      padding: 10px;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 20px;
    }

    button:hover {
      background: #FFB9AC; //ボタンホバー後のカラー変更可能
    }
 `}
</style>
<style>
  {`//  ここから選択画面のデザイン表示
    .choice-container {
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      width: 100vw;
      max-width: 1200px;
      height: 100vh;
      padding: 50px;
      background: rgba(255, 255, 255, 0.98);
      border-radius: 25px;
      box-shadow: 0 20px 20px rgba(0, 0, 0, 0.3);
      text-align: center;
      animation: fadeIn 2s ease-in-out;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    
    .choice-container h1 {
      font-size: 3rem;
      color:#cb7e74;
    }
    .choice-container p {
      font-size: 1.8rem;
      color:#b09b95;
    }
   
    .choice-container button {
      display:block;
      left:50px;a
      margin-left:100;
      width: 80%;
      max-width: 600px;
      font-size: 1.8rem;
      padding: 20px;
      border-radius: 30px;
      background-color:#fee4d8;
      color:#cc7f75;
    }
      button:hover{
      background-color:#fee4d8;
      }
      //ゲームオーバー画面とリザルト画面のデザイン（表示サイズを調整した）

      .result-container {
        display: flex;
        justify-content: center;   /* 横方向に中央 */
        align-items: center;       /* 縦方向に中央 */
        height: 100vh;
        width: 100vw;
        background-color: antiquewhite; /* 背景色（任意） */
      }
        
      .result-content {
        background: none;
        padding: 30px;
        text-align: center;  /* 内部テキストも中央 */
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .game-over-container {
        display: flex;
        justify-content: center;   /* 横方向に中央 */
        align-items: center;       /* 縦方向に中央 */
        height: 100vh;
        width: 100vw;
        background-color: antiquewhite; /* 背景色（任意） */
      }
  `}
</style>

         

      <div className="program-alto">

        {screenOrder.map((screen) => (
          <div key={screen} id={screen} className={`screen ${currentScreen === screen ? "active" : ""}`}>
            {screen === "start-screen" && (
              <div className="start-screen">
                <h1>Welcome to My Game 🎮</h1>
                <p className="game-rules">
                <h2>~ルール説明~</h2>・記事を読んで「の」の数を数えよう
                <br />
                <strong></strong>・記事画面では２０秒以内に読み取ってね
                <br />
                <strong></strong>・正しい選択をするとクリア！間違えるとゲームオーバー
                </p>
                <button onClick={() => showScreen("article-screen")}>ゲームスタート</button>
              </div>
            )}

           {screen === "article-screen" && (
  <div className="news-container">
    <header className="news-header">
      <h1>📰 名古屋タイムズ</h1>
      <p>2025年6月1日 | ミステリー特集</p>
    </header>

    {/* カウントダウン表示 */}
    <div className="countdown-timer">⏳ {countdown}秒</div>

    <div className="news-content">
      {/* 記事の画像エリア */}
      <div className="news-image">
        <img src={tokeiImage} alt="時計塔消失事件" />
        <p className="caption">▲ 消えた時計塔 | 目撃者は不可解な閃光を見たという</p>
      </div>

      {/* 記事本文 */}
      <div className="news-text">
        <h2>消えた時計塔の謎 〜異世界への扉か？〜</h2>
        <p className="lead-text">
          昨夜未明、名古屋市中心部にある歴史的な時計塔が突如として姿を消した。  
          現場には破壊の痕跡はなく、**異世界への扉が開いたのではないか** との憶測が広がっている。
        </p>
        <p>
          目撃者によると、消失の直前に**強い閃光** が発生し、時計塔の周囲が一瞬光り輝いたという。  
          「まるで時間が歪んだようだった」と語る住民もおり、これまでに類を見ない現象が発生した可能性がある。
        </p>
        <p>
          科学者の間では「**重力波との関連性** を調査するべき」との意見もあり、研究者たちは現場からサンプルを採取している。  
          専門家の調査結果は次号で掲載予定だが、果たして時計塔はどこへ消えたのか—？
        </p>
        <p>
          
        </p>
        {/* 次の画面へ遷移するボタン */}
    <button onClick={() => showScreen("choice-screen")}>次へ</button>
      </div>
    </div>
  </div>
)}

            {screen === "choice-screen" && (
              <div className="choice-container">
                <h1>答えを選択</h1>
                <p>こたえを選んでね</p>
                <button onClick={() => showScreen("game-over")}>①　8</button>
                <button onClick={() => showScreen("game-over")}>②　10</button>
                <button onClick={() => showScreen("result-screen")}>③　12</button>
              </div>
            )}

            {screen === "game-over" && (
           
                <div className="result-content">
                <h1>ゲームオーバー</h1>
                <p>残念！もう一度挑戦しよう！</p>
                <button onClick={() => showScreen("start-screen")}>タイトルに戻る</button>
                </div>

            )}

            {screen === "result-screen" && (

                <div className="result-content">
                  <h1>🎉result🎉</h1>
                  <p>ゲームクリア！おめでとう！</p>
                  <NavLink to={{ pathname: "/", search: location.search }}>
                    <button>タイトルに戻る</button>
                  </NavLink>
                </div>
        
            )}
          </div>
        ))}
      </div>
    </>
  );
};
 