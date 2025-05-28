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
        <h1>選択肢１</h1>
        <NavLink to={{ pathname: "/program", search: `?id=${id}&name=${name}` }}>リンク１</NavLink>
        </div>
      </div>

      <div className={styles.box_2}>
        <div>
       <h1>選択肢２</h1>
       リンク２
       </div>
      </div>
      
      <div className={styles.box_3}>
        <div>
        <h1>選択肢３</h1>
        リンク３
        </div>
      </div>

    </div>
  );
};


