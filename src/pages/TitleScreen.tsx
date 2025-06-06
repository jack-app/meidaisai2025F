import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TitleScreen.css'; // 専用のCSSファイルをインポート

const TitleScreen: React.FC = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // コンポーネントがマウントされたらアニメーションを開始
    setAnimate(true);

    // アニメーション完了後にFirststoryページへ遷移
    const timer = setTimeout(() => {
      navigate('/firststory');
    }, 3000); // アニメーションの時間に合わせて調整 (例: 3000ms = 3秒)

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="title-screen-container">
      <div className={`logo-container ${animate ? 'animate' : ''}`}>
        <span className="logo-char char-m">M</span>
        <span className="logo-char char-e">E</span>
        <span className="logo-char char-small-i">い</span>
        <span className="logo-char char-t">T</span>
        <span className="logo-char char-a">A</span>
        <span className="logo-char char-small-i-2">い</span>
        <span className="logo-char char-sai">祭</span>
      </div>
    </div>
  );
};

export default TitleScreen;