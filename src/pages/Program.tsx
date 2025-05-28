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
    "ポーション作りゲームへようこそ！",
    "材料を集めてポーションを作りましょう。",
    "完成したポーションを評価してもらいます。",
    "最高のポーションを目指しましょう！"
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
      <NavLink to={{ pathname: "/result", search: `?id=${id}&name=${name}` }}>結果(こちら側を押すと失敗画面へ移動します)</NavLink><br></br>
      <Link to="/result" state={{ state: ["Success"] }}>
        結果ページへ(こちら側を押すと成功画面へ移動します)
      </Link>
      <h1>プログラミング</h1>
      <h1>魔法のポーション</h1>
      <p>{descriptions[currentIndex]}</p> {/* 現在の説明文を表示 */}
      <button className="btn-magicgame" onClick={handleNextDescription}>次へ</button> {/* ボタンを追加 */}
      <div className="background-image-magic">  </div>
    </div>
  );
}