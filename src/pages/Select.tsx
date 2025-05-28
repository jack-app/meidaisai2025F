import { NavLink, useLocation } from "react-router-dom";

export const Select = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const id = query.get("id") || "me"
  const name = query.get("name") || "まっつんくん"
  return (
    <div className="select">
      <NavLink to={{ pathname: "/program", search: `?id=${id}&name=${name}` }}>プログラミングへ</NavLink>
      <h1>選択</h1>
    </div>
  );
};