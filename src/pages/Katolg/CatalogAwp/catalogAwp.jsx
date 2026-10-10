import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../i18n/LanguageContext";
import { useCartStore } from "../../../store/cartStore";
import { useFavoriteStore } from "../../../store/favoriteStore";
import CatalogAwpData, { awpBrands, awpWheelFormulas } from "./catalogAwpData";
import "../../Home/MainCard/mainCard.css";
import "../katolg.css";
import "../CatalogKran/catalogCran.css";
import "./catalogAwp.css";

const CatalogAwp = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const productsRef = useRef(null);
  const [view, setView] = useState("grid");
  const [brandQuery, setBrandQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedWheelFormulas, setSelectedWheelFormulas] = useState([]);

  const visibleBrands = useMemo(() => {
    const normalizedQuery = brandQuery.trim().toLocaleLowerCase();
    return awpBrands.filter((brand) => t(brand.labelKey).toLocaleLowerCase().includes(normalizedQuery));
  }, [brandQuery, t]);

  const visibleProducts = useMemo(() => CatalogAwpData.filter((product) => {
    const matchesBrand = !selectedBrands.length || selectedBrands.includes(product.brand);
    const matchesFormula = !selectedWheelFormulas.length
      || selectedWheelFormulas.includes(product.wheelFormula);
    return matchesBrand && matchesFormula;
  }), [selectedBrands, selectedWheelFormulas]);

  const toggleValue = (setter, value) => {
    setter((current) => current.includes(value)
      ? current.filter((selected) => selected !== value)
      : [...current, value]);
  };

  const resetFilters = () => {
    setBrandQuery("");
    setSelectedBrands([]);
    setSelectedWheelFormulas([]);
  };

  const categoryQuantity = CatalogAwpData.length;
  const itemSuffix = lang === "ru" && categoryQuantity % 10 >= 2 && categoryQuantity % 10 <= 4
    && (categoryQuantity % 100 < 12 || categoryQuantity % 100 > 14)
    ? "товара"
    : t("catalog_items_suffix");
  const hasFilters = Boolean(brandQuery || selectedBrands.length || selectedWheelFormulas.length);

  return (
    <section className="cran-catalog awp-catalog container">
      <header className="cran-catalog__header">
        <div className="cran-catalog__heading">
          <h1>{t("menu_cat_lift")}</h1>
          <span>{categoryQuantity} {itemSuffix} ({visibleProducts.length})</span>
        </div>
        <div className="awp-catalog__tools">
          <div className="cran-catalog__view" aria-label={t("catalog_view_label")}>
            <button
              type="button"
              className={view === "list" ? "is-active" : ""}
              onClick={() => setView("list")}
              aria-label={t("catalog_list_view")}
              aria-pressed={view === "list"}
            >
              <i className="fa-solid fa-list-ul" />
            </button>
            <button
              type="button"
              className={view === "grid" ? "is-active" : ""}
              onClick={() => setView("grid")}
              aria-label={t("catalog_grid_view")}
              aria-pressed={view === "grid"}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="8" height="8" rx="1" />
                <rect x="13" y="3" width="8" height="8" rx="1" />
                <rect x="3" y="13" width="8" height="8" rx="1" />
                <rect x="13" y="13" width="8" height="8" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <aside className="cran-catalog__filters katolg_left awp-catalog__filters">
        <div className="marka_in awp-catalog__brand-filter">
          <h1>{t("katolg_brand_label")}</h1>
          <div className="in cran-catalog__search">
            <input
              type="search"
              value={brandQuery}
              onChange={(event) => setBrandQuery(event.target.value)}
              placeholder={t("katolg_search_placeholder")}
              aria-label={t("katolg_search_placeholder")}
            />
          </div>
        </div>

        <div className="mk">
          {visibleBrands.map((brand) => (
            <label className="kj" key={brand.value}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.value)}
                onChange={() => toggleValue(setSelectedBrands, brand.value)}
              />
              <p>{t(brand.labelKey)}</p>
            </label>
          ))}
        </div>

        <div className="marka_in awp-catalog__formula-filter">
          <h1>{t("awp_wheel_formula_label")}</h1>
          <div className="mk">
            {awpWheelFormulas.map((formula) => (
              <label className="kj" key={formula}>
                <input
                  type="checkbox"
                  checked={selectedWheelFormulas.includes(formula)}
                  onChange={() => toggleValue(setSelectedWheelFormulas, formula)}
                />
                <p>{formula}</p>
              </label>
            ))}
          </div>
        </div>

        <div className="fuel-catalog__actions awp-catalog__actions">
          <div className="btn9">
            <button
              type="button"
              onClick={() => productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              {t("katolg_show_products_btn")} ({visibleProducts.length})
            </button>
          </div>
          {hasFilters && (
            <button type="button" className="btn_reset" onClick={resetFilters}>
              {t("katolg_reset_btn")}
            </button>
          )}
        </div>
      </aside>

      <div ref={productsRef} className={`cran-catalog__products katolg_data ${view === "list" ? "katolg_data--list" : ""}`}>
        {visibleProducts.length === 0 ? (
          <p className="cran-catalog__empty">{t("katolg_empty")}</p>
        ) : visibleProducts.map((product) => {
          const isFavorite = favorites.includes(String(product.id));
          return (
            <div key={product.id}>
              <article
                className={`product-card cursor-pointer ${!product.available ? "awp-product--unavailable" : ""}`}
                role="link"
                tabIndex={0}
                onClick={() => navigate("/information")}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate("/information");
                  }
                }}
              >
                <div className="product-card__image">
                  <img src={product.image} alt={t(product.titleKey)} />
                  {!product.available && <span className="awp-product__unavailable-label">{t("awp_unavailable")}</span>}
                  <button
                    type="button"
                    className={`product-card__favorite ${isFavorite ? "active" : ""}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    aria-label={t("catalog_favorite")}
                    aria-pressed={isFavorite}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "#f5a623" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
                <div className="product-card__info">
                  <h3 className="product-card__title">{t(product.titleKey)}</h3>
                  {view === "list" && (
                    <div className="product-card__specs">
                      <p>
                        <strong>{t("katolg_weight_label")}</strong>
                        <i></i>
                        <span>
                          {(() => {
                            const fallbackWeights = { up_to_5_5: 5.5, up_to_12: 12, up_to_20: 20, over_20: 20 };
                            const rawGross = Number(product.grossWeight ?? fallbackWeights[product.weight] ?? 0);
                            return rawGross > 0
                              ? `${rawGross.toFixed(rawGross % 1 === 0 ? 0 : 1)} т`
                              : product.weight
                                ? t(`weight_${product.weight}`)
                                : "-";
                          })()}
                        </span>
                      </p>
                      <p>
                        <strong>{t("katolg_load_label")}</strong>
                        <i></i>
                        <span>
                          {(() => {
                            const rawPayload = Number(product.payload ?? product.loadCapacity ?? 0);
                            return rawPayload > 0
                              ? `${(rawPayload / 1000).toFixed((rawPayload / 1000) % 1 === 0 ? 0 : 1)} т`
                              : "-";
                          })()}
                        </span>
                      </p>
                    </div>
                  )}
                  <p className="product-card__price">{t("price_on_request")}</p>
                  <div className="product-card__actions">
                    {product.available ? (
                      <>
                        <button
                          type="button"
                          className="product-card__btn-main"
                          onClick={(event) => {
                            event.stopPropagation();
                            navigate("/information");
                          }}
                        >
                          {t("btn_more")}
                        </button>
                        <button
                          type="button"
                          className="product-card__cart cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            addToCart(product);
                          }}
                          aria-label={t("catalog_add_to_cart")}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M0 0h16v16H0z" fill="none" />
                            <path fill="currentColor" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607L1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4a2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4a2 2 0 0 0-2 0m-7 1a1 1 0 1 1 0 2a1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2a1 1 0 0 1 0-2" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="product-card__btn-secondary text-[16px]"
                          onClick={(event) => {
                            event.stopPropagation();
                            navigate("/contacts");
                          }}
                        >
                          {t("btn_get_offer")}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="awp-product__similar"
                        onClick={(event) => {
                          event.stopPropagation();
                          navigate("/contacts");
                        }}
                      >
                        {t("awp_request_similar")}
                        <i className="fa-regular fa-envelope" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CatalogAwp;