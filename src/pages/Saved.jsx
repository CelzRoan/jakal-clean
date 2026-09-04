import { useMemo } from "react";
import PageTransition from "../components/PageTransition";
import BottomNav from "../components/BottomNav";
import { ShopCardGrid } from "../components/ShopCard";
import { useApp } from "../context/AppContext";
import { shops } from "../data/shops";
import "./Search.css";

export default function Saved() {
  const { savedIds } = useApp();
  const savedShops = useMemo(() => shops.filter((s) => savedIds.includes(s.id)), [savedIds]);

  return (
    <PageTransition>
      <header className="topbar">
        <h1 className="topbar__title">Saved Places</h1>
      </header>

      <main className="search-main">
        {savedShops.length === 0 ? (
          <div className="empty-state" style={{ paddingTop: 48 }}>
            <span className="material-symbols-outlined">bookmark_border</span>
            <p>Nothing saved yet. Tap the bookmark icon on any place to keep it here.</p>
          </div>
        ) : (
          <div className="search-grid" style={{ marginTop: 16 }}>
            {savedShops.map((shop, i) => (
              <ShopCardGrid key={shop.id} shop={shop} index={i} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </PageTransition>
  );
}
