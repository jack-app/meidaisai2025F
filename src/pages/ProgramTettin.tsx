import { useState, useEffect, useRef } from "react";
import { useLocation, NavLink } from "react-router-dom";
import laserGunImg from "../images/レーザー銃.png";

export const Game = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  let id = query.get("id");
  const name = query.get("name");
  const die = query.get("die");
  const rate = query.get("rate");
  const player = query.get("player") || "blue"; // デフォルトのプレイヤー色
  const enemy = query.get("enemy") || "green";
  const beam = query.get("beam") || "red";
  const back = query.get("back") || "black";
  const win = query.get("win") || "Game Clear";
  const lose = query.get("lose") || "Game Over";

  const [playerX, setPlayerX] = useState(200);
  const [bullets, setBullets] = useState<Array<{ x: number; y: number }>>([]);
  const [enemies, setEnemies] = useState<
    Array<{ x: number; y: number; hp: number; isLaserGun?: boolean }>
  >([]);
  const [score, setScore] = useState(0);
  const [bulletSources, setBulletSources] = useState(1);
  // 特殊な敵（レーザー銃付き）を倒した数
  const [eliminatedCount, setEliminatedCount] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameClear, setGameClear] = useState(false);
  // (ゲーム再スタート用の refreshKey を更新すると useEffect 内の処理が再実行されます)

  // 最新状態を保持する ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const playerXRef = useRef(playerX);
  const bulletsRef = useRef(bullets);
  const enemiesRef = useRef(enemies);
  // 矢印キーの押下状況を保持する ref
  const leftPressedRef = useRef(false);
  const rightPressedRef = useRef(false);
  // useRef を利用して enemySpawner のタイマーID を保持
  const enemySpawnerRef = useRef<number | null>(null);
  // ゲーム開始時刻を保持する ref
  const startTimeRef = useRef(Date.now());
  // 敵のスポーン回数カウント
  const spawnCountRef = useRef(0);
  // レーザー銃画像の ref
  const laserImageRef = useRef<HTMLImageElement | null>(null);

  const width = 400;
  const height = 400;
  const playerWidth = 20;
  const speed = 10;

  // マウント時にレーザー銃画像をロード
  useEffect(() => {
    const img = new Image();
    img.src = laserGunImg;
    laserImageRef.current = img;
  }, []);

  // リトライ時のリセット
  useEffect(() => {
    setPlayerX(200);
    setScore(0);
    setBullets([]);
    setEnemies([]);
    setGameOver(false);
    setGameClear(false);
    setBulletSources(1);
    setEliminatedCount(0);
    spawnCountRef.current = 0;
    startTimeRef.current = Date.now();
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

  // eliminatedCount に応じて弾発射源の数を更新（消えた敵が3匹ごとに＋1）
  useEffect(() => {
    // setBulletSources(Math.floor(eliminatedCount / 3) + 1);
    setBulletSources(Math.floor(eliminatedCount) + 1);
  }, [eliminatedCount]);

  // 弾の発射（500msごとに bulletSources 分発射）
  useEffect(() => {
    const bulletInterval = setInterval(() => {
      // 各発射源から弾を発射（発射源間の間隔は5px）
      const newBulletsToAdd = Array.from({ length: bulletSources }, (_, i) => ({
        x: playerXRef.current + 8 + i * 5,
        y: height - 40,
      }));
      setBullets((prev) => [...prev, ...newBulletsToAdd]);
    }, rate ? parseInt(rate) : 500); // rate があればその値、なければ 500ms
    // }, rate ? parseInt(rate) : 5);
    return () => clearInterval(bulletInterval);
  }, [bulletSources]);

  // 敵スポーン処理（1秒ごと）
  useEffect(() => {
    enemySpawnerRef.current = setInterval(() => {
      spawnCountRef.current++; // スポーン回数をカウント
      const elapsed = Date.now() - startTimeRef.current;
      let hp: number;
      if (elapsed >= 30000 && elapsed < 40000) {
        hp = Math.floor(Math.random() * 25) + 1; // 100～999
      } else if (elapsed >= 20000 && elapsed < 30000) {
        hp = Math.floor(Math.random() * 20) + 1; // 10～99
      } else if (elapsed >= 10000 && elapsed < 20000) {
        hp = Math.floor(Math.random() * 8) + 2; // 2～10
      } else {
        hp = Math.floor(Math.random() * 1) + 1; // 1～1 (10秒未満)
      }
      // spawnCount の3回に1回特殊な敵として isLaserGun を true にする
      const isLaserGun = spawnCountRef.current % 3 === 0;

      setEnemies((prev) => [
        ...prev,
        { x: Math.random() * (width - 50), y: 0, hp, isLaserGun },
      ]);
    }, 1000);

    const spawnAllEnemies = setTimeout(() => {
      setEnemies((prev) => {
        const newEnemies = [...prev];
        for (let i = 0; i < 30; i++) {
          newEnemies.push({
            x: Math.random() * (width - 20),
            y: 0,
            hp: Math.floor(Math.random() * 10) + 1,
          });
        }
        return newEnemies;
      });
      if (enemySpawnerRef.current) {
        clearInterval(enemySpawnerRef.current);
        enemySpawnerRef.current = null;
      }
    }, 39000);

    return () => {
      if (enemySpawnerRef.current) {
        clearInterval(enemySpawnerRef.current);
      }
      clearTimeout(spawnAllEnemies);
    };
  }, [refreshKey]);

  // ゲームループ & 衝突判定
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
      if (e.key === "ArrowLeft") leftPressedRef.current = false;
      if (e.key === "ArrowRight") rightPressedRef.current = false;
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
        context.fillText(lose, width / 2, height / 2);
        return;
      }
      if (gameClear) {
        context.fillStyle = "red";
        context.font = "bold 36px sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(win, width / 2, height / 2);
        return;
      }

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
      }

      let newBullets = [...updatedBullets];
      const newEnemies: Array<{ x: number; y: number; hp: number; isLaserGun?: boolean }> = [];
      // 衝突判定中の一例
      let localEliminated = 0; // ループ内カウンター
      updatedEnemies.forEach((enemy) => {
        const dieHp = die ? parseInt(die) : -10; // die が与えられていればその数値、なければ -10
        // const dieHp = die ? parseInt(die) : 0;
        const hit = newBullets.find(
          (b) =>
            b.x > enemy.x &&
            b.x < enemy.x + 30 &&
            b.y > enemy.y &&
            b.y < enemy.y + 30
        );
        if (hit) {
          setScore((s) => s + 1);
          // 敵へのダメージ処理
          newBullets = newBullets.filter((b) => b !== hit);
          const updatedEnemy = { ...enemy, hp: enemy.hp - 1 };
          if (updatedEnemy.hp > dieHp) {  // dieHp を使う
            newEnemies.push(updatedEnemy);
          } else {
            // 特殊敵の場合のみ eliminatedCount をアップ（ボーナス）
            if (enemy.isLaserGun) {
              localEliminated++; // カウントを一時更新
            }
          }
        } else {
          newEnemies.push(enemy);
        }
      });
      // 衝突判定ループ後、一度だけ状態更新
      if (localEliminated > 0) {
        setEliminatedCount((prev) => prev + localEliminated);
      }

       // 40秒以上経過かつ敵が全滅ならクリア
      if (Date.now() - startTimeRef.current >= 40000 && newEnemies.length === 0) {
      // if (Date.now() - startTimeRef.current >= 5000) {
        setGameClear(true);
        return;
      }

      setBullets(newBullets);
      setEnemies(newEnemies);

      // 描画前に背景をクリア
      context.clearRect(0, 0, canvas.width, canvas.height);
      // context.fillStyle = back ? back : "#808080"; // back があればそれを、なければグレー
      // context.fillRect(0, 0, canvas.width, canvas.height);

      // プレイヤー描画
      context.fillStyle = player ? player : "blue";
      context.fillRect(playerXRef.current, height - 40, playerWidth, 30);
      // 弾描画
      context.fillStyle = "red";
      newBullets.forEach((b) => context.fillRect(b.x, b.y, 4, 10));
      // 敵描画
      newEnemies.forEach((e) => {
        context.fillStyle = enemy ? enemy : "green";
        context.fillRect(e.x, e.y, 30, 30);
        // hp 数字描画
        context.fillStyle = "white";
        context.font = "bold 14px sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(e.hp.toString(), e.x + 15, e.y + 15);
        // 特殊敵ならレーザー銃画像を敵の上（例:敵より30px上、30px四方）に描画
        if (e.isLaserGun && laserImageRef.current) {
          context.drawImage(laserImageRef.current, e.x, e.y - 30, 30, 30);
        }
      });

      // Game Clear / Game Over
      if (gameClear) {
        context.fillStyle = "red";
        context.font = "bold 36px sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(win ? win : 'Game Clear', width / 2, height / 2);
        return;
      }
      if (gameOver) {
        context.fillStyle = "red"; 
        context.font = "bold 36px sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(lose ? lose : 'Game Over', width / 2, height / 2);
        return;
      }
    };

    const interval = setInterval(gameLoop, 30);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameOver, gameClear, refreshKey]);

  return (
    <div
    style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: back ? back : 'black', // ← ここで全体の背景色を設定
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        width: "800px",
        height: "650px",
        backgroundColor: back ? back : 'black',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 className="text-xl font-bold">Score: {score}</h1>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border block"
      />
      <div className="flex flex-row items-center gap-4 mt-4">
        <button className="p-2 border border-white">
          <NavLink
            to={{ pathname: "/result", search: `?id=${id}&name=${name}
            &die=${die}&rate=${rate}&player=${player}&enemy=${enemy}
            &beam=${beam}&back=${back}&win=${win}&lose=${lose}&source=tettin` }}
            className="text-blue-500 hover:underline"
            state={id == "me4"}
          >
            結果
          </NavLink>
        </button>
        {/* <h1 className="text-xl">プログラミング</h1> */}

        <button
          type="button"
          onClick={() => {
            setPlayerX(400);
            setScore(0);
            setBullets([]);
            setEnemies([]);
            setRefreshKey((prev) => prev + 1);
          }}
          className="p-2 border"
        >
          リトライ
        </button>
      </div>
    </div>
  </div>
    
  );
};

export default Game;