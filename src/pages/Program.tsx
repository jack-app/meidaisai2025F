import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom"

export const Program = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const id = query.get("id"); // "123"
  const name = query.get("name"); // "まっつん"
  return (
    <div className="program">
      <NavLink to={{ pathname: "/result", search: `?id=${id}&name=${name}` }}>結果(こちら側を押すと失敗画面へ移動します)</NavLink><br></br>
      <Link to="/result" state={{ state: ["Success"] }}>
        結果ページへ(こちら側を押すと成功画面へ移動します)
      </Link>
      <h1>プログラミング</h1>
    </div>
  );
};