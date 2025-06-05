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

  return (
    <div className={styles.select}>
      <div className={styles.box_1}>
        <div>
        <h2>ポーション作りゲーム</h2>
        ここに説明を入力<br></br>
        {/* ゲームの製作者の名前のせるのはいかが？「メタ要素」として */}
       <h2><NavLink to={{ pathname: "/select-tyupei", search: `?id=${id}&name=${name}` }}>プレイ</NavLink></h2>
        </div>
      </div>

      <div className={styles.box_2}>
        <div>
       <h2>シューティングゲーム</h2>
       ここに説明を入力<br></br>
       <h2><NavLink to={{ pathname: "/programTettin", search: `?id=${id}&name=${name}&die=${die}&rate=${rate}&player=${playter}&enemy=${enemy}&beam=${beam}&back=${back}&win=${win}&lose=${lose}` }}>プレイ</NavLink></h2>
       </div>
      </div>
      
      <div className={styles.box_3}>
        <div>
        <h2>ゲーム画像３</h2>
        <NavLink to="/title">戻る</NavLink> 
        <h2>ののじ探しゲーム</h2>
        ここに説明を入力<br></br>
        <h2><NavLink to={{ pathname: "/select-alto", search: `?id=${id}&name=${name}` }}>プレイ</NavLink></h2>
        </div>
      </div>

    </div>

    
  );
};

