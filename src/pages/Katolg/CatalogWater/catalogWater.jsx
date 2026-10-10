import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../i18n/LanguageContext";
import { useCartStore } from "../../../store/cartStore";
import { useFavoriteStore } from "../../../store/favoriteStore";
import CatalogWaterData, { waterBrands, waterTypes, waterVolumeLimits } from "./catalogWaterData";
import "../../Home/MainCard/mainCard.css";
import "../katolg.css";
import "../CatalogKran/catalogCran.css";
import "../CatalogFuel/catalogFuel.css";
import "./catalogWater.css";

const CatalogWater = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const productsRef = useRef(null);
  const [view, setView] = useState("grid");
  const [brandQuery, setBrandQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [volumeRange, setVolumeRange] = useState([waterVolumeLimits.min, waterVolumeLimits.max]);

  const visibleBrands = useMemo(() => {
    const query = brandQuery.trim().toLocaleLowerCase();
    return waterBrands.filter((brand) => t(brand.labelKey).toLocaleLowerCase().includes(query));
  }, [brandQuery, t]);

  const visibleProducts = useMemo(() => CatalogWaterData.filter((product) => {
    const matchesBrand = !selectedBrands.length || selectedBrands.includes(product.brand);
    const matchesType = !selectedTypes.length || selectedTypes.includes(product.type);
    const matchesVolume = product.volume >= volumeRange[0] && product.volume <= volumeRange[1];
    return matchesBrand && matchesType && matchesVolume;
  }), [selectedBrands, selectedTypes, volumeRange]);

  const toggleValue = (setter, value) => {
    setter((current) => current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value]);
  };

  const updateVolume = (index, rawValue) => {
    const value = Math.max(waterVolumeLimits.min, Math.min(Number(rawValue), waterVolumeLimits.max));
    setVolumeRange((current) => {
      const next = [...current];
      next[index] = index === 0 ? Math.min(value, next[1]) : Math.max(value, next[0]);
      return next;
    });
  };

  const resetFilters = () => {
    setBrandQuery("");
    setSelectedBrands([]);
    setSelectedTypes([]);
    setVolumeRange([waterVolumeLimits.min, waterVolumeLimits.max]);
  };

  const count = CatalogWaterData.length;
  const itemSuffix = lang === "ru" && count % 10 >= 2 && count % 10 <= 4
    && (count % 100 < 12 || count % 100 > 14) ? "товара" : t("catalog_items_suffix");
  const hasFilters = Boolean(brandQuery || selectedBrands.length || selectedTypes.length)
    || volumeRange[0] !== waterVolumeLimits.min || volumeRange[1] !== waterVolumeLimits.max;
  const volumePercent = (value) => ((value - waterVolumeLimits.min) / (waterVolumeLimits.max - waterVolumeLimits.min)) * 100;

  return (
    <section className="cran-catalog water-catalog container">
      <header className="cran-catalog__header">
        <div className="cran-catalog__heading">
          <h1>{t("menu_cat_tank")}</h1>
          <span>{count} {itemSuffix}</span>
        </div>
        <div className="water-catalog__tools">
          <div className="cran-catalog__view" aria-label={t("catalog_view_label")}>
            <button type="button" className={view === "list" ? "is-active" : ""} onClick={() => setView("list")} aria-label={t("catalog_list_view")} aria-pressed={view === "list"}>
              <i className="fa-solid fa-list-ul" />
            </button>
            <button type="button" className={view === "grid" ? "is-active" : ""} onClick={() => setView("grid")} aria-label={t("catalog_grid_view")} aria-pressed={view === "grid"}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg>
            </button>
          </div>
        </div>
      </header>

      <aside className="cran-catalog__filters katolg_left water-catalog__filters">
        <div className="marka_in water-catalog__brand-filter">
          <h1>{t("katolg_brand_label")}</h1>
          <div className="in cran-catalog__search">
            <input type="search" value={brandQuery} onChange={(event) => setBrandQuery(event.target.value)} placeholder={t("katolg_search_placeholder")} aria-label={t("katolg_search_placeholder")} />
          </div>
        </div>

        <div className="mk">
          {visibleBrands.map((brand) => (
            <label className="kj" key={brand.value}>
              <input type="checkbox" checked={selectedBrands.includes(brand.value)} onChange={() => toggleValue(setSelectedBrands, brand.value)} />
              <p>{t(brand.labelKey)}</p>
            </label>
          ))}
        </div>

        <div className="marka_in water-catalog__type-filter">
          <h1>{t("water_type_label")}</h1>
          <div className="mk">
            {waterTypes.map((type) => (
              <label className="kj" key={type.value}>
                <input type="checkbox" checked={selectedTypes.includes(type.value)} onChange={() => toggleValue(setSelectedTypes, type.value)} />
                <p>{t(type.labelKey)}</p>
              </label>
            ))}
          </div>
        </div>

        <div className="fuel-range water-catalog__volume-filter">
          <h2>{t("catalog_tank_volume_label")}</h2>
          <div className="fuel-range__slider">
            <div className="fuel-range__track" />
            <div className="fuel-range__selected" style={{ left: `${volumePercent(volumeRange[0])}%`, right: `${100 - volumePercent(volumeRange[1])}%` }} />
            {volumeRange.map((value, index) => (
              <input key={index} type="range" min={waterVolumeLimits.min} max={waterVolumeLimits.max} step={waterVolumeLimits.step} value={value} onChange={(event) => updateVolume(index, event.target.value)} aria-label={`${t("catalog_tank_volume_label")} ${index === 0 ? t("catalog_range_from") : t("catalog_range_to")}`} />
            ))}
          </div>
          <div className="fuel-range__inputs">
            {volumeRange.map((value, index) => (
              <input key={index} type="number" min={waterVolumeLimits.min} max={waterVolumeLimits.max} step={waterVolumeLimits.step} value={value === waterVolumeLimits.min && index === 0 || value === waterVolumeLimits.max && index === 1 ? "" : value} placeholder={index === 0 ? t("catalog_range_from") : t("catalog_range_to")} onChange={(event) => updateVolume(index, event.target.value)} aria-label={`${t("catalog_tank_volume_label")} ${index === 0 ? t("catalog_range_from") : t("catalog_range_to")}`} />
            ))}
          </div>
        </div>

        <div className="water-catalog__filter-actions">
          <div className="btn9">
            <button type="button" onClick={() => productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>{t("katolg_show_products_btn")}</button>
          </div>
          {hasFilters && <button type="button" className="btn_reset" onClick={resetFilters}>{t("katolg_reset_btn")}</button>}
        </div>
      </aside>

      <div ref={productsRef} className={`cran-catalog__products katolg_data ${view === "list" ? "katolg_data--list" : ""}`}>
        {visibleProducts.length === 0 ? <p className="cran-catalog__empty">{t("katolg_empty")}</p> : visibleProducts.map((product) => {
          const isFavorite = favorites.includes(String(product.id));
          return (
            <div key={product.id}>
              <article className={`product-card cursor-pointer ${!product.available ? "water-product--unavailable" : ""}`} role="link" tabIndex={0} onClick={() => navigate("/information")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); navigate("/information"); } }}>
                <div className="product-card__image">
                  <img src={product.image} alt={t(product.titleKey)} />
                  {!product.available && <span className="water-product__unavailable-label">{t("awp_unavailable")}</span>}
                  <button type="button" className={`product-card__favorite ${isFavorite ? "active" : ""}`} onClick={(event) => { event.stopPropagation(); toggleFavorite(product.id); }} aria-label={t("catalog_favorite")} aria-pressed={isFavorite}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "#f5a623" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
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
                    <button type="button" className="product-card__btn-main" onClick={(event) => { event.stopPropagation(); navigate("/information"); }}>{t("btn_more")}</button>
                    <button type="button" className="product-card__cart cursor-pointer" onClick={(event) => { event.stopPropagation(); addToCart(product); }} aria-label={t("catalog_add_to_cart")}><i className="fa-solid fa-cart-shopping" aria-hidden="true" /></button>
                    <button type="button" className="product-card__btn-secondary text-[16px]" onClick={(event) => { event.stopPropagation(); navigate("/contacts"); }} aria-label={t("btn_get_offer")} title={t("btn_get_offer")}>{t("btn_get_offer")}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" /></svg></button>
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

export default CatalogWater;