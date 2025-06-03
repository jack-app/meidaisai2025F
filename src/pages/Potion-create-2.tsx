import './css/grimoire.css';
import { useState } from "react";
import './css/potion-puzzlebox.css';
import { useNavigate } from "react-router-dom";
//ボックス内の画像
import herbImg from '../assets/24841317.jpg';
import animalImg from '../assets/kegawa.jpg';
import yellowwaterImg from '../assets/黄色い液体 2025-05-25 225506.png';
import waterImg from '../assets/26261624.jpg';
import './css/Potion-create2-button.css';
import magicStoneImg from '../assets/magicstoneImg.png';

export const PotionCreate2 = () => {
  // 仮のアイテムリスト
  const items = [
    { id: 1, name: "薬草" },
    { id: 2, name: "動物" },
    { id: 3, name: "謎の黄色い液体" },
    { id: 4, name: "水" },
    { id: 5, name: "魔法石" },
  ];
 const [showHint, setShowHint] = useState(true);
  // 各ボックスに格納されたアイテムID
  const [boxes, setBoxes] = useState<(number | null)[]>([1, 2, 3, 4, 5]); // 5枠に拡張
  // 追加のボックス
  const [extraBoxes, setExtraBoxes] = useState<(number | null)[]>([null, null, null]);

  // 移動用の一時保存インデックス
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  // テキストボックス用のstate
  const [memo, setMemo] = useState("");

  // ポーション画像のstate
  const [selectedPotionImg, setSelectedPotionImg] = useState<string>(""); // 初期値を空文字に

  // 画像選択ボタンの表示状態
  const [showColorButtons, setShowColorButtons] = useState(false);

  

  const navigate = useNavigate();

  const itemImages: { [key: number]: string } = {
    1: herbImg, // 薬草
    2: animalImg, // 動物
    3: yellowwaterImg, // 謎の黄色い液体
    4: waterImg, // 水
    5: magicStoneImg, // 魔法石
  };

  // ボックスが押されたときの処理
  const handleBoxClick = (boxIndex: number, isExtra: boolean = false) => {
    if (selectedBox === null) {
      setSelectedBox(boxIndex + (isExtra ? 100 : 0));
    } else {
      let newBoxes = [...boxes];
      let newExtraBoxes = [...extraBoxes];
      let fromIdx = selectedBox;
      let toIdx = boxIndex + (isExtra ? 100 : 0);
      if (fromIdx < 100 && toIdx < 100) {
        // 通常ボックス同士
        const temp = newBoxes[fromIdx];
        newBoxes[fromIdx] = newBoxes[toIdx];
        newBoxes[toIdx] = temp;
        setBoxes(newBoxes);
      } else if (fromIdx >= 100 && toIdx >= 100) {
        // エクストラ同士
        fromIdx -= 100;
        toIdx -= 100;
        const temp = newExtraBoxes[fromIdx];
        newExtraBoxes[fromIdx] = newExtraBoxes[toIdx];
        newExtraBoxes[toIdx] = temp;
        setExtraBoxes(newExtraBoxes);
      } else if (fromIdx < 100 && toIdx >= 100) {
        // 通常→エクストラ
        toIdx -= 100;
        const temp = newBoxes[fromIdx];
        newBoxes[fromIdx] = newExtraBoxes[toIdx];
        newExtraBoxes[toIdx] = temp;
        setBoxes(newBoxes);
        setExtraBoxes(newExtraBoxes);
      } else if (fromIdx >= 100 && toIdx < 100) {
        // エクストラ→通常
        fromIdx -= 100;
        const temp = newExtraBoxes[fromIdx];
        newExtraBoxes[fromIdx] = newBoxes[toIdx];
        newBoxes[toIdx] = temp;
        setBoxes(newBoxes);
        setExtraBoxes(newExtraBoxes);
      }
      setSelectedBox(null);
    }
  };

  // 調合ボタンのクリック処理
  const handleMix = () => {
    // オレンジ色画像が選択されているか
    const isOrange =
      selectedPotionImg === '/なりきりドリンク.png' ||
      selectedPotionImg.endsWith('なりきりドリンク.png');
    // extraBoxesに水(4), 魔法石(5), 動物(2)が全て含まれているか
    const required = [4, 5, 2];
    const hasAll = required.every(id => extraBoxes.includes(id));
    if (isOrange && hasAll) {
      navigate("/potion-create-result2?result=success");
    } else {
      navigate("/potion-create-result2?result=failure");
    }
  };

  return (
    <div className="potion-create2" style={{ display: "flex", gap: "32px" }}>
       {/* 追加: 最前面ヒントボタン */}
      {showHint && (
        <button
          style={{
            border: "2px solid black",
            fontSize: "1.5em",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
          }}
          onClick={() => setShowHint(false)}
        >
          文章を読み解き、適切な"材料"と"画像"を選ぼう！<br/>
                 (説明を閉じる)
        </button>
      )}
      {/* 左側に説明テキストを追加 
      <div>
        <div style={{
          fontFamily: 'Caveat, Yu Mincho, 游明朝, serif, cursive',
          color: '#5B3A1B',
          fontSize: '2.5em',
          fontWeight: 'bold',
          letterSpacing: '0.08em',
          marginBottom: '0.5em',
          left: '15% ',
          top: '3%',
          position: 'absolute',
          lineHeight: 1.1
        }}>
          なりきりドリンク
        </div>
       
        <div style={{
          fontFamily: 'Yu Mincho, 游明朝, serif',
          color: '#5B3A1B',
          fontSize: '1.4em',
          lineHeight: 1.7,
          position: 'absolute',
          top: '10%',
          left: '17%',
        }}>
         飲めば変身？変幻自在の一滴 <br/>
         
        </div>
        <div style={{
          fontFamily: 'Yu Mincho, 游明朝, serif',
          color: '#5B3A1B',
          fontSize: '1.5em',
          lineHeight: 1.7,
          position: 'absolute',
          top: '27%',
          left: '7%',
        }}>
        煌めくオレンジの液体が、瓶の中でゆらめく――<br/>
        魔法石の力と、変身したい対象の一部が調和し、<br/>
        飲む人の姿を自在に変える。一口飲めば、まるで<br/>
        鏡の中の別人。声も仕草もそっくりに。しかし<br/>
        時が満ちれば、元の姿に戻るだろう。<br/>
        </div>
    </div>

      <div id="txt-on-grimoire">
      </div>
      <br/>
    {/*<div className="potion-create-text">
      <textarea
        value={memo}
        onChange={(e) => {
          setMemo(e.target.value)
          const txtOnGrimoire = document.getElementById("txt-on-grimoire");
          if (txtOnGrimoire) {
            txtOnGrimoire.innerText = e.target.value
          }
        }}
        style={{
          height: "0px",
          width: "0px",
          padding:"0px",
          margin:"0px",
          border:"0px",
          background:"none",
        }}
      />
      </div>
    {/*<div className="potion-images2"></div> */}


    {/* 通常のパズルボックス */}
    <div className="puzzle-box-container">
      {boxes.map((itemId, idx) => (
        <div
          key={"main-" + idx}
          className={"puzzle-box" + (selectedBox === idx ? " selected" : "")}
        >
          <button
            onClick={() => handleBoxClick(idx, false)}
            style={{ width: '70px', height: '70px', background: 'transparent', border: 'none', padding: 0 }}
          >
            {itemId ? (
              <img src={itemImages[itemId]} alt={items.find(i => i.id === itemId)?.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
            ) : (
              ''
            )}
          </button>
        </div>
      ))}
    </div>
    {/* 追加のパズルボックス */}
    <div className="extra-puzzle-box-container">
      {extraBoxes.map((itemId, idx) => (
        <div
          key={"extra-" + idx}
          className={"extra-puzzle-box" + (selectedBox === idx + 100 ? " selected" : "")}
        >
          <button
            onClick={() => handleBoxClick(idx, true)}
            style={{ width: '70px', height: '70px', background: 'transparent', border: 'none', padding: 0 }}
          >
            {itemId ? (
              <img src={itemImages[itemId]} alt={items.find(i => i.id === itemId)?.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
            ) : (
              ''
            )}
          </button>
        </div>
      ))}
    </div>
    {/* 調合ボタン */}
    <div>
      <button className="btn-magicgame" style={{left:'75%'}} onClick={handleMix}>調合</button>
    </div>
    {/* 画像選択ボタンを画面右上に配置 */}
    <div>
      {!showColorButtons && !selectedPotionImg ? (
        <button
          className="potion-create2-button"
          onClick={() => setShowColorButtons(true)}
        >
          画像を選択
        </button>
      ) : null}
      {showColorButtons && !selectedPotionImg && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', top: '17%', right: '21%', position: 'absolute' }}>
          <button
            style={{ background: '#ffb347' }}
            onClick={() => {
              setSelectedPotionImg('/なりきりドリンク.png');
              setShowColorButtons(false);
            }}
          >
            オレンジ色
          </button>
          <button
            style={{ background: '#7be07b' }}
            onClick={() => {
              setSelectedPotionImg('/green-potion.jpg');
              setShowColorButtons(false);
            }}
          >
            緑色
          </button>
          <button
            style={{ background: '#6ec6ff' }}
            onClick={() => {
              setSelectedPotionImg('/blue-potion-image.png');
              setShowColorButtons(false);
            }}
          >
            青色
          </button>
        </div>
      )}
      {selectedPotionImg && (
        <img
          src={selectedPotionImg}
          style={{ width: '18%', height: '40%', top:'10%', right: '15%', position: 'absolute',  backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        />
      )}
    </div>
    {/* ポーション画像表示部分はselectedPotionImgをそのまま使う */}
    </div>
  );
}