import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Firststory.css';

// キャラクター画像の定義
interface CharacterImages {
  leftCharacter?: string; // 左側のキャラクター画像のパス (例: '/images/characterA.png')
  rightCharacter?: string; // 右側のキャラクター画像のパス (例: '/images/characterB.png')
}

// ストーリーの各ステップの型定義を拡張
interface StoryStep extends CharacterImages {
  type: 'deleted_screen' | 'narration' | 'dialogue';
  speaker?: string;
  text: string;
}

const storyContent: StoryStep[] = [
  {
    type: 'deleted_screen',
    text: 'データは削除されました',
  },
  {
    type: 'narration',
    speaker: '',
    text: '名大祭当日。ゲーム画面には、なぜか「データは削除されました」の文字が——！？',
    leftCharacter: '/images/character_member_a_normal.png', // 例: メンバーAの通常立ち絵
    rightCharacter: '/images/character_member_b_normal.png', // 例: メンバーBの通常立ち絵
  },
  {
    type: 'narration',
    speaker: '',
    text: '突然のトラブルに困惑するサークルメンバーたち。このままでは展示が台無しに！',
    leftCharacter: '/images/character_member_a_confused.png', // 例: メンバーAの困惑立ち絵
    rightCharacter: '/images/character_member_b_sad.png', // 例: メンバーBの悲しい立ち絵
  },
  {
    type: 'dialogue',
    speaker: 'サークルメンバーA',
    text: 'うわぁーん！大変だよ！僕たちの作ったゲームのデータが……データが消えちゃったみたいなんだ！',
    leftCharacter: '/images/character_member_a_cry.png', // 例: メンバーAの泣き立ち絵
    rightCharacter: '/images/character_member_b_sad.png',
  },
  {
    type: 'dialogue',
    speaker: 'サークルメンバーB',
    text: 'これじゃ、名大祭でみんなに遊んでもらえないよ…。どうしよう…。',
    leftCharacter: '/images/character_member_a_cry.png',
    rightCharacter: '/images/character_member_b_despair.png', // 例: メンバーBの絶望立ち絵
  },
  {
    type: 'dialogue',
    speaker: 'サークルメンバーA',
    text: 'ねえ、そこのキミ！もしかして、ゲームを作るのを手伝ってくれたりしないかな…？',
    leftCharacter: '/images/character_member_a_hope.png', // 例: メンバーAの希望立ち絵
    rightCharacter: '/images/character_member_b_normal.png',
  },
  {
    type: 'narration',
    speaker: '',
    text: 'ゲーム作りを手伝ってくれませんか？',
    leftCharacter: '/images/character_member_a_normal.png',
    rightCharacter: '/images/character_member_b_normal.png',
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

  return (
    <div className="first-story-container" onClick={handleNextStep}>
      {/* 立ち絵表示エリア */}
      <div className="character-display-area">
        {currentLine?.leftCharacter && (
          <img
            src={currentLine.leftCharacter}
            alt="Left Character"
            className="character-image left"
          />
        )}
        {currentLine?.rightCharacter && (
          <img
            src={currentLine.rightCharacter}
            alt="Right Character"
            className="character-image right"
          />
        )}
      </div>

      {/* ストーリーテキストボックス */}
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