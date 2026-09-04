import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { useApp } from "../context/AppContext";
import { cities } from "../data/shops";
import "./CitySelect.css";

export default function CitySelect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { city, setCity } = useApp();
  const fromDropdown = location.state?.from === "home";

  function choose(c) {
    setCity(c);
    navigate(fromDropdown ? -1 : "/home", { replace: !fromDropdown });
  }

  function useCurrentLocation() {
    // Simulated geolocation pick — defaults to Bandung for this demo dataset.
    choose("Bandung");
  }

  return (
    <PageTransition>
      <header className="topbar">
        {fromDropdown && (
          <button className="icon-btn" onClick={() => navigate(-1)} aria-label="Back">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        )}
        <h1 className="topbar__title">Choose a city</h1>
      </header>

      <main className="city-select">
        <button className="city-select__current" onClick={useCurrentLocation}>
          <span className="material-symbols-outlined city-select__current-icon">my_location</span>
          <div>
            <span className="city-select__current-title">Use current location</span>
            <span className="city-select__current-sub">Enable location services to find places nearby</span>
          </div>
        </button>

        <div className="city-select__list">
          {cities.map((c, i) => (
            <motion.button
              key={c}
              className={"city-select__item" + (c === city ? " is-selected" : "")}
              onClick={() => choose(c)}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>{c}</span>
              {c === city && <span className="material-symbols-outlined">check</span>}
            </motion.button>
          ))}
        </div>
      </main>
    </PageTransition>
  );
}
