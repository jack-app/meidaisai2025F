import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Firststory.css';

export const SelectTettin2 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTextFullyDisplayed, setIsTextFullyDisplayed] = useState(false);
  const [rate, setRate] = useState("0");
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id") || "me";
  const name = query.get("name") || "まっつんくん";
  const die = query.get("die") || "500";
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
      text: 'あれれ、弾が遅すぎて敵が倒せないよ！'
    },
    {
      type: 'dialogue',
      speaker: 'キャラクターB',
      text: 'クリアできる弾速ってどれくらいなんだろう？'
    },
    {
      type: 'dialogue',
      speaker: 'キャラクターA',
      text: '10ミリ秒に一発だと、3回目でクリアできたよ！'
    },
    {
      type: 'narration',
      speaker: '',
      text: '弾の発射間隔（ミリ秒）を設定しよう！（100〜1000）'
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
      navigate(`/programTettin?id=me3&name=${name}` +
        `&die=${die}&rate=${rate}&player=${player}&enemy=${enemy}` +
        `&beam=${beam}&back=${back}&win=${win}&lose=${lose}&source=tettin`);
    }
  };

  // キャラクター画像を表示するかどうか
  const showCharacters = currentLine?.type === 'dialogue';
  const activeSpeaker = currentLine?.speaker;

  return (
    <div className="first-story-container">
      {/* キャラクター画像表示エリア */}
      {showCharacters && (
        <div className="characters-container">
          <div className={`character-left ${activeSpeaker === 'キャラクターA' ? 'active' : 'inactive'}`}>
            <img src="/girl.png" alt="キャラクターA" />
          </div>
          <div className={`character-right ${activeSpeaker === 'キャラクターB' ? 'active' : 'inactive'}`}>
            <img src="/boy.png" alt="キャラクターB" />
          </div>
        </div>
      )}

      <div className="story-box">
        {currentLine?.speaker && <div className="speaker-name">{currentLine.speaker}</div>}
        <div className="story-text">
          {(currentLine?.type === 'dialogue' || currentLine?.type === 'narration')
            ? displayedText
            : currentLine?.text}
        </div>

        {/* 入力欄表示 */}
        {isTextFullyDisplayed && currentStep === storyContent.length - 1 && (
          <div style={{ marginTop: '20px' }}>
            <label htmlFor="rate-input">弾の発射間隔（100〜1000ms）</label><br />
            <input
              id="rate-input"
              type="number"
              value={rate}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val >= 100 && val <= 1000) {
                  setRate(e.target.value);
                }
              }}
              min="100"
              max="1000"
              style={{
                fontSize: "1.2em",
                padding: "10px",
                marginTop: "10px",
                width: "200px"
              }}
            />
          </div>
        )}
      </div>

      {/* 「クリックして進む」だけに handleNextStep を割り当てる */}
      {isTextFullyDisplayed && currentStep < storyContent.length - 1 && (
        <div className="proceed-indicator" onClick={handleNextStep}>
          ▼ クリックして進む
        </div>
      )}

      {/* 入力が正しければボタン表示 */}
      {isTextFullyDisplayed &&
        currentStep === storyContent.length - 1 &&
        rate &&
        parseInt(rate) >= 100 &&
        parseInt(rate) <= 1000 && (
          <button className="start-button" onClick={handleNextStep}>
            設定して最終確認へ！
          </button>
        )}
    </div>
  );
};