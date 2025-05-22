import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import { useBodyScrollLock } from "../hooks/useBodyScrollLock"

export const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [playerX, setPlayerX] = useState(200);
  const [bullets, setBullets] = useState<Array<{ x: number; y: number }>>([]);
  const [enemies, setEnemies] = useState<Array<{ x: number; y: number }>>([]);
  const [score, setScore] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  // (ゲーム再スタート用の refreshKey を更新すると useEffect 内の処理が再実行されます)

  // 最新状態を保持する ref
  const playerXRef = useRef(playerX);
  const bulletsRef = useRef(bullets);
  const enemiesRef = useRef(enemies);
  // 矢印キーの押下状況を保持する ref
  const leftPressedRef = useRef(false);
  const rightPressedRef = useRef(false);
  // useRef を利用して enemySpawner のタイマーID を保持
  const enemySpawnerRef = useRef<number | null>(null);

  const width = 400;
  const height = 400;
  const playerWidth = 20;
  const speed = 5; // 移動速度

  // reset 用の useEffect：refreshKeyが変更されたら各 state を初期状態に戻す
  useEffect(() => {
    setPlayerX(200);
    setScore(0);
    setBullets([]);
    setEnemies([]);
    setGameOver(false);
  }, [refreshKey]);

  useEffect(() => {
    playerXRef.current = playerX;
  }, [playerX]);

  useEffect(() => {
    bulletsRef.current = bullets;
  }, [bullets]);

  useEffect(() => {
    enemiesRef.current = enemies;
  }, [enemies]);

  // 弾の発射（1秒に1回）
  useEffect(() => {
    const bulletInterval = setInterval(() => {
      setBullets((prev) => [
        ...prev,
        { x: playerXRef.current + 8, y: height - 40 },
      ]);
    }, 500);

    return () => {
      clearInterval(bulletInterval);
    };
  }, []);

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
      // すでにゲームオーバーなら何もしない
      if (gameOver) {
  context.fillStyle = "red";
  context.font = "bold 36px sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("Game Over", width / 2, height / 2);
    return;
  };

      // 矢印キーに応じたプレイヤーの移動
      if (leftPressedRef.current) {
        setPlayerX((prev) => Math.max(0, prev - speed));
      }
      if (rightPressedRef.current) {
        setPlayerX((prev) => Math.min(width - playerWidth, prev + speed));
      }

      // 弾の更新（上に移動、画面外除去）
      const updatedBullets = bulletsRef.current
        .map((b) => ({ ...b, y: b.y - 10 }))
        .filter((b) => b.y > 0);

      // 敵の更新（下に移動）
      const allEnemiesUpdated = enemiesRef.current.map((e) => ({
        ...e,
        y: e.y + 4,
      }));
      const updatedEnemies = allEnemiesUpdated.filter((e) => e.y < height);
      // もし除去された敵があれば出力
      if (allEnemiesUpdated.length > updatedEnemies.length) {
        setGameOver(true);
        return;
        // console.log("敵が画面外に出ました");
      }

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
      context.fillStyle = "blue";
      context.fillRect(playerXRef.current, height - 30, playerWidth, 20);
      // 弾描画
      context.fillStyle = "red";
      newBullets.forEach((b) => context.fillRect(b.x, b.y, 4, 10));
      // 敵描画
      context.fillStyle = "green";
      newEnemies.forEach((e) => context.fillRect(e.x, e.y, 20, 20));
    };

    const interval = setInterval(gameLoop, 30);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameOver, refreshKey]);

  useEffect(() => {
    // 1秒ごとに敵を逐次スポーン
    enemySpawnerRef.current = setInterval(() => {
      setEnemies((prev) => [
        ...prev,
        { x: Math.random() * (width - 20), y: 0 },
      ]);
    }, 1000);

    // あるタイミング（例：40秒後）に50匹の敵を同時に発生させ、enemySpawner を停止
    const spawnAllEnemies = setTimeout(() => {
      setEnemies((prev) => {
        const newEnemies = [...prev];
        for (let i = 0; i < 50; i++) {
          newEnemies.push({ x: Math.random() * (width - 20), y: 0 });
        }
        return newEnemies;
      });
      // enemySpawner を停止
      if (enemySpawnerRef.current) {
        clearInterval(enemySpawnerRef.current);
        enemySpawnerRef.current = null;
      }
    }, 40000);

    return () => {
      if (enemySpawnerRef.current) {
        clearInterval(enemySpawnerRef.current);
      }
      clearTimeout(spawnAllEnemies);
    };
  }, [refreshKey]);
return (
  <div className="flex flex-col items-center mt-4 relative">
    <h1 className="text-xl font-bold">Score: {score}</h1>
    
    <div className="relative mt-2" style={{ width: width, height: height }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border block"
      />
    </div>
    
    <button
      type="button"
      onClick={() => {
        setPlayerX(200);
        setScore(0);
        setBullets([]);
        setEnemies([]);
        setRefreshKey((prev) => prev + 1);
      }}
      className="mt-4 p-2 border"
    >
      リトライ
    </button>
  </div>
);
}

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