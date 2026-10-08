import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../i18n/LanguageContext";
import { useCartStore } from "../../../store/cartStore";
import CatalogEvkratorData, {
  evkratorBrands,
  evkratorPlatformLengths,
  evkratorPlatformTypes,
  evkratorWheelFormulas,
} from "./catalogEvkratorData";
import "../../Home/MainCard/mainCard.css";
import "../katolg.css";
import "../CatalogKran/catalogCran.css";
import "./catalogEvkrator.css";

const CatalogEvkrator = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const productsRef = useRef(null);
  const [view, setView] = useState("grid");
  const [brandQuery, setBrandQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPlatformTypes, setSelectedPlatformTypes] = useState([]);
  const [selectedWheelFormulas, setSelectedWheelFormulas] = useState([]);
  const [selectedLengths, setSelectedLengths] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const visibleBrands = useMemo(() => {
    const query = brandQuery.trim().toLocaleLowerCase();
    return evkratorBrands.filter((brand) => t(brand.labelKey).toLocaleLowerCase().includes(query));
  }, [brandQuery, t]);

  const visibleProducts = useMemo(() => CatalogEvkratorData.filter((product) => {
    const matchesBrand = !selectedBrands.length || selectedBrands.includes(product.brand);
    const matchesType = !selectedPlatformTypes.length || selectedPlatformTypes.includes(product.platformType);
    const matchesFormula = !selectedWheelFormulas.length || selectedWheelFormulas.includes(product.wheelFormula);
    const matchesLength = !selectedLengths.length || selectedLengths.includes(product.platformLength);
    return matchesBrand && matchesType && matchesFormula && matchesLength;
  }), [selectedBrands, selectedPlatformTypes, selectedWheelFormulas, selectedLengths]);

  const toggleValue = (setter, value) => {
    setter((current) => current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value]);
  };

  const resetFilters = () => {
    setBrandQuery("");
    setSelectedBrands([]);
    setSelectedPlatformTypes([]);
    setSelectedWheelFormulas([]);
    setSelectedLengths([]);
  };

  const toggleFavorite = (id) => {
    setFavorites((current) => current.includes(id)
      ? current.filter((favoriteId) => favoriteId !== id)
      : [...current, id]);
  };

  const count = CatalogEvkratorData.length;
  const itemSuffix = lang === "ru" && count % 10 >= 2 && count % 10 <= 4
    && (count % 100 < 12 || count % 100 > 14) ? "товара" : t("catalog_items_suffix");
  const hasFilters = Boolean(brandQuery || selectedBrands.length || selectedPlatformTypes.length || selectedWheelFormulas.length || selectedLengths.length);

  return (
    <section className="cran-catalog evkrator-catalog container">
      <header className="cran-catalog__header">
        <div className="cran-catalog__heading">
          <h1>{t("menu_cat_tow")}</h1>
          <span>{count} {itemSuffix}</span>
        </div>
        <div className="evkrator-catalog__tools">
          <div className="cran-catalog__view" aria-label={t("catalog_view_label")}>
            <button type="button" className={view === "list" ? "is-active" : ""} onClick={() => setView("list")} aria-label={t("catalog_list_view")} aria-pressed={view === "list"}><i className="fa-solid fa-list-ul" /></button>
            <button type="button" className={view === "grid" ? "is-active" : ""} onClick={() => setView("grid")} aria-label={t("catalog_grid_view")} aria-pressed={view === "grid"}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg>
            </button>
          </div>
        </div>
      </header>

      <aside className="cran-catalog__filters katolg_left evkrator-catalog__filters">
        <div className="marka_in evkrator-catalog__brand-filter">
          <h1>{t("katolg_brand_label")}</h1>
          <div className="in cran-catalog__search"><input type="search" value={brandQuery} onChange={(event) => setBrandQuery(event.target.value)} placeholder={t("katolg_search_placeholder")} aria-label={t("katolg_search_placeholder")} /></div>
        </div>
        <div className="mk">
          {visibleBrands.map((brand) => <label className="kj" key={brand.value}><input type="checkbox" checked={selectedBrands.includes(brand.value)} onChange={() => toggleValue(setSelectedBrands, brand.value)} /><p>{t(brand.labelKey)}</p></label>)}
        </div>
        <div className="marka_in evkrator-catalog__filter-group">
          <h1>{t("evkrator_platform_type_label")}</h1>
          <div className="mk">{evkratorPlatformTypes.map((item) => <label className="kj" key={item.value}><input type="checkbox" checked={selectedPlatformTypes.includes(item.value)} onChange={() => toggleValue(setSelectedPlatformTypes, item.value)} /><p>{t(item.labelKey)}</p></label>)}</div>
        </div>
        <div className="marka_in evkrator-catalog__filter-group">
          <h1>{t("awp_wheel_formula_label")}</h1>
          <div className="mk">{evkratorWheelFormulas.map((formula) => <label className="kj" key={formula}><input type="checkbox" checked={selectedWheelFormulas.includes(formula)} onChange={() => toggleValue(setSelectedWheelFormulas, formula)} /><p>{formula}</p></label>)}</div>
        </div>
        <div className="marka_in evkrator-catalog__filter-group">
          <h1>{t("evkrator_platform_length_label")}</h1>
          <div className="mk">{evkratorPlatformLengths.map((length) => <label className="kj" key={length}><input type="checkbox" checked={selectedLengths.includes(length)} onChange={() => toggleValue(setSelectedLengths, length)} /><p>{length}</p></label>)}</div>
        </div>
        <div className="evkrator-catalog__filter-actions">
          <div className="btn9"><button type="button" onClick={() => productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>{t("katolg_show_products_btn")}</button></div>
          {hasFilters && <button type="button" className="btn_reset" onClick={resetFilters}>{t("katolg_reset_btn")}</button>}
        </div>
      </aside>

      <div className="evkrator-catalog__results">
        <div ref={productsRef} className={`cran-catalog__products katolg_data ${view === "list" ? "katolg_data--list" : ""}`}>
          {visibleProducts.length === 0 ? <p className="cran-catalog__empty">{t("katolg_empty")}</p> : visibleProducts.map((product) => {
            const isFavorite = favorites.includes(product.id);
            return (
              <div key={product.id}>
                <article className={`product-card cursor-pointer ${!product.available ? "evkrator-product--unavailable" : ""}`} role="link" tabIndex={0} onClick={() => navigate("/information")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); navigate("/information"); } }}>
                  <div className="product-card__image">
                    <img src={product.image} alt={t(product.titleKey)} />
                    {!product.available && <span className="evkrator-product__unavailable-label">{t("awp_unavailable")}</span>}
                    <button type="button" className={`product-card__favorite ${isFavorite ? "active" : ""}`} onClick={(event) => { event.stopPropagation(); toggleFavorite(product.id); }} aria-label={t("catalog_favorite")} aria-pressed={isFavorite}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "#f5a623" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    </button>
                  </div>
                  <div className="product-card__info">
                    <h3 className="product-card__title">{t(product.titleKey)}</h3>
                    {view === "list" ? (
                      <div className="product-card__actions">
                        <p className="product-card__price">{t("price_on_request")}</p>
                        <div className="product-card__action-buttons">
                          {product.available ? (
                            <>
                              <button type="button" className="product-card__btn-main" onClick={(event) => { event.stopPropagation(); navigate("/information"); }}>{t("btn_more")}</button>
                              <button type="button" className="product-card__btn-secondary" onClick={(event) => { event.stopPropagation(); navigate("/contacts"); }} aria-label={t("btn_get_offer")} title={t("btn_get_offer")}>{t("btn_get_offer")}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" /></svg></button>
                            </>
                          ) : (
                            <button type="button" className="evkrator-product__similar" onClick={(event) => { event.stopPropagation(); navigate("/contacts"); }}>{t("awp_request_similar")}<i className="fa-regular fa-envelope" aria-hidden="true" /></button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="product-card__price">{t("price_on_request")}</p>
                        <div className="product-card__actions">
                          {product.available ? (
                            <>
                              <button type="button" className="product-card__btn-main" onClick={(event) => { event.stopPropagation(); navigate("/information"); }}>{t("btn_more")}</button>
                              <button type="button" className="product-card__cart cursor-pointer" onClick={(event) => { event.stopPropagation(); addToCart(product); }} aria-label={t("catalog_add_to_cart")}><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16" aria-hidden="true"><path d="M0 0h16v16H0z" fill="none" /><path fill="currentColor" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607L1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4a2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4a2 2 0 0 0-2-2m-7 1a1 1 0 1 1 0 2a1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2a1 1 0 0 1 0-2" /></svg></button>
                              <button type="button" className="product-card__btn-secondary text-[16px]" onClick={(event) => { event.stopPropagation(); navigate("/contacts"); }} aria-label={t("btn_get_offer")} title={t("btn_get_offer")}>{t("btn_get_offer")}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" /></svg></button>
                            </>
                          ) : (
                            <button type="button" className="evkrator-product__similar" onClick={(event) => { event.stopPropagation(); navigate("/contacts"); }}>{t("awp_request_similar")}<i className="fa-regular fa-envelope" aria-hidden="true" /></button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        <section className="evkrator-catalog__description">
          <p>{t("evkrator_desc_intro")}</p>
          <h2>{t("katolg_assortment_title")}</h2>
          <p>{t("evkrator_desc_assortment")}</p>
          <h3>{t("evkrator_chassis_label")}</h3>
          <ul><li>KAMAZ</li><li>ISUZU</li></ul>
          <p>{t("evkrator_desc_quality")}</p>
          <h2>{t("evkrator_features_title")}</h2>
          <ul>{Array.from({ length: 6 }, (_, index) => <li key={index}>{t(`evkrator_feature_${index + 1}`)}</li>)}</ul>
          <h2>{t("evkrator_applications_title")}</h2>
          <p>{t("evkrator_applications_text")}</p>
          <h2>{t("evkrator_advantages_title")}</h2>
          <ul>{Array.from({ length: 7 }, (_, index) => <li key={index}>{t(`evkrator_advantage_${index + 1}`)}</li>)}</ul>
          <h2>{t("evkrator_bottom_title")}</h2>
          <p>{t("evkrator_bottom_text")}</p>
        </section>
      </div>
    </section>
  );
};

export default CatalogEvkrator;