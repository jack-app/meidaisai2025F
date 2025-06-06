import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import cracker from './ResultImage/cracker.png';
import crackermigi from './ResultImage/crackermigi.png';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

export const Result = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const { state } = location;
  let id = query.get("id");
  const name = query.get("name");
  // 第一段階で渡してほしいもの
  //敵の数字が0になったら消える：数字が-10で消えるようにしておく
  //与えられてないとき、die:500（クリアできない）
  //最初は1から10の敵しか出現しない
  const die = query.get("die") || "500";
  
  // 第二段階で渡してほしいもの
  //弾の頻度：数字（何ミリ秒に一回か）
  //与えられてないとき,rate:500（最初の方しかクリアできない）
  const rate = query.get("rate") || "500";
  
  // 完成段階で私てほしいもの
  //敵enemy、味方player、ビームbeam、背景の色back：'red'などテキスト
  //与えられてない場合enemy'green',player'blue',beam'red',back'black'
  //勝利お祝いコメントwin、敗北煽りコメントlose：'Game Over'などテキスト
  //与えられてない場合win'Game Clear',lose'Game Over'

  const player = query.get("player") || "blue";
  const enemy = query.get("enemy") || "green";
  const beam = query.get("beam") || "red";
  const back = query.get("back") || "black";
  const win = query.get("win") || "Game Clear";
  const lose = query.get("lose") || "Game Over";
  const source = query.get("source") || "program";


  let returnPath = "/select";
  if (source === "tettin") {
    if (id === "me") { 
      returnPath = "/select-tettin1";
      id = "me2"
    } else if (id === "me2") {
      returnPath = "/select-tettin2";
      id = "me3";
    } else if (id === "me3") {
      returnPath = "/select-tettin3";
      id = "me4";
    } else if (id === "me4") {
      id = "me";
    }
    
  } else if (source === "tyupei") {
    returnPath = "/program";
  }

  const { width, height } = useWindowSize();

  const popOutAnimation = {
    initial: { opacity: 0, scale: 0.5, y: 50 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.5, type: "spring", stiffness: 150, damping: 20 }
  };

  const numberOfErrorWindows = 15;

  const errorWindowContainerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const errorWindowVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      rotate: Math.random() * 40 - 20,
    },
    show: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: { type: 'spring', stiffness: 120, damping: 12 },
    },
  };

  // --- システムウィンドウ風UIのスタイル定義 ---
  const commonWindowStyle = {
    width: '550px', // ウィンドウの幅を拡大 (以前は450px)
    minHeight: '280px', // ウィンドウの最小高さを拡大 (以前は200px)
    backgroundColor: '#ffffff',
    border: '1px solid #c5c5c5',
    borderRadius: '10px', // 少し角丸を大きく
    boxShadow: '0 8px 25px rgba(0,0,0,0.25)', // 影を少し強調
    display: 'flex',
    flexDirection: 'column' as 'column',
    overflow: 'hidden',
  };

  const titleBarStyle = {
    padding: '8px 15px', // パディング調整
    borderBottom: '1px solid #c5c5c5',
    minHeight: '24px', // タイトルバーの高さを少し調整
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px', // フォントサイズ調整
    color: '#333',
  };

  const contentStyle = {
    padding: '30px 25px', // パディングを拡大 (以前は20px)
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as 'center',
  };

  const mainTextStyle = {
    fontSize: '34px', // メインテキストのフォントサイズを拡大 (以前は28px)
    fontWeight: 'bold',
    marginBottom: '15px', // マージン調整
  };

  const subTextStyle = {
    fontSize: '18px', // サブテキストのフォントサイズを拡大 (以前は16px)
    color: '#555',
    lineHeight: 1.6, // 行間調整
  };

  const footerStyle = {
    padding: '15px 25px', // パディング調整
    display: 'flex',
    justifyContent: 'flex-end',
    borderTop: '1px solid #e0e0e0',
    backgroundColor: '#f9f9f9'
  };

  const systemButtonStyle = {
    padding: '8px 25px', // ボタンのパディングを拡大 (以前は6px 20px)
    borderRadius: '5px', // ボタンの角丸調整
    border: '1px solid #adadad',
    backgroundColor: '#f0f0f0',
    color: '#333',
    fontSize: '15px', // ボタンのフォントサイズを拡大 (以前は14px)
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  };

  const successWindowStyle = {
    ...commonWindowStyle,
    backgroundColor: '#f7f7f7',
  };
  const successTitleBarStyle = {
    ...titleBarStyle,
    backgroundColor: '#e8e8e8',
  };
  const successMainTextStyle = {
    ...mainTextStyle,
    color: '#28a745',
  };

  const errorWindowStyle = {
    ...commonWindowStyle,
    backgroundColor: '#fff0f0',
  };
  const errorTitleBarStyle = {
    ...titleBarStyle,
    backgroundColor: '#f8d7da',
    color: '#721c24',
  };
  const errorMainTextStyle = {
    ...mainTextStyle,
    color: '#dc3545',
  };
  const errorSubTextStyle = {
    ...subTextStyle,
    color: '#721c24',
  };


  return (
    <div
      className="result"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: state ? 'rgba(0,0,0,0.1)' : 'rgba(95, 45, 45, 0.6)',
      }}
    >
      {state && (
        <>
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={600} // 紙吹雪の量はウィンドウサイズとは直接関係ないため維持
            tweenDuration={10000}
            confettiSource={{ x: 0, y: 100, w: width, h: 0 }} // 発生源を画面上部全体に
            style={{ zIndex: 0, position: 'fixed' }}
          />
          <img
            src={cracker}
            alt="cracker"
            style={{
              position: 'fixed',
              bottom: '20px',
              left: '20px',
              width: 200,
              height: 'auto',
              zIndex: 2,
            }}
          />
          <img
            src={crackermigi}
            alt="crackermigi"
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: 180,
              height: 'auto',
              zIndex: 2,
            }}
          />
          <motion.div
            initial={popOutAnimation.initial}
            animate={popOutAnimation.animate}
            transition={popOutAnimation.transition}
            style={{ ...successWindowStyle, zIndex: 1 }}
          >
            <div style={successTitleBarStyle}>
            </div>
            <div style={contentStyle}>
              <div style={successMainTextStyle}>Success</div>
              <div style={subTextStyle}>エラーはありませんでした</div>
            </div>
            <div style={footerStyle}>
              <NavLink to={{ pathname: "/", search: `?id=${id}&name=${name}
            &die=${die}&rate=${rate}&player=${player}&enemy=${enemy}
            &beam=${beam}&back=${back}&win=${win}&lose=${lose}&source=tettin` }}>
                <button style={systemButtonStyle}>OK</button>
              </NavLink>
            </div>
          </motion.div>
        </>
      )}

      {!state && (
        <>
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 0,
              pointerEvents: 'none',
            }}
            variants={errorWindowContainerVariants}
            initial="hidden"
            animate="show"
          >
            {Array.from({ length: numberOfErrorWindows }).map((_, index) => (
              <motion.div
                key={index}
                variants={errorWindowVariants}
                style={{
                  position: 'absolute',
                  width: `${Math.random() * 100 + 80}px`,
                  height: `${Math.random() * 60 + 50}px`,
                  backgroundColor: 'rgba(200, 50, 50, 0.65)',
                  border: '1px solid darkred',
                  borderRadius: '6px',
                  boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                  top: `${Math.random() * 85 + 2}%`,
                  left: `${Math.random() * 85 + 2}%`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                  padding: '2px',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{
                  width: '100%',
                  height: '18px',
                  backgroundColor: 'darkred',
                  borderTopLeftRadius: '5px',
                  borderTopRightRadius: '5px',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '4px',
                  boxSizing: 'border-box',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', fontWeight: 'bold' }}>×</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={popOutAnimation.initial}
            animate={popOutAnimation.animate}
            transition={popOutAnimation.transition}
            style={{ ...errorWindowStyle, zIndex: 1 }}
          >
            <div style={errorTitleBarStyle}>
            </div>
            <div style={contentStyle}>
              <div style={errorMainTextStyle}>Fatal error!</div>
              <div style={errorSubTextStyle}>
                まだ
                <ruby>
                  未完成
                  <rt style={{ fontSize: '0.7em' }}>みかんせい</rt> {/* ルビのフォントサイズを少し小さめに調整 */}
                </ruby>
                なところがあるようです
              </div>
            </div>
            <div style={footerStyle}>
              <NavLink to={{ pathname: returnPath, search: location.search }}>
                <button style={systemButtonStyle}>OK</button>
              </NavLink>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};