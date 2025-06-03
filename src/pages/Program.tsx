import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../magic-game.css';
import '../Button-magicgame.css';

export const Program = () => {
  const location = useLocation();
  const navigate = useNavigate(); // 追加
  const query = new URLSearchParams(location.search);

  const id = query.get("id"); // "123"
  const name = query.get("name"); // "まっつん"
   // 説明文のリスト
   const descriptions = [
    "とある小さな村から、伝説の魔法使いが残した魔導書が見つかった",
    "そこには現代には無い、強力なポーションの調合方法が記されているという",
    "君は見習い魔法使いとして、そのポーションを調合することになった",
    "正しい材料、手順を進めていくことで、ポーションが完成する",
    "さあ、魔法のポーションを調合しよう！",
  ];

  // 現在の説明文のインデックスを管理
  const [currentIndex, setCurrentIndex] = useState(0);

  // ボタンが押されたときに説明文を切り替える
  const handleNextDescription = () => {
    if (currentIndex < descriptions.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      // 最後の説明文の次で画面遷移
      navigate(`/potion-create?id=${id}&name=${name}`);
    }
  };

  return (
    <div className="program">
      
      <h1>魔法のポーション作りゲーム</h1>
      <p style={{
        fontFamily: 'Caveat, Yu Mincho, 游明朝, serif, cursive',
        color: '#5B3A1B',
        fontSize: '1.5em',
        fontWeight: 'bold',
        letterSpacing: '0.05em',
        margin: '1.5em 0',
        lineHeight: 1.7,
        background: 'rgba(255,255,240,0.7)',
        borderRadius: '12px',
        padding: '0.7em 1.2em',
        boxShadow: '0 2px 8px #e0cfa0'
      }}>{descriptions[currentIndex]}</p> {/* 現在の説明文を表示 */}
      <button className="btn-magicgame" onClick={handleNextDescription}>次へ</button> {/* ボタンを追加 */}
      <div className="background-image-magic">  </div>
    </div>
  );
}