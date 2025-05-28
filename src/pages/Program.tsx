import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
    "古の錬金術師たちの秘術が詰まったポーションづくり。",
    "君は見習い錬金術師として、未知の薬の調合に挑む。",
    "素材を選び、慎重に調合せよ。伝説のポーションを生み出し、歴史に名を刻めるか？",
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
      <NavLink to={{ pathname: "/result", search: `?id=${id}&name=${name}` }}>結果</NavLink>
      <h1>魔法のポーション</h1>
      <p>{descriptions[currentIndex]}</p> {/* 現在の説明文を表示 */}
      <button className="btn-magicgame" onClick={handleNextDescription}>次へ</button> {/* ボタンを追加 */}
      <div className="background-image-magic">  </div>
    </div>
  );
}