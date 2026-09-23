import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavoriteStore } from "../../store/favoriteStore";
import { useLanguage } from "../../i18n/LanguageContext";
import productsData from "../Home/MainCard/cardData";
import "./favorit.css";

const Favorit = () => {
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const favoriteProducts = productsData.filter((product) => favorites.includes(product.id));

  return (
    <main className="products-page">
      <div className="products-page container">
        <h1>{t("footer_link_favorites")}</h1>
        <div className="products-page__grid">
          {favoriteProducts.map((product) => (
            <article className="products-page__card" key={product.id}>
              <div className="products-page__image-wrap">
                <img src={product.image} alt={t(product.titleKey)} />
                <button
                  type="button"
                  className="products-page__remove"
                  onClick={() => toggleFavorite(product.id)}
                  aria-label="Remove from favorites"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.7">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
              <div className="products-page__info">
                <h2>{t(product.titleKey)}</h2>
                <p>
                  {product.priceType === "from"
                    ? `${t("price_from")} ${product.priceAmount}`
                    : t("price_on_request")}
                </p>
                <div className="products-page__actions">
                  <button
                    type="button"
                    className="products-page__details"
                    onClick={() => navigate("/information")}
                  >
                    {t("btn_more")}
                  </button>
                  <button type="button" className="products-page__offer">
                    {t("btn_get_offer")}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Favorit;