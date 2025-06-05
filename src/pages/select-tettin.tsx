import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 画面遷移用
import './Firststory.css'; // 専用のCSSファイルをインポート

export const SelectTettin1 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTextFullyDisplayed, setIsTextFullyDisplayed] = useState(false); // テキストが全文表示されたか
  const [die, setDie] = useState("500");
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id") || "me";
  const name = query.get("name") || "まっつんくん";
  const rate = query.get("rate");
  const player = query.get("player");
  const enemy = query.get("enemy");
  const beam = query.get("beam");
  const back = query.get("back");
  const win = query.get("win");
  const lose = query.get("lose");

  const storyContent = [
    {
      type: 'dialogue',
      speaker: 'キャラクターA',
      text: 'ちょっと待って！敵に何回当てても倒れないんだけど！？'
    },
    {
      type: 'dialogue',
      speaker: 'キャラクターB',
      text: 'ま、まさか…敵が倒れる条件が設定されてないとか…？'
    },
    {
      type: 'dialogue',
      speaker: 'キャラクターA',
      text: 'お願い！君が敵が倒れる"HP"の閾値を決めてくれない！？'
    },
    {
      type: 'narration',
      speaker: '',
      text: '敵が何ダメージで消えるかを設定しよう！'
    }
  ];

  const currentLine = storyContent[currentStep];

  const typeText = useCallback(() => {
    if (currentLine && currentLine.type !== 'deleted_screen') {
      const fullText = currentLine.text;
      if (displayedText.length < fullText.length) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setIsTextFullyDisplayed(false);
      } else {
        setIsTextFullyDisplayed(true);
      }
    } else {
      setIsTextFullyDisplayed(true);
    }
  }, [currentStep, displayedText, currentLine]);

  useEffect(() => {
    if (currentLine && currentLine.type !== 'deleted_screen' && !isTextFullyDisplayed) {
      const timer = setTimeout(typeText, 50);
      return () => clearTimeout(timer);
    }
  }, [displayedText, currentLine, isTextFullyDisplayed, typeText]);

  const handleNextStep = () => {
    if (currentStep < storyContent.length - 1) {
      if (isTextFullyDisplayed || currentLine.type === 'deleted_screen') {
        setCurrentStep(currentStep + 1);
        setDisplayedText('');
        setIsTextFullyDisplayed(false);
      } else {
        setDisplayedText(currentLine.text);
        setIsTextFullyDisplayed(true);
      }
    } else {
      navigate(`/programTettin?id=me2&name=${name}
            &die=${die}&rate=${rate}&player=${player}&enemy=${enemy}
            &beam=${beam}&back=${back}&win=${win}&lose=${lose}&source=tettin`);
    }
  };

  return (
    <div className="first-story-container">
  <div className="story-box">
    {currentLine?.speaker && <div className="speaker-name">{currentLine.speaker}</div>}
    <div className="story-text">
      {(currentLine?.type === 'dialogue' || currentLine?.type === 'narration')
        ? displayedText
        : currentLine?.text}
    </div>

    {isTextFullyDisplayed && currentStep === storyContent.length - 1 && (
      <div style={{ marginTop: '20px' }}>
        <label htmlFor="die-input">敵が倒れるHPを入力（例: -10〜1000）</label><br />
        <input
          id="die-input"
          type="number"
          value={die}
          onChange={(e) => setDie(e.target.value)}
          style={{ fontSize: "1.2em", padding: "10px", marginTop: "10px", width: "200px" }}
        />
      </div>
    )}
  </div>

  {/* ▼ クリックで進む のみがステップ制御を担う */}
  {isTextFullyDisplayed && currentStep < storyContent.length - 1 && (
    <div className="proceed-indicator" onClick={handleNextStep}>
      ▼ クリックして進む
    </div>
  )}

  {/* 入力されていれば進める */}
  {isTextFullyDisplayed && currentStep === storyContent.length - 1 && die !== "" && (
    <button className="start-button" onClick={handleNextStep}>
      設定して第二段階へ！
    </button>
  )}
</div>

  );
};
