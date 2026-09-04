import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import BottomNav from "../components/BottomNav";
import { ShopCardRow } from "../components/ShopCard";
import { useApp } from "../context/AppContext";
import { categories, shops } from "../data/shops";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { city } = useApp();
  const [activeCategory, setActiveCategory] = useState(null);

  const cityShops = useMemo(() => shops.filter((s) => s.city === city), [city]);
  const featured = useMemo(() => cityShops.find((s) => s.featured) || cityShops[0], [cityShops]);

  const filtered = useMemo(() => {
    const base = cityShops.filter((s) => s.id !== featured?.id);
    return activeCategory ? base.filter((s) => s.category === activeCategory) : base;
  }, [cityShops, activeCategory, featured]);

  function toggleCategory(cat) {
    setActiveCategory((prev) => (prev === cat ? null : cat));
  }

  return (
    <PageTransition>
      <header className="topbar home-header">
        <button
          className="home-city"
          onClick={() => navigate("/select-city", { state: { from: "home" } })}
        >
          <span className="home-city__label">{city}</span>
          <span className="material-symbols-outlined">arrow_drop_down</span>
        </button>
        <button className="home-avatar" onClick={() => navigate("/profile")} aria-label="Profile">
          <img src="https://picsum.photos/seed/user-avatar/80/80" alt="Profile" />
        </button>
      </header>

      <main className="home-main">
        <section className="filter-row hide-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={"chip" + (activeCategory === cat ? " chip--active" : "")}
              onClick={() => toggleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </section>

        {featured && (
          <motion.section
            className="hero-card"
            onClick={() => navigate(`/shop/${featured.id}`)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            <div className="hero-card__media">
              <img src={featured.image} alt={featured.name} />
              <div className="hero-card__scrim" />
            </div>
            <div className="hero-card__content">
              <span className="hero-card__badge">Today's Pick</span>
              <h2 className="hero-card__title">{featured.name}</h2>
              <p className="hero-card__desc">{featured.tagline}</p>
              <div className="hero-card__meta">
                <span className="pill pill--glass">
                  <span className="material-symbols-outlined star">star</span> {featured.rating}
                </span>
                <span className="pill pill--glass">{featured.price}</span>
                {featured.tags[0] && <span className="pill pill--glass">{featured.tags[0]}</span>}
              </div>
            </div>
          </motion.section>
        )}

        <section className="explore-section">
          <h3 className="explore-section__title">Explore {city}</h3>
          {filtered.length === 0 ? (
            <div className="empty-state">
              <span className="material-symbols-outlined">search_off</span>
              <p>No places match this filter yet.</p>
            </div>
          ) : (
            <div className="explore-list">
              {filtered.map((shop, i) => (
                <ShopCardRow key={shop.id} shop={shop} index={i} />
              ))}
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </PageTransition>
  );
}
