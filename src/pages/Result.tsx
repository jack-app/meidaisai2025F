import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import fatal from './ResultImage/Fatalerror.png';
import success from './ResultImage/Success.png';

export const Result = () => {
  // URLパラメータとstateを取得
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const { state } = location;

  // 初期値は空の配列に設定
  const [result, setResult] = useState<string[]>([]);

  const id = query.get("id");
  const name = query.get("name");

  // コンポーネントマウント時にstateから値を取得
  useEffect(() => {
    if (state && state.state) {
      setResult(state.state);
    }
  }, [state]);

  return (
    <div className="result">
      {state ? (
        <div>
          <h1>リザルト</h1>
          <ul>
            {state.state.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
            <img src={success} className="Success" alt="success" />
          </ul>
          <NavLink to={{ pathname: "/select", search: `?id=${id}&name=${name}` }}>
            選択へ
          </NavLink>
        </div>
      ) : (
        <div>
          <h1>No state</h1>
          <img src={fatal} className="Fatal" alt="fatal" />
          <NavLink to={{ pathname: "/program", search: `?id=${id}&name=${name}` }}>プログラミングへ</NavLink>
        </div>
      )}
    </div>
  );
};