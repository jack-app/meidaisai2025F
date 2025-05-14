import { NavLink, useLocation } from "react-router-dom";

export const Program = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const id = query.get("id"); // "123"
  const name = query.get("name"); // "まっつん"
  return (
    <div className="program">
      <NavLink to={{ pathname: "/result", search: `?id=${id}&name=${name}` }}>結果</NavLink>
      <h1>プログラミング</h1>
    </div>
  );
};