import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Titlelogo.css';
const Titlelogo: React.FC = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [showBigLogo, setShowBigLogo] = useState(false);
  const [hideChars, setHideChars] = useState(false);
  const [shineKey, setShineKey] = useState(0);
  const [showShine, setShowShine] = useState(false);
  const [fadeState, setFadeState] = useState<'none' | 'fade-in' | 'fade-out'>('none');
  const [showBackground, setShowBackground] = useState(false);
  const [showPreviews, setShowPreviews] = useState(false);
  useEffect(() => {
    let loopTimeout: number;
    const runSequence = () => {
  setAnimate(true);
  setHideChars(false);
  setShowBigLogo(false);
  setShineKey(0);
  setShowShine(false);
  setFadeState('none');
  setShowBackground(false);
  setShowPreviews(false);
  setTimeout(() => setHideChars(true), 3500);
  setTimeout(() => setShowBigLogo(true), 4000);
  setTimeout(() => {
    setShowShine(true);
    setShineKey(k => k + 1);
    setTimeout(() => {
      setShowShine(false);
      setShowBackground(true);
      setShowPreviews(true);
      setFadeState('none');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFadeState('fade-in');
        });
      });
      // :下向き三角矢印: fade-outを遅延させるためのrequestAnimationFrame挿入
      setTimeout(() => {
        requestAnimationFrame(() => {
          setFadeState('fade-out');
          setTimeout(() => {
            setFadeState('none');
            setShowBackground(false);
            setShowPreviews(false);
          }, 1500); // フェードアウト終了後の片付け
        });
      }, 10000); // 表示を10秒続けた後
    }, 1000); // shine効果終了後
  }, 5000); // Bigロゴ表示後の待機
  loopTimeout = setTimeout(runSequence, 5000 + 1000 + 10000 + 1500 + 3000);
};
    runSequence();
    return () => {
      clearTimeout(loopTimeout);
    };
  }, []);
  const handleClick = () => {
    navigate('/Firststory');
  };
  return (
    <div className="title-screen-container">
      {!showBigLogo && (
        <div
          className={`logo-container ${animate ? 'animate' : ''} ${hideChars ? 'fade-out' : ''}`}
        >
          <span className="logo-char char-m">M</span>
          <span className="logo-char char-e">E</span>
          <span className="logo-char char-small-i">い</span>
          <span className="logo-char char-t">T</span>
          <span className="logo-char char-a">A</span>
          <span className="logo-char char-small-i-2">い</span>
          <span className="logo-char char-sai">祭</span>
        </div>
      )}
      {showBigLogo && (
        <div className="big-logo-wrapper">
          <h1 className={`big-logo ${fadeState === 'fade-out' ? 'fade-out' : ''}`}>
            <span className="pink">M</span>
            <span className="pink">E</span>
            <span className="purple">い</span>
            <span className="pink">T</span>
            <span className="pink">A</span>
            <span className="purple">い</span>
            <span className="purple">祭</span>
            {showShine && <div key={shineKey} className="shine-effect" />}
          </h1>
        </div>
      )}
      {showBackground && (
        <div
          className={`background-fade-in ${
            fadeState === 'fade-in' ? 'visible' : ''
          } ${fadeState === 'fade-out' ? 'fade-out' : ''}`}
        />
      )}
      {showPreviews && (
        <div
          className={`preview-images ${
            fadeState === 'fade-in' ? 'visible' : ''
          } ${fadeState === 'fade-out' ? 'fade-out' : ''}`}
        >
          <img src="/game_preview1.jpg" className="preview-image" alt="Preview 1" />
          <img src="/game_preview2.jpg" className="preview-image" alt="Preview 2" />
          <img src="/game_preview3.jpg" className="preview-image" alt="Preview 3" />
        </div>
      )}
      {/* {showBackground && (
        <div
          className={`preview-texts ${
            fadeState === 'fade-in' ? 'visible' : ''
          } ${fadeState === 'fade-out' ? 'fade-out' : ''}`}
        >
          <span className="preview-text preview-text-1">め</span>
          <span className="preview-text preview-text-2">た</span>
          <span className="preview-text preview-text-3">さい</span>
        </div>
      )} */}
      <div className="start-button-wrapper">
        <button className="start-button" onClick={handleClick}>
          はじめる
        </button>
      </div>
    </div>
  );
};
export default Titlelogo;