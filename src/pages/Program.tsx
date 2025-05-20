import { useState, useEffect, useRef } from "react";

export const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [playerX, setPlayerX] = useState(200);
  const [bullets, setBullets] = useState<Array<{ x: number; y: number }>>([]);
  const [enemies, setEnemies] = useState<Array<{ x: number; y: number }>>([]);
  const [score, setScore] = useState(0);
  const width = 400;
  const height = 600;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // キーイベントは最新の状態更新関数を呼べるようにする
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")
        setPlayerX((prev) => Math.max(0, prev - 20));
      if (e.key === "ArrowRight")
        setPlayerX((prev) => Math.min(width - 20, prev + 20));
      if (e.key === " ") {
        // ★注意: playerX は即時反映されないため、一度現在値をキャプチャしておく
        setBullets((prev) => [...prev, { x: playerX + 8, y: height - 40 }]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const interval = setInterval(() => {
      // 弾と敵の更新（関数アップデートを利用）
      setBullets((prevBullets) =>
        prevBullets.map((b) => ({ ...b, y: b.y - 10 })).filter((b) => b.y > 0)
      );
      setEnemies((prevEnemies) =>
        prevEnemies.map((e) => ({ ...e, y: e.y + 4 })).filter((e) => e.y < height)
      );

      // 衝突判定
      setEnemies((prevEnemies) => {
        let newEnemies: { x: number; y: number }[] = [];
        setBullets((prevBullets) => {
          let newBullets = prevBullets;
          prevEnemies.forEach((enemy) => {
            const hit = prevBullets.find(
              (b) =>
                b.x > enemy.x &&
                b.x < enemy.x + 20 &&
                b.y > enemy.y &&
                b.y < enemy.y + 20
            );
            if (hit) {
              setScore((s) => s + 1);
              newBullets = newBullets.filter((b) => b !== hit);
            } else {
              newEnemies.push(enemy);
            }
          });
          return newBullets;
        });
        return newEnemies;
      });

      // 描画：※setState の更新は非同期なため多少状態とのズレはありますが、
      // 連続描画により違和感は少なくなります。
      context.clearRect(0, 0, width, height);
      // プレイヤー描画
      context.fillStyle = "black";
      context.fillRect(playerX, height - 30, 20, 20);
      // 弾描画
      context.fillStyle = "red";
      bullets.forEach((b) => context.fillRect(b.x, b.y, 4, 10));
      // 敵描画
      context.fillStyle = "green";
      enemies.forEach((e) => context.fillRect(e.x, e.y, 20, 20));
    }, 30);

    const enemySpawner = setInterval(() => {
      setEnemies((prev) => [
        ...prev,
        { x: Math.random() * (width - 20), y: 0 },
      ]);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(enemySpawner);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // 依存配列を空にする

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="text-xl font-bold">Score: {score}</h1>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border mt-2"
      />
    </div>
  );
};

export default Game;

// 以下は後で利用するかも知れない別コンポーネント
// export const Program = () => {
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const id = query.get("id"); // "123"
//   const name = query.get("name"); // "まっつん"
//   return (
//     <div className="program">
//       <NavLink to={{ pathname: "/result", search: `?id=${id}&name=${name}` }}>結果</NavLink>
//       <h1>プログラミング</h1>
//     </div>
//   );
// };