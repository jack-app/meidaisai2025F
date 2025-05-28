import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import fatal from './ResultImage/Fatalerror.png';
import success from './ResultImage/Success.png';
import cracker from './ResultImage/cracker.png';
import crackermigi from './ResultImage/crackermigi.png';
import { motion } from 'framer-motion';

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
        <motion.div initial={{ opacity: 0, scale: 0, x: 0 }} animate={{ opacity: 1, scale: 1 ,x:0}} transition={{ duration: 1 }} style={{ position: "relative", display: "inline-block" }}>
          {/* <h1>リザルト</h1> */}
          <ul>
           {/*  {state.state.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))} */}
            <img src={cracker} className="Cracker" alt="cracker" style={{position: 'absolute',
            bottom: '-200px',
            left: '-200px',
            padding: '15px 20px',
            borderRadius: '4px',width: 300, height: 250}}/>
            <img src={crackermigi} className="Crackermigi" alt="crackermigi" style={{position: 'absolute',
            bottom: '-200px',
            right: '-200px',
            padding: '15px 20px',
            borderRadius: '4px',width: 250, height: 250}}/>
            <img src={success} className="Success" alt="success" style={{width: 800, height: 350}}/>
          </ul>
          <NavLink to={{ pathname: "/select", search: `?id=${id}&name=${name}` }}>
          <button
          style={{
            position: 'absolute',
            bottom: '51px',
            right: '35px',
            padding: '15px 20px',
            borderRadius: '4px',
            /* border: '1px solid #808080',
            backgroundColor: '#ffffff', */
            border: '1px solid #1e90ff',
            backgroundColor: '#1e90ff',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            width: '150px',
            height: '40px',
          }}
          >
          OK
        </button>
          </NavLink>
        </motion.div>
      ) : (
        <div style={{ position: "relative", display: "inline-block" }}>
          {/* <h1>No state</h1> */}
          <img src={fatal} className="Fatal" alt="fatal" style={{width: 900, height: 350}}/>
          <NavLink to={{ pathname: "/program", search: `?id=${id}&name=${name}` }}>
          <button
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '50px',
            padding: '17px 20px',
            borderRadius: '4px',
            /*border: '1px solid #808080',
            backgroundColor: '#ffffff',*/
            border: '1px solid #1e90ff',
            backgroundColor: '#1e90ff',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            width: '150px',
            height: '40px',
          }}
        >
          OK
        </button></NavLink>
        <div>
          <h1>No state</h1>
          <img src={fatal} className="Fatal" alt="fatal" />
          <NavLink to={{ pathname: "/program", search: `?id=${id}&name=${name}` }}>プログラミングへ</NavLink>
          <NavLink to={{ pathname: "/programAlto", search: `?id=${id}&name=${name}` }}>プログラミングおるとへ</NavLink>
        </div>
      )}
    </div>
  );
};
