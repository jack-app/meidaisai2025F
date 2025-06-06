import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Firststory.css';

export const SelectAlto = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTextFullyDisplayed, setIsTextFullyDisplayed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const name = query.get("name") || "まつり";

  const storyContent = [
    {
      speaker: "まつり",
      type: "dialogue",
      text: "うーん…どんなゲームを作ろうとしているんだっけ…"
    },
    {
      speaker: "めいた",
      type: "dialogue",
      text: "じゃあ、ちょっと変わったミニゲームを考えてみるとか？"
    },
    {
      speaker: "まつり",
      type: "dialogue",
      text: "たとえば…何があるかな？"
    },
    {
      speaker: "めいた",
      type: "dialogue",
      text: "「ののじ」を探すゲームとかは？"
    },
    {
      speaker: "まつり",
      type: "dialogue",
      text: "ののじ！？あの平仮名の「の」をふたつ並べたアレ！？"
    },
    {
      speaker: "めいた",
      type: "dialogue",
      text: "そう！文章の中に紛れてる「ののじ」をいち早く見つけるスピード勝負！"
    },
    {
      speaker: "まつり",
      type: "dialogue",
      text: "…めっちゃ面白そうじゃん！よし、「ののじ探しゲーム」作ってみよう！"
    }
  ];

  const currentLine = storyContent[currentStep];

  const typeText = useCallback(() => {
    if (currentLine) {
      const fullText = currentLine.text;
      if (displayedText.length < fullText.length) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setIsTextFullyDisplayed(false);
      } else {
        setIsTextFullyDisplayed(true);
      }
    }
  }, [currentLine, displayedText]);

  useEffect(() => {
    if (!isTextFullyDisplayed && currentLine) {
      const timer = setTimeout(typeText, 40);
      return () => clearTimeout(timer);
    }
  }, [displayedText, currentLine, isTextFullyDisplayed, typeText]);

  const handleNext = () => {
    if (!isTextFullyDisplayed) {
      setDisplayedText(currentLine.text);
      setIsTextFullyDisplayed(true);
      return;
    }

    if (currentStep < storyContent.length - 1) {
      setCurrentStep(currentStep + 1);
      setDisplayedText('');
      setIsTextFullyDisplayed(false);
    } else {
      navigate(`/programAlto?id=me&name=${name}&source=alto`);
    }
  };

  // キャラクター画像を表示するかどうか
  const showCharacters = currentLine?.type === 'dialogue';
  const activeSpeaker = currentLine?.speaker;

  return (
    <div className="first-story-container" onClick={handleNext}>
      {/* キャラクター画像表示エリア */}
      {showCharacters && (
        <div className="characters-container">
          <div className={`character-left ${activeSpeaker === 'めいた' ? 'active' : 'inactive'}`}>
            <img src="/boy.png" alt="めいたキャラクター" />
          </div>
                    <div className={`character-right ${activeSpeaker === 'まつり' ? 'active' : 'inactive'}`}>
            <img src="/girl.png" alt="まつりキャラクター" />
          </div>
        </div>
      )}

      <div className="story-box">
        {currentLine?.speaker && <div className="speaker-name">{currentLine.speaker}</div>}
        <div className="story-text">{displayedText}</div>
        {isTextFullyDisplayed && currentStep < storyContent.length - 1 && (
          <div className="proceed-indicator">▼ クリックして進む</div>
        )}
        {isTextFullyDisplayed && currentStep === storyContent.length - 1 && (
          <button className="start-button" onClick={handleNext}>
            ゲーム作成へ！
          </button>
        )}
      </div>
    </div>
  );
};