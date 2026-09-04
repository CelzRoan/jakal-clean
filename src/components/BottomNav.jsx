import { NavLink } from "react-router-dom";
import "./BottomNav.css";

const items = [
  { to: "/home", icon: "home", label: "Home" },
  { to: "/search", icon: "search", label: "Search" },
  { to: "/saved", icon: "bookmark", label: "Saved" },
  { to: "/profile", icon: "person", label: "Profile" },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => "bottom-nav__item" + (isActive ? " is-active" : "")}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="bottom-nav__label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
