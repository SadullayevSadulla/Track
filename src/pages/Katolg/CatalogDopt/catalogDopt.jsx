import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../i18n/LanguageContext";
import { useCartStore } from "../../../store/cartStore";
import CatalogDoptData, {
  doptBrands,
  doptPlatformTypes,
  doptMasses,
  doptWheelFormulas,
  doptLengths,
} from "./CatalogDoptData";
import "../../Home/MainCard/mainCard.css";
import "../katolg.css";
import "../CatalogKran/catalogCran.css";
import "../CatalogCanto/catalogCanto.css";
import "./catalogDopt.css";

const CatalogDopt = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const productsRef = useRef(null);
  const [view, setView] = useState("grid");
  const [brandQuery, setBrandQuery] = useState("");
  const [brands, setBrands] = useState([]);
  const [platformTypes, setPlatformTypes] = useState([]);
  const [masses, setMasses] = useState([]);
  const [formulas, setFormulas] = useState([]);
  const [lengths, setLengths] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const visibleBrands = useMemo(() => {
    const query = brandQuery.trim().toLocaleLowerCase();
    return doptBrands.filter((b) => b.label.toLocaleLowerCase().includes(query));
  }, [brandQuery]);

  const visibleProducts = useMemo(
    () => CatalogDoptData.filter((p) =>
      (!brands.length || brands.includes(p.brand)) &&
      (!platformTypes.length || platformTypes.includes(p.platformType)) &&
      (!masses.length || masses.includes(p.mass)) &&
      (!formulas.length || formulas.includes(p.wheelFormula)) &&
      (!lengths.length || lengths.includes(p.length))
    ),
    [brands, platformTypes, masses, formulas, lengths]
  );

  const toggleValue = (setter, value) =>
    setter((cur) => (cur.includes(value) ? cur.filter((i) => i !== value) : [...cur, value]));

  const toggleFavorite = (id) =>
    setFavorites((cur) => (cur.includes(id) ? cur.filter((i) => i !== id) : [...cur, id]));

  const resetFilters = () => {
    setBrandQuery("");
    setBrands([]);
    setPlatformTypes([]);
    setMasses([]);
    setFormulas([]);
    setLengths([]);
  };

  const hasFilters = Boolean(
    brandQuery || brands.length || platformTypes.length || masses.length || formulas.length || lengths.length
  );

  const count = CatalogDoptData.length;
  const itemSuffix =
    lang === "ru" && count % 10 === 1 && count % 100 !== 11
      ? "товар"
      : lang === "ru" && count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14)
        ? "товара"
        : t("catalog_items_suffix");

  const stop = (fn) => (event) => { event.stopPropagation(); fn(); };

  const renderGroup = (title, items, selected, setter) => (
    <div className="marka_in canto-catalog__formula-filter">
      <h1>{title}</h1>
      <div className="mk">
        {items.map((item) => (
          <label className="kj" key={item}>
            <input type="checkbox" checked={selected.includes(item)} onChange={() => toggleValue(setter, item)} />
            <p>{item}</p>
          </label>
        ))}
      </div>
    </div>
  );

  const renderButtons = (product, withCart) =>
    product.available ? (
      <>
        <button type="button" className="product-card__btn-main" onClick={stop(() => navigate("/information"))}>{t("btn_more")}</button>
        {withCart && (
          <button type="button" className="product-card__cart cursor-pointer" onClick={stop(() => addToCart(product))} aria-label={t("catalog_add_to_cart")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16" aria-hidden="true"><path d="M0 0h16v16H0z" fill="none" /><path fill="currentColor" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607L1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4a2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4a2 2 0 0 0-2-2m-7 1a1 1 0 1 1 0 2a1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2a1 1 0 0 1 0-2" /></svg>
          </button>
        )}
        <button type="button" className="product-card__btn-secondary" onClick={stop(() => navigate("/contacts"))} title={t("btn_get_offer")}>
          {t("btn_get_offer")}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" /></svg>
        </button>
      </>
    ) : (
      <button type="button" className="canto-product__similar" onClick={stop(() => navigate("/contacts"))}>
        {t("awp_request_similar")}<i className="fa-regular fa-envelope" aria-hidden="true" />
      </button>
    );

  return (
    <section className="cran-catalog canto-catalog dopt-catalog container">
      <header className="cran-catalog__header">
        <div className="cran-catalog__heading">
          <h1>Автомобили ДОПОГ категория EXII</h1>
          <span>{count} {itemSuffix}</span>
        </div>
        <div className="canto-catalog__tools">
          <div className="cran-catalog__view" aria-label={t("catalog_view_label")}>
            <button type="button" className={view === "list" ? "is-active" : ""} onClick={() => setView("list")} aria-label={t("catalog_list_view")} aria-pressed={view === "list"}><i className="fa-solid fa-list-ul" /></button>
            <button type="button" className={view === "grid" ? "is-active" : ""} onClick={() => setView("grid")} aria-label={t("catalog_grid_view")} aria-pressed={view === "grid"}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg>
            </button>
          </div>
        </div>
      </header>

      <aside className="cran-catalog__filters katolg_left canto-catalog__filters dopt-catalog__filters">
        <div className="marka_in canto-catalog__brand-filter">
          <h1>{t("katolg_brand_label")}</h1>
          <div className="in cran-catalog__search"><input type="search" value={brandQuery} onChange={(e) => setBrandQuery(e.target.value)} placeholder={t("katolg_search_placeholder")} aria-label={t("katolg_search_placeholder")} /></div>
        </div>
        <div className="mk">
          {visibleBrands.map((brand) => (
            <label className="kj" key={brand.value}>
              <input type="checkbox" checked={brands.includes(brand.value)} onChange={() => toggleValue(setBrands, brand.value)} />
              <p>{brand.label}</p>
            </label>
          ))}
        </div>

        {renderGroup("Тип бортовой платформы", doptPlatformTypes, platformTypes, setPlatformTypes)}
        {renderGroup("Полная масса, тонн", doptMasses, masses, setMasses)}
        {renderGroup(t("awp_wheel_formula_label"), doptWheelFormulas, formulas, setFormulas)}
        {renderGroup("Длина платформы, м", doptLengths, lengths, setLengths)}

        <div className="canto-catalog__filter-actions">
          <div className="btn9">
            <button type="button" onClick={() => productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>{t("katolg_show_products_btn")}</button>
          </div>
          {hasFilters && <button type="button" className="btn_reset" onClick={resetFilters}>{t("katolg_reset_btn")}</button>}
        </div>
      </aside>

      <div className="canto-catalog__results">
        <div ref={productsRef} className={`cran-catalog__products katolg_data ${view === "list" ? "katolg_data--list" : ""}`}>
          {visibleProducts.length === 0 ? <p className="cran-catalog__empty">{t("katolg_empty")}</p> : visibleProducts.map((product) => {
            const isFavorite = favorites.includes(product.id);
            return (
              <div key={product.id}>
                <article
                  className={`product-card cursor-pointer ${!product.available ? "canto-product--unavailable" : ""}`}
                  role="link" tabIndex={0}
                  onClick={() => navigate("/information")}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); navigate("/information"); } }}
                >
                  <div className="product-card__image">
                    <img src={product.image} alt={product.title} />
                    {!product.available && <span className="canto-product__unavailable-label">{t("awp_unavailable")}</span>}
                    <button type="button" className={`product-card__favorite ${isFavorite ? "active" : ""}`} onClick={stop(() => toggleFavorite(product.id))} aria-label={t("catalog_favorite")} aria-pressed={isFavorite}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "#f5a623" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    </button>
                  </div>
                  <div className="product-card__info">
                    <h3 className="product-card__title">{product.title}</h3>
                    {view === "list" ? (
                      <div className="product-card__actions">
                        <p className="product-card__price">{t("price_on_request")}</p>
                        <div className="product-card__action-buttons">{renderButtons(product, false)}</div>
                      </div>
                    ) : (
                      <>
                        <p className="product-card__price">{t("price_on_request")}</p>
                        <div className="product-card__actions">{renderButtons(product, true)}</div>
                      </>
                    )}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CatalogDopt;