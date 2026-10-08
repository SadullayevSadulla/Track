import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { swiperCardTrck } from "../../../object";
import productsData from "../../Home/MainCard/cardData";
import { useLanguage } from "../../../i18n/LanguageContext";
import { useCartStore } from "../../../store/cartStore";
import { useFavoriteStore } from "../../../store/favoriteStore";
import { WEIGHTS } from "../katolgData";
import "../../Home/MainCard/mainCard.css";
import "../katolg.css";
import "./catalogCran.css";

const BRAND_BY_TITLE = {
  product1_title: "sollers",
  product2_title: "kamaz",
  product3_title: "jac",
  product5_title: "kamaz",
};

const BRANDS = [
  { value: "gaz", labelKey: "brand_gaz" },
  { value: "kamaz", labelKey: "brand_kamaz" },
  { value: "jac", labelKey: "brand_jac" },
  { value: "daewoo", labelKey: "brand_daewoo" },
  { value: "faw", labelKey: "brand_faw" },
  { value: "foton", labelKey: "brand_foton" },
  { value: "dongfeng", labelKey: "brand_dongfeng" },
  { value: "shacman", label: "SHACMAN" },
  { value: "sollers", label: "SOLLERS" },
  { value: "yanshi", label: "YANSHI" },
  { value: "valday", labelKey: "brand_valday" },
  { value: "maz", labelKey: "brand_maz" },
];
const craneCategory = swiperCardTrck.find((item) => item.id === 11);
const craneProducts = productsData
  .filter((product) => product.titleKey !== "product4_title")
  .map((product) => ({ ...product, brand: BRAND_BY_TITLE[product.titleKey] }));

const CatalogCran = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const productsRef = useRef(null);
  const [view, setView] = useState("list");
  const [brandQuery, setBrandQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState([]);

  const visibleBrands = useMemo(() => {
    const normalizedQuery = brandQuery.trim().toLocaleLowerCase();
    return BRANDS.filter((brand) => {
      const label = brand.labelKey ? t(brand.labelKey) : brand.label;
      return label.toLocaleLowerCase().includes(normalizedQuery);
    });
  }, [brandQuery, t]);

  const visibleProducts = useMemo(() => {
    return craneProducts.filter((product) => {
      const matchesBrand = !selectedBrands.length || selectedBrands.includes(product.brand);
      const matchesWeight = !selectedWeights.length || selectedWeights.includes(product.weight);
      return matchesBrand && matchesWeight;
    });
  }, [selectedBrands, selectedWeights]);

  const toggleBrand = (brand) => {
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((selected) => selected !== brand)
        : [...current, brand]
    );
  };

  const toggleWeight = (weight) => {
    setSelectedWeights((current) =>
      current.includes(weight)
        ? current.filter((selected) => selected !== weight)
        : [...current, weight]
    );
  };

  const resetFilters = () => {
    setBrandQuery("");
    setSelectedBrands([]);
    setSelectedWeights([]);
  };

  const hasFilters = brandQuery || selectedBrands.length > 0 || selectedWeights.length > 0;

  const categoryQuantity = craneCategory?.quantity ?? craneProducts.length;
  const itemSuffix = lang === "ru" && categoryQuantity % 10 >= 2 && categoryQuantity % 10 <= 4
    && (categoryQuantity % 100 < 12 || categoryQuantity % 100 > 14)
    ? "товара"
    : t("catalog_items_suffix");

  return (
    <section className="cran-catalog container">
      <header className="cran-catalog__header">
        <div className="cran-catalog__heading">
          <h1>{t("menu_cat_crane")}</h1>
          <span>{categoryQuantity} {itemSuffix} ({visibleProducts.length})</span>
        </div>
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
      </header>

      <aside className="cran-catalog__filters katolg_left">
        <div className="left_marka flex flex-col gap-6">
          <div className="marka_in">
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
                  onChange={() => toggleBrand(brand.value)}
                />
                <p>{brand.labelKey ? t(brand.labelKey) : brand.label}</p>
              </label>
            ))}
          </div>

          <div className="marka_in">
            <h1>{t("katolg_weight_label")}</h1>
            <div className="mk">
              {WEIGHTS.map((weight) => (
                <label className="kj" key={weight.value}>
                  <input
                    type="checkbox"
                    checked={selectedWeights.includes(weight.value)}
                    onChange={() => toggleWeight(weight.value)}
                  />
                  <p>{t(weight.labelKey)}</p>
                </label>
              ))}
            </div>

            <div className="btn9">
              <button
                type="button"
                onClick={() => productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              >
                {t("katolg_show_products_btn")}
              </button>
            </div>

            {hasFilters && (
              <button type="button" className="btn_reset" onClick={resetFilters}>
                {t("katolg_reset_btn")}
              </button>
            )}
          </div>
        </div>
      </aside>

      <div ref={productsRef} className={`cran-catalog__products katolg_data ${view === "list" ? "katolg_data--list" : ""}`}>
        {visibleProducts.length === 0 ? (
          <p className="cran-catalog__empty">{t("katolg_empty")}</p>
        ) : (
          visibleProducts.map((product) => {
            const isFavorite = favorites.includes(String(product.id));
            return (
              <div key={product.id}>
                <article
                  className="product-card cursor-pointer"
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
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill={isFavorite ? "#f5a623" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
                <div className="product-card__info">
                  <h3 className="product-card__title">{t(product.titleKey)}</h3>
                  {view === "list" ? (
                    <div className="product-card__actions">
                      <p className="product-card__price">
                        {product.priceType === "from"
                          ? `${t("price_from")} ${product.priceAmount}`
                          : t("price_on_request")}
                      </p>
                      <div className="product-card__action-buttons">
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
                          className="product-card__btn-secondary"
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
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="product-card__price">
                        {product.priceType === "from"
                          ? `${t("price_from")} ${product.priceAmount}`
                          : t("price_on_request")}
                      </p>
                      <div className="product-card__actions">
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
                          aria-label={t("btn_get_offer")}
                          title={t("btn_get_offer")}
                        >
                          {t("btn_get_offer")}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </div>
                </article>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default CatalogCran;
