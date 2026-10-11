import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavoriteStore } from "../../store/favoriteStore";
import { useLanguage } from "../../i18n/LanguageContext";
import productsData from "../Home/MainCard/cardData";
import katolgData from "../Katolg/katolgData";
import CatalogAwpData from "../Katolg/CatalogAwp/catalogAwpData";
import CatalogBordData from "../Katolg/CatalogBord/catalogBordData";
import CatalogCantoData from "../Katolg/CatalogCanto/catalogCantoData";
import CatalogDoptData from "../Katolg/CatalogDopt/CatalogDoptData";
import CatalogEvkratorData from "../Katolg/CatalogEvkrator/catalogEvkratorData";
import CatalogFuelData from "../Katolg/CatalogFuel/catalogFuelData";
import CatalogFurgonData from "../Katolg/CatalogFurgon/catalogFurgonData";
import CatalogIlData from "../Katolg/CatalogIL/catalogIlData";
import CatalogWaterData from "../Katolg/CatalogWater/catalogWaterData";
import CatalogYukData from "../Katolg/CatalogYuk/catalogYukData";
import "./favorit.css";

const allProducts = [
  ...productsData,
  ...katolgData,
  ...CatalogAwpData,
  ...CatalogBordData,
  ...CatalogCantoData,
  ...CatalogDoptData,
  ...CatalogEvkratorData,
  ...CatalogFuelData,
  ...CatalogFurgonData,
  ...CatalogIlData,
  ...CatalogWaterData,
  ...CatalogYukData,
];

const getProductTitle = (product, t) => {
  if (product.titleKey) return t(product.titleKey);
  if (product.title) return product.title;
  if (product.model) return product.model;
  if (product.brand) return product.brand;
  return "Product";
};

const Favorit = () => {
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const favoriteProductIds = new Set((favorites ?? []).map((item) => String(item)));
  const favoriteProducts = allProducts.filter((product) =>
    favoriteProductIds.has(String(product.id))
  );

  return (
    <main className="products-page">
      <div className="products-page container">
        <h1>{t("footer_link_favorites")}</h1>
        {favoriteProducts.length === 0 ? (
          <p className="products-page__empty">{t("katolg_empty")}</p>
        ) : (
          <div className="products-page__grid">
            {favoriteProducts.map((product) => (
              <article className="products-page__card" key={product.id}>
                <div className="products-page__image-wrap">
                  <img src={product.image} alt={getProductTitle(product, t)} />
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
                  <h2>{getProductTitle(product, t)}</h2>
                  <p>
                    {product.priceType === "from"
                      ? `${t("price_from")} ${product.priceAmount ?? ""}`.trim()
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
        )}
      </div>
    </main>
  );
};

export default Favorit;