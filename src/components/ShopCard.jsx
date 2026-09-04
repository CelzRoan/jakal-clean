import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useReveal } from "../hooks/useReveal";
import "./ShopCard.css";

export function ShopCardRow({ shop, index = 0 }) {
  const navigate = useNavigate();
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={"shop-row" + (visible ? " is-visible" : "")}
      style={{ transitionDelay: visible ? `${Math.min(index, 6) * 45}ms` : "0ms" }}
      onClick={() => navigate(`/shop/${shop.id}`)}
    >
      <div className="shop-row__thumb">
        <img src={shop.image} alt={shop.name} loading="lazy" />
      </div>
      <div className="shop-row__body">
        <h4 className="shop-row__name">{shop.name}</h4>
        <p className="shop-row__tagline">{shop.tagline}</p>
        <div className="shop-row__tags hide-scroll">
          {shop.tags.slice(0, 3).map((t) => (
            <span key={t} className="pill pill--muted">{t}</span>
          ))}
          <span className="pill pill--muted">{shop.price}</span>
        </div>
      </div>
    </div>
  );
}

export function ShopCardGrid({ shop, index = 0 }) {
  const navigate = useNavigate();
  const { isSaved, toggleSaved } = useApp();
  const [ref, visible] = useReveal();
  const saved = isSaved(shop.id);

  return (
    <article
      ref={ref}
      className={"shop-card" + (visible ? " is-visible" : "")}
      style={{ transitionDelay: visible ? `${Math.min(index, 8) * 45}ms` : "0ms" }}
      onClick={() => navigate(`/shop/${shop.id}`)}
    >
      <div className="shop-card__image">
        <img src={shop.image} alt={shop.name} loading="lazy" />
        <button
          className={"shop-card__bookmark" + (saved ? " is-saved" : "")}
          onClick={(e) => {
            e.stopPropagation();
            toggleSaved(shop.id);
          }}
          aria-label={saved ? "Remove from saved" : "Save this place"}
        >
          <span className="material-symbols-outlined">{saved ? "bookmark" : "bookmark_border"}</span>
        </button>
      </div>
      <div className="shop-card__body">
        <div className="shop-card__top">
          <h3 className="shop-card__name">{shop.name}</h3>
          <div className="shop-card__rating">
            <span className="material-symbols-outlined star">star</span>
            <span>{shop.rating}</span>
          </div>
        </div>
        <p className="shop-card__desc">{shop.tagline}</p>
        <div className="shop-card__tags">
          {shop.tags.slice(0, 2).map((t) => (
            <span key={t} className="pill pill--tiny">{t}</span>
          ))}
          <span className="pill pill--tiny">{shop.price}</span>
        </div>
      </div>
    </article>
  );
}
