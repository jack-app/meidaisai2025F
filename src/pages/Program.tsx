import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

export const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [playerX, setPlayerX] = useState(200);
  const [bullets, setBullets] = useState<Array<{ x: number; y: number }>>([]);
  const [enemies, setEnemies] = useState<Array<{ x: number; y: number }>>([]);
  const [score, setScore] = useState(0);

  // 最新状態を保持する ref
  const playerXRef = useRef(playerX);
  const bulletsRef = useRef(bullets);
  const enemiesRef = useRef(enemies);
  // 矢印キーの押下状況を保持する ref
  const leftPressedRef = useRef(false);
  const rightPressedRef = useRef(false);

  const width = 400;
  const height = 600;
  const playerWidth = 20;
  const speed = 5; // 移動速度

  // state 更新後に対応する ref を更新
  useEffect(() => {
    playerXRef.current = playerX;
  }, [playerX]);

  useEffect(() => {
    bulletsRef.current = bullets;
  }, [bullets]);

  useEffect(() => {
    enemiesRef.current = enemies;
  }, [enemies]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // キーイベントは常に最新のプレイヤー位置で弾を打つため、playerXRef.current を利用する
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        leftPressedRef.current = true;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        rightPressedRef.current = true;
      }
      if (e.key === " ") {
        e.preventDefault();
        setBullets((prev) => [
          ...prev,
          { x: playerXRef.current + 8, y: height - 40 },
        ]);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        leftPressedRef.current = false;
      }
      if (e.key === "ArrowRight") {
        rightPressedRef.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // 衝突判定を含むゲームループ
    const gameLoop = () => {
      // 矢印キーの押下状態に応じたプレイヤーの移動
      if (leftPressedRef.current) {
        setPlayerX((prev) => Math.max(0, prev - speed));
      }
      if (rightPressedRef.current) {
        setPlayerX((prev) =>
          Math.min(width - playerWidth, prev + speed)
        );
      }

      // 弾の更新（上に移動、画面外除去）
      const updatedBullets = bulletsRef.current
        .map((b) => ({ ...b, y: b.y - 10 }))
        .filter((b) => b.y > 0);
      // 敵の更新（下に移動、画面外除去）
      const updatedEnemies = enemiesRef.current
        .map((e) => ({ ...e, y: e.y + 4 }))
        .filter((e) => e.y < height);

      // 衝突判定（各敵と弾の当たり判定）
      let newBullets = [...updatedBullets];
      const newEnemies: { x: number; y: number }[] = [];
      updatedEnemies.forEach((enemy) => {
        const hit = newBullets.find(
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

      // state 更新（ref は次の useEffect で反映）
      setBullets(newBullets);
      setEnemies(newEnemies);

      // 描画
      context.clearRect(0, 0, width, height);
      // プレイヤー描画（常に画面下部）
      context.fillStyle = "black";
      context.fillRect(playerXRef.current, height - 30, playerWidth, 20);
      // 弾描画
      context.fillStyle = "red";
      newBullets.forEach((b) => context.fillRect(b.x, b.y, 4, 10));
      // 敵描画
      context.fillStyle = "green";
      newEnemies.forEach((e) => context.fillRect(e.x, e.y, 20, 20));
    };

    const interval = setInterval(gameLoop, 30);

    // 敵を定期的にスポーン
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
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []); // 依存配列は空で1度だけ登録

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

//以下は後で利用するかも知れない別コンポーネント
export const Program = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id"); // "123"
  const name = query.get("name"); // "まっつん"
  return (
    <div className="program">
      <NavLink to={{ pathname: "/result", search: `?id=${id}&name=${name}` }}>
        結果
      </NavLink>
      <h1>プログラミング</h1>
    </div>
  );
};