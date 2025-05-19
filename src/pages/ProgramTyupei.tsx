import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom"

export const ProgramTyupei = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const id = query.get("id"); // "123"
  const name = query.get("name"); // "まっつん"
  return (
    <div className="program">
      <NavLink to={{ pathname: "/result", search: `?id=${id}&name=${name}` }}>結果</NavLink>
      <Link to="/result" state={{ state: ["Success"] }}>
        結果ページへ(ここのコメントアウト外して「結果ページへ」の方のリンクを押すとResultページにstate: ["Success"]が表示されます)
      </Link>
      <h1>プログラミングちゅーぺい</h1>
    </div>
  );
};