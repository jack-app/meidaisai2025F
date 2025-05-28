import { NavLink, useLocation } from "react-router-dom";

import styles from './Select.module.css';

export const Select = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  /* セレクト画面を作ろう！ */

  const id = query.get("id") || "me"
  const name = query.get("name") || "まっつんくん"
  return (
    <div className={styles.select}>
      <div className={styles.box_1}>
        <div>
        <h2>ゲーム画像１</h2>
        ここに説明を入力<br></br>
       <h2><NavLink to={{ pathname: "/program", search: `?id=${id}&name=${name}` }}>プレイ</NavLink></h2>
        </div>
      </div>

      <div className={styles.box_2}>
        <div>
       <h2>ゲーム画像２</h2>
       ここに説明を入力<br></br>
       <h2><NavLink to={{ pathname: "/program", search: `?id=${id}&name=${name}` }}>プレイ</NavLink></h2>
       </div>
      </div>
      
      <div className={styles.box_3}>
        <div>
        <h2>ゲーム画像３</h2>
        ここに説明を入力<br></br>
        <h2><NavLink to={{ pathname: "/program", search: `?id=${id}&name=${name}` }}>プレイ</NavLink></h2>
        </div>
      </div>

    </div>
  );
};

