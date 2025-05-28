import '../grimoire.css';
import { useState } from "react";
import '../potion-images.css';
export const PotionCreate = () => {
  // 仮のアイテムリスト
  const items = [
    { id: 1, name: "薬草" },
    { id: 2, name: "動物の毛皮" },
    { id: 3, name: "魔法石" },
    { id: 4, name: "水" }
  ];

  // 各ボックスに格納されたアイテムID
  const [boxes, setBoxes] = useState<(number | null)[]>([1, 2, 3, 4]);

  // ボックス内のアイテムをクリックしたときの処理（例：取り出す）
  const handleRemoveItem = (boxIndex: number) => {
    const newBoxes = [...boxes];
    newBoxes[boxIndex] = null;
    setBoxes(newBoxes);
  };

  return (
    <div className="potion-create" style={{ display: "flex", gap: "32px" }}>
    <div className='potion-images'> 
  　{/* パズルボックス */}
      <div style={{ display: "flex", gap: "16px" }}>
        {boxes.map((itemId, idx) => (
          <div
            key={idx}
            style={{
              width: "80px",
              height: "80px",
              border: "2px dashed #888",
              borderRadius: "12px",
              background: "#faf8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1em"
            }}
          >
            {itemId ? (
              <button
                style={{
                  width: "70px",
                  height: "70px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#cfc",
                  cursor: "pointer",
                  fontSize: "1em"
                }}
                onClick={() => handleRemoveItem(idx)}
              >
                {items.find(i => i.id === itemId)?.name}
              </button>
            ) : (
              "空"
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}