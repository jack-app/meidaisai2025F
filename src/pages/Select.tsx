import { NavLink, useLocation } from "react-router-dom";
import styles from './Select.module.css';

export const Select = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  /* セレクト画面を作ろう！ */

  const id = query.get("id") || "me"
  const name = query.get("name") || "まっつんくん"

  // 第一段階で渡してほしいもの
  //敵の数字が0になったら消える：数字が-10で消えるようにしておく
  //与えられてないとき、die:500（クリアできない）
  //最初は1から10の敵しか出現しない
  const die = query.get("die") || "-10";

  // 第二段階で渡してほしいもの
  //弾の頻度：数字（何ミリ秒に一回か）
  //与えられてないとき,rate:500（最初の方しかクリアできない）
  const rate = query.get("rate") || "500";

  // 完成段階で私てほしいもの
  //敵enemy、味方player、ビームbeam、背景の色back：'red'などテキスト
  //与えられてない場合enemy'green',player'blue',beam'red',back'black'
  //勝利お祝いコメントwin、敗北煽りコメントlose：'Game Over'などテキスト
  //与えられてない場合win'Game Clear',lose'Game Over'

  const playter = query.get("player") || "blue";
  const enemy = query.get("enemy") || "green";
  const beam = query.get("beam") || "red";
  const back = query.get("back") || "black";
  const win = query.get("win") || "Game Clear";
  const lose = query.get("lose") || "Game Over";

  const handleGameSelect = (pathname: string, searchParams: string) => {
    window.location.href = `${pathname}?${searchParams}`;
  };

  return (
    <div className={styles.select}>
      <div className={styles.container}>
        <h1 className={styles.title}>ゲームを選ぼう！</h1>
        
        <div className={styles.gameGrid}>
          <div className={styles.gameCard}>
            <div className={styles.gamePreview} style={{backgroundImage: 'url(/game_preview1.jpg)'}}>
              <div className={styles.gameOverlay}>
                <h2 className={styles.gameTitle}>ポーション作りゲーム</h2>
                <button 
                  className={styles.playButton}
                  onClick={() => handleGameSelect('/select-tyupei', `id=${id}&name=${name}`)}
                >
                  プレイ
                </button>
              </div>
            </div>
          </div>

          <div className={styles.gameCard}>
            <div className={styles.gamePreview} style={{backgroundImage: 'url(/game_preview2.jpg)'}}>
              <div className={styles.gameOverlay}>
                <h2 className={styles.gameTitle}>シューティングゲーム</h2>
                <button 
                  className={styles.playButton}
                  onClick={() => handleGameSelect('/programTettin', `id=${id}&name=${name}&die=${die}&rate=${rate}&player=${playter}&enemy=${enemy}&beam=${beam}&back=${back}&win=${win}&lose=${lose}`)}
                >
                  プレイ
                </button>
              </div>
            </div>
          </div>

          <div className={styles.gameCard}>
            <div className={styles.gamePreview} style={{backgroundImage: 'url(/game_preview3.jpg)'}}>
              <div className={styles.gameOverlay}>
                <h2 className={styles.gameTitle}>ののじ探しゲーム</h2>
                <button 
                  className={styles.playButton}
                  onClick={() => handleGameSelect('/select-alto', `id=${id}&name=${name}`)}
                >
                  プレイ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};