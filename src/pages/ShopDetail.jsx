import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { useApp } from "../context/AppContext";
import { getShopById } from "../data/shops";
import "./ShopDetail.css";

export default function ShopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSaved, toggleSaved } = useApp();
  const shop = getShopById(id);

  if (!shop) {
    return (
      <PageTransition>
        <div className="detail-missing">
          <p>We couldn't find that place.</p>
          <button className="btn btn--primary" onClick={() => navigate("/home")}>
            Back to Home
          </button>
        </div>
      </PageTransition>
    );
  }

  const saved = isSaved(shop.id);

  return (
    <PageTransition noPadBottom>
      <div className="detail">
        <div className="detail__topbar-fixed">
  <div className="detail__topbar-fixed__row">
    <button className="icon-btn icon-btn--ghost" onClick={() => navigate(-1)} aria-label="Back">
      <span className="material-symbols-outlined">arrow_back</span>
    </button>
    <div className="detail__hero-actions-right">
      <button className="icon-btn icon-btn--ghost" aria-label="Share">
        <span className="material-symbols-outlined">share</span>
      </button>
      <button
        className={"icon-btn icon-btn--ghost" + (saved ? " is-saved" : "")}
        onClick={() => toggleSaved(shop.id)}
        aria-label={saved ? "Remove from saved" : "Save"}
      >
        <span className="material-symbols-outlined">{saved ? "bookmark" : "bookmark_border"}</span>
      </button>
    </div>
  </div>
</div>
        <header className="detail__hero">
          <motion.img
            src={shop.image}
            alt={shop.name}
            className="detail__hero-img"
            initial={{ scale: 1.08, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="detail__hero-scrim" />
          <div className="detail__hero-actions">
            <button className="icon-btn icon-btn--ghost" onClick={() => navigate(-1)} aria-label="Back">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="detail__hero-actions-right">
              <button className="icon-btn icon-btn--ghost" aria-label="Share">
                <span className="material-symbols-outlined">share</span>
              </button>
              <button
                className={"icon-btn icon-btn--ghost" + (saved ? " is-saved" : "")}
                onClick={() => toggleSaved(shop.id)}
                aria-label={saved ? "Remove from saved" : "Save"}
              >
                <span className="material-symbols-outlined">{saved ? "bookmark" : "bookmark_border"}</span>
              </button>
            </div>
          </div>
        </header>

        <motion.main
          className="detail__body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <div className="detail__title-row">
            <h1 className="detail__title">{shop.name}</h1>
            <div className="detail__meta">
              <span>{shop.category}</span>
              <span className="dot">•</span>
              <span>{shop.area}</span>
            </div>
          </div>

          <div className="detail__stats">
            <span className="pill pill--muted">
              <span className="material-symbols-outlined star">star</span> {shop.rating}
            </span>
            <span className="pill pill--muted">{shop.price}</span>
            <span className={"pill" + (shop.openNow ? " pill--open" : " pill--closed")}>
              {shop.openNow ? "Open Now" : "Closed"}
            </span>
          </div>

          <div className="detail__chips hide-scroll">
            {shop.amenities.map((a) => (
              <div key={a} className="amenity-chip">
                <span>{a}</span>
              </div>
            ))}
          </div>

          <section className="detail__section">
            <h2 className="detail__section-title">About</h2>
            <p className="detail__about">{shop.description}</p>

            <div className="signature-card">
              <div className="signature-card__icon">
                <span className="material-symbols-outlined">local_cafe</span>
              </div>
              <div>
                <h3 className="signature-card__title">Signature: {shop.signature.name}</h3>
                <p className="signature-card__note">{shop.signature.note}</p>
              </div>
            </div>
          </section>
        </motion.main>

        <div className="detail__actionbar">
          <button className="btn btn--outline detail__actionbar-btn">
            <span className="material-symbols-outlined">menu_book</span>
            Menu
          </button>
          <button className="btn btn--primary detail__actionbar-btn detail__actionbar-btn--grow">
            <span className="material-symbols-outlined">directions</span>
            Directions
          </button>
        </div>
      </div>
    </PageTransition>
  );
}
