import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Firststory.css';

export const SelectTyupei = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTextFullyDisplayed, setIsTextFullyDisplayed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const name = query.get("name") || "錬金術師見習い";

  const storyContent = [
    { type: 'dialogue', speaker: '？？？', text: '……ねえ、そこのキミ。' },
    { type: 'dialogue', speaker: '？？？', text: 'キミ、どんなゲームを作ろうとしてるの？' },
    { type: 'dialogue', speaker: '？？？', text: '魔法？ 戦闘？ それとも……' },
    { type: 'dialogue', speaker: '？？？', text: '「ポーションづくりゲーム」って興味ない？' },
    { type: 'dialogue', speaker: '助手クロウ', text: 'あの！素材を組み合わせて色んなポーションを錬成するアレですか！？' },
    { type: 'dialogue', speaker: '？？？', text: 'そう、それだよ。' },
    { type: 'dialogue', speaker: '錬金術師ルナ', text: 'さあ、ポーションづくりゲームを、一緒に作っていこう！' },
    { type: 'narration', speaker: '', text: 'ゲーム作りの第一歩として、まずは素材の選択画面を作ってみよう。' },
  ];

  const currentLine = storyContent[currentStep];

  const typeText = useCallback(() => {
    if (!currentLine) return;
    const fullText = currentLine.text;
    if (displayedText.length < fullText.length) {
      setDisplayedText(fullText.substring(0, displayedText.length + 1));
      setIsTextFullyDisplayed(false);
    } else {
      setIsTextFullyDisplayed(true);
    }
  }, [currentLine, displayedText]);

  useEffect(() => {
    if (currentLine && !isTextFullyDisplayed) {
      const timer = setTimeout(typeText, 40);
      return () => clearTimeout(timer);
    }
  }, [displayedText, currentLine, isTextFullyDisplayed, typeText]);

  const handleNextStep = () => {
    if (currentStep < storyContent.length - 1) {
      setCurrentStep(currentStep + 1);
      setDisplayedText('');
      setIsTextFullyDisplayed(false);
    } else { 
      navigate(`/program?id=me&name=${name}`);
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

        {isTextFullyDisplayed && (
          <div className="proceed-indicator" onClick={handleNextStep}>
            ▼ クリックして進む
          </div>
        )}
      </div>
    </div>
  );
};
