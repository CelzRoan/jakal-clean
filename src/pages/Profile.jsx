import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import BottomNav from "../components/BottomNav";
import { useApp } from "../context/AppContext";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const { city, savedIds } = useApp();

  const rows = [
    { icon: "location_on", label: "Current city", value: city, onClick: () => navigate("/select-city", { state: { from: "home" } }) },
    { icon: "bookmark", label: "Saved places", value: `${savedIds.length}`, onClick: () => navigate("/saved") },
    { icon: "notifications", label: "Notifications", value: "On" },
    { icon: "dark_mode", label: "Appearance", value: "Light" },
    { icon: "info", label: "About JaKal", value: "" },
  ];

  return (
    <PageTransition>
      <header className="topbar">
        <h1 className="topbar__title">Profile</h1>
      </header>

      <main className="profile-main">
        <div className="profile-card">
          <img src="https://i.pinimg.com/736x/70/50/c8/7050c8da428a0e539ba49631b11c358c.jpg" alt="Profile" className="profile-avatar" />
          <div>
            <h2 className="profile-name">Ai Hoshino</h2>
            <p className="profile-sub">Discovering {city}</p>
          </div>
        </div>

        <div className="profile-list">
          {rows.map((row) => (
            <button
              key={row.label}
              className="profile-row"
              onClick={row.onClick}
              disabled={!row.onClick}
            >
              <span className="material-symbols-outlined profile-row__icon">{row.icon}</span>
              <span className="profile-row__label">{row.label}</span>
              {row.value && <span className="profile-row__value">{row.value}</span>}
              {row.onClick && <span className="material-symbols-outlined profile-row__chevron">chevron_right</span>}
            </button>
          ))}
        </div>
      </main>

      <BottomNav />
    </PageTransition>
  );
}
