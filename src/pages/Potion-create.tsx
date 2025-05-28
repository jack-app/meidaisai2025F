import '../grimoire.css';
import { useState } from "react";
import '../potion-images.css';
import '../potion-puzzlebox.css';
import { useNavigate } from "react-router-dom";
//ボックス内の画像
import herbImg from '../24841317.jpg';
import animalImg from '../kegawa.jpg';
import yellowwaterImg from '../黄色い液体 2025-05-25 225506.png';
import waterImg from '../26261624.jpg';
import magicStoneImg from '../magicstoneImg.png';
export const PotionCreate = () => {
  // 仮のアイテムリスト
  const items = [
    { id: 1, name: "薬草" },
    { id: 2, name: "動物" },
    { id: 3, name: "謎の黄色い液体" },
    { id: 4, name: "水" },
    { id: 5, name: "魔法石" }
  ];

  // 各ボックスに格納されたアイテムID
  const [boxes, setBoxes] = useState<(number | null)[]>([1, 2, 3, 4, 5]); // 5枠に拡張
  // 追加のボックス
  const [extraBoxes, setExtraBoxes] = useState<(number | null)[]>([null, null, null]);

  // 移動用の一時保存インデックス
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  // テキストボックス用のstate
  const [memo, setMemo] = useState("");

  const navigate = useNavigate();

  const itemImages: { [key: number]: string } = {
    1: herbImg, // 薬草
    2: animalImg, // 動物
    3: yellowwaterImg, // 謎の黄色い液体
    4: waterImg, // 水
    5: magicStoneImg, // 魔法石（仮：謎の黄色い液体と同じ画像を使用、必要なら差し替え）
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
    // extraBoxesに水(4), 薬草(1), 謎の黄色い液体(3)が全て含まれているか
    const required = [1, 3, 4];
    const hasAll = required.every(id => extraBoxes.includes(id));
    if (hasAll) {
      navigate("/potion-create-result?result=success");
    } else {
      navigate("/potion-create-result?result=failure");
    }
  };

  return (
    <div className="potion-create" style={{ display: "flex", gap: "32px" }}>
      {/* 左側に説明テキストを追加 */}
      
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
            マッハ回復薬
          </div>
         
          <div style={{
            fontFamily: 'Yu Mincho, 游明朝, serif',
            color: '#5B3A1B',
            fontSize: '1.4em',
            lineHeight: 1.7,
            position: 'absolute',
            top: '11%',
            left: '14%',
          }}>
            痛みに負けず、また立ち上がる<br/>
           
          </div>
          <div style={{
            fontFamily: 'Yu Mincho, 游明朝, serif',
            color: '#5B3A1B',
            fontSize: '1.7em',
            lineHeight: 1.7,
            position: 'absolute',
            top: '27%',
            left: '7%',
          }}>
           いかにも苦そうな緑色。一口飲めば<br/>
           効果を実感できるだろう。水の入った<br/>
           ビンに薬草を入れじっくり煮詰める<br/>
           謎の黄色い液体を入れるのがポイント<br/>
          
          </div>
      </div>

        <div id="txt-on-grimoire">
        </div>
        <br/>
      <div className="potion-create-text">
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

      <div className='potion-images'></div>
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
    </div>
  );
}