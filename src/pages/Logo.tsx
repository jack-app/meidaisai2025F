
import styles from "./Logo.module.css";
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // 画面遷移用
import './Firststory.css'; // 専用のCSSファイルをインポート

const MESSAGE = "MEいTAい祭";

export default function LogoAnimation() {
  const [visibleIndex, setVisibleIndex] = useState<number>(-1);
  const [finalVisible, setFinalVisible] = useState<boolean>(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setVisibleIndex(index);
      index++;
      if (index >= MESSAGE.length) {
        clearInterval(interval);
        setTimeout(() => {
          setFinalVisible(true);
        }, 1000);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        {MESSAGE.split("").map((char, i) => (
          <span
            key={i}
            className={`${styles.char} ${
              visibleIndex >= i
                ? finalVisible
                  ? styles.hidden
                  : styles.visible
                : ""
            }`}
          >
            {char}
          </span>
        ))}
      </div>
      {finalVisible && (
        <div className={styles.finalPop}>{MESSAGE}</div>
      )}
    </div>
  );
}