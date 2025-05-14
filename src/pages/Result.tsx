import { NavLink, useLocation } from "react-router-dom";

export const Result = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const id = query.get("id"); // "123"
  const name = query.get("name"); // "まっつん"
  return (
    <div className="result">
      <NavLink to={{ pathname: "/select", search: `?id=${id}&name=${name}` }}>プログラミングへ</NavLink>
      <h1>リザルト</h1>
    </div>
  );
};