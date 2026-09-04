import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import BottomNav from "../components/BottomNav";
import { ShopCardGrid } from "../components/ShopCard";
import { useApp } from "../context/AppContext";
import { categories, shops } from "../data/shops";
import "./Search.css";

export default function Search() {
  const navigate = useNavigate();
  const { city } = useApp();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [openNow, setOpenNow] = useState(false);
  const [topRated, setTopRated] = useState(false);

  const results = useMemo(() => {
    let list = shops.filter((s) => s.city === city);
    if (category) list = list.filter((s) => s.category === category);
    if (openNow) list = list.filter((s) => s.openNow);
    if (topRated) list = list.filter((s) => s.rating >= 4.7);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return [...list].sort((a, b) => (topRated ? b.rating - a.rating : 0));
  }, [city, category, openNow, topRated, query]);

  function toggleCategory(cat) {
    setCategory((prev) => (prev === cat ? null : cat));
  }

  return (
    <PageTransition>
      <main className="search-main">
  <div className="search-sticky">
    <header className="search-sticky__topbar">
      <button className="icon-btn" onClick={() => navigate(-1)} aria-label="Back">
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 className="topbar__title">JaKal</h1>
    </header>
          <h2 className="search-title">
            {category ? category : "Places"} in {city}
          </h2>

          <div className="search-input-wrap">
            <span className="material-symbols-outlined search-input-icon">search</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search places, dishes, vibes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className="search-input-clear" onClick={() => setQuery("")} aria-label="Clear search">
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>

          <div className="filter-row hide-scroll">
            {categories.map((cat) => (
              <button
                key={cat}
                className={"chip chip--outline" + (category === cat ? " chip--active" : "")}
                onClick={() => toggleCategory(cat)}
              >
                {cat}
                {category === cat && <span className="material-symbols-outlined chip__close">close</span>}
              </button>
            ))}
            <button
              className={"chip chip--outline" + (openNow ? " chip--active" : "")}
              onClick={() => setOpenNow((v) => !v)}
            >
              Open Now
            </button>
            <button
              className={"chip chip--outline" + (topRated ? " chip--active" : "")}
              onClick={() => setTopRated((v) => !v)}
            >
              Top Rated
            </button>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="empty-state">
            <span className="material-symbols-outlined">search_off</span>
            <p>No places match your search yet. Try a different filter.</p>
          </div>
        ) : (
          <div className="search-grid">
            {results.map((shop, i) => (
              <ShopCardGrid key={shop.id} shop={shop} index={i} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </PageTransition>
  );
}
