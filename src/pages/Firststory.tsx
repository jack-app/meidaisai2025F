import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Firststory.css';

// 表示するストーリーの各ステップを定義
const storyContent = [
  {
    type: 'deleted_screen',
    text: 'データは削除されました',
  },
  {
    type: 'narration',
    speaker: '',
    text: '名大祭当日。ゲーム画面には、なぜか「データは削除されました」の文字が——！？',
  },
  {
    type: 'narration',
    speaker: '',
    text: '突然のトラブルに困惑するサークルメンバーたち。このままでは展示が台無しに！',
  },
  {
    type: 'dialogue',
    speaker: 'まつり', // 女の子
    text: 'うわぁーん！大変だよ！僕たちの作ったゲームのデータが……データが消えちゃったみたいなんだ！',
  },
  {
    type: 'dialogue',
    speaker: 'めいた', // 男の子
    text: 'これじゃ、名大祭でみんなに遊んでもらえないよ…。どうしよう…。',
  },
  {
    type: 'dialogue',
    speaker: 'まつり', // 女の子
    text: 'ねえ、そこのキミ！もしかして、ゲームを作るのを手伝ってくれたりしないかな…？',
  },
  {
    type: 'narration',
    speaker: '',
    text: 'ゲーム作りを手伝ってくれませんか？',
  },
];

export const Firststory: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTextFullyDisplayed, setIsTextFullyDisplayed] = useState(false);
  const navigate = useNavigate();

  const currentLine = storyContent[currentStep];

  // 文字送り効果のハンドラ
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

  // 次のステップに進む処理
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
      navigate('/select');
    }
  };

  // 「データは削除されました」画面のスタイル
  if (currentLine?.type === 'deleted_screen') {
    return (
      <div className="first-story-container deleted-screen-bg" onClick={handleNextStep}>
        <div className="deleted-message">
          <h1>{currentLine.text}</h1>
          <p className="click-to-proceed">(クリックして続ける)</p>
        </div>
      </div>
    );
  }

  // キャラクター画像を表示するかどうか
  const showCharacters = currentLine?.type === 'dialogue';
  const activeSpeaker = currentLine?.speaker;

  return (
    <div className="first-story-container" onClick={handleNextStep}>
      {/* キャラクター画像表示エリア */}
      {showCharacters && (
        <div className="characters-container">
          <div className={`character-left ${activeSpeaker === 'めいた' ? 'active' : 'inactive'}`}>
            <img src="/boy.png" alt="めいた" />
          </div>
          <div className={`character-right ${activeSpeaker === 'まつり' ? 'active' : 'inactive'}`}>
            <img src="/girl.png" alt="まつり" />
          </div>
        </div>
      )}

      <div className="story-box">
        {currentLine?.speaker && <div className="speaker-name">{currentLine.speaker}</div>}
        <div className="story-text">
          {currentLine?.type === 'dialogue' || currentLine?.type === 'narration'
            ? displayedText
            : currentLine?.text}
        </div>
      </div>
      
      {isTextFullyDisplayed && currentStep < storyContent.length - 1 && (
        <div className="proceed-indicator">▼ クリックして進む</div>
      )}
      
      {isTextFullyDisplayed && currentStep === storyContent.length - 1 && (
        <button className="start-button" onClick={handleNextStep}>
          ゲーム作りを手伝う！
        </button>
      )}
    </div>
  );
};