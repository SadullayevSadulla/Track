import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../i18n/LanguageContext";
import { useCartStore } from "../../../store/cartStore";
import CatalogFurgonData, { furgonBrands, furgonLengths } from "./catalogFurgonData";
import "../../Home/MainCard/mainCard.css";
import "../katolg.css";
import "../CatalogKran/catalogCran.css";
import "./catalogFurgon.css";

const lengthMatches = (productLength, filter) => {
  if (typeof filter === "number") return productLength === filter;
  const [min, max] = filter.split("...").map(Number);
  return productLength >= min && productLength <= max;
};

const CatalogFurgon = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const productsRef = useRef(null);
  const [view, setView] = useState("grid");
  const [brandQuery, setBrandQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedLengths, setSelectedLengths] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const visibleBrands = useMemo(() => {
    const query = brandQuery.trim().toLocaleLowerCase();
    return furgonBrands.filter((brand) => t(brand.labelKey).toLocaleLowerCase().includes(query));
  }, [brandQuery, t]);

  const visibleProducts = useMemo(() => CatalogFurgonData.filter((product) => {
    const brandMatch = !selectedBrands.length || selectedBrands.includes(product.brand);
    const lengthMatch = !selectedLengths.length || selectedLengths.some((length) => lengthMatches(product.length, length));
    return brandMatch && lengthMatch;
  }), [selectedBrands, selectedLengths]);

  const toggleValue = (setter, value) => {
    setter((current) => current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value]);
  };

  const resetFilters = () => {
    setBrandQuery("");
    setSelectedBrands([]);
    setSelectedLengths([]);
  };

  const toggleFavorite = (id) => {
    setFavorites((current) => current.includes(id)
      ? current.filter((favoriteId) => favoriteId !== id)
      : [...current, id]);
  };

  const count = CatalogFurgonData.length;
  const itemSuffix = lang === "ru" && count % 10 === 1 && count % 100 !== 11
    ? "товар"
    : lang === "ru" && count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14)
      ? "товара"
      : t("catalog_items_suffix");
  const hasFilters = Boolean(brandQuery || selectedBrands.length || selectedLengths.length);

  return (
    <section className="cran-catalog furgon-catalog container">
      <header className="cran-catalog__header">
        <div className="cran-catalog__heading">
          <h1>{t("menu_cat_isotherm")}</h1>
          <span>{count} {itemSuffix}</span>
        </div>
        <div className="furgon-catalog__tools">
          <div className="cran-catalog__view" aria-label={t("catalog_view_label")}>
            <button type="button" className={view === "list" ? "is-active" : ""} onClick={() => setView("list")} aria-label={t("catalog_list_view")} aria-pressed={view === "list"}><i className="fa-solid fa-list-ul" /></button>
            <button type="button" className={view === "grid" ? "is-active" : ""} onClick={() => setView("grid")} aria-label={t("catalog_grid_view")} aria-pressed={view === "grid"}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg>
            </button>
          </div>
        </div>
      </header>

      <aside className="cran-catalog__filters katolg_left furgon-catalog__filters">
        <div className="marka_in furgon-catalog__brand-filter">
          <h1>{t("katolg_brand_label")}</h1>
          <div className="in cran-catalog__search"><input type="search" value={brandQuery} onChange={(event) => setBrandQuery(event.target.value)} placeholder={t("katolg_search_placeholder")} aria-label={t("katolg_search_placeholder")} /></div>
        </div>
        <div className="mk">
          {visibleBrands.map((brand) => <label className="kj" key={brand.value}><input type="checkbox" checked={selectedBrands.includes(brand.value)} onChange={() => toggleValue(setSelectedBrands, brand.value)} /><p>{t(brand.labelKey)}</p></label>)}
        </div>
        <div className="marka_in furgon-catalog__length-filter">
          <h1>{t("bord_platform_length_label")}</h1>
          <div className="mk">
            {furgonLengths.map((length) => <label className="kj" key={String(length)}><input type="checkbox" checked={selectedLengths.includes(length)} onChange={() => toggleValue(setSelectedLengths, length)} /><p>{String(length)}</p></label>)}
          </div>
        </div>
        <div className="furgon-catalog__filter-actions">
          <div className="btn9"><button type="button" onClick={() => productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>{t("katolg_show_products_btn")}</button></div>
          {hasFilters && <button type="button" className="btn_reset" onClick={resetFilters}>{t("katolg_reset_btn")}</button>}
        </div>
      </aside>

      <div className="furgon-catalog__results">
        <div ref={productsRef} className={`cran-catalog__products katolg_data ${view === "list" ? "katolg_data--list" : ""}`}>
          {visibleProducts.length === 0 ? <p className="cran-catalog__empty">{t("katolg_empty")}</p> : visibleProducts.map((product) => {
            const isFavorite = favorites.includes(product.id);
            return (
              <div key={product.id}>
                <article className={`product-card cursor-pointer ${!product.available ? "furgon-product--unavailable" : ""}`} role="link" tabIndex={0} onClick={() => navigate("/information")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); navigate("/information"); } }}>
                  <div className="product-card__image">
                    <img src={product.image} alt={`${t("menu_cat_isotherm")} ${t(`brand_${product.brand}`)} ${product.model}`} />
                    {!product.available && <span className="furgon-product__unavailable-label">{t("awp_unavailable")}</span>}
                    <button type="button" className={`product-card__favorite ${isFavorite ? "active" : ""}`} onClick={(event) => { event.stopPropagation(); toggleFavorite(product.id); }} aria-label={t("catalog_favorite")} aria-pressed={isFavorite}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "#f5a623" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    </button>
                  </div>
                  <div className="product-card__info">
                    <h3 className="product-card__title">{t("menu_cat_isotherm")} {t(`brand_${product.brand}`)} {product.model}</h3>
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
                    {view === "list" ? (
                      <div className="product-card__actions">
                        <p className="product-card__price">{t("price_on_request")}</p>
                        <div className="product-card__action-buttons">
                          {product.available ? <>
                            <button type="button" className="product-card__btn-main" onClick={(event) => { event.stopPropagation(); navigate("/information"); }}>{t("btn_more")}</button>
                            <button type="button" className="product-card__btn-secondary" onClick={(event) => { event.stopPropagation(); navigate("/contacts"); }} aria-label={t("btn_get_offer")} title={t("btn_get_offer")}>{t("btn_get_offer")}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" /></svg></button>
                          </> : <button type="button" className="furgon-product__similar" onClick={(event) => { event.stopPropagation(); navigate("/contacts"); }}>{t("awp_request_similar")}<i className="fa-regular fa-envelope" aria-hidden="true" /></button>}
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="product-card__price">{t("price_on_request")}</p>
                        <div className="product-card__actions">
                          {product.available ? <>
                            <button type="button" className="product-card__btn-main" onClick={(event) => { event.stopPropagation(); navigate("/information"); }}>{t("btn_more")}</button>
                            <button type="button" className="product-card__cart cursor-pointer" onClick={(event) => { event.stopPropagation(); addToCart(product); }} aria-label={t("catalog_add_to_cart")}><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16" aria-hidden="true"><path d="M0 0h16v16H0z" fill="none" /><path fill="currentColor" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607L1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4a2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4a2 2 0 0 0-2-2m-7 1a1 1 0 1 1 0 2a1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2a1 1 0 0 1 0-2" /></svg></button>
                            <button type="button" className="product-card__btn-secondary text-[16px]" onClick={(event) => { event.stopPropagation(); navigate("/contacts"); }} aria-label={t("btn_get_offer")} title={t("btn_get_offer")}>{t("btn_get_offer")}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" /></svg></button>
                          </> : <button type="button" className="furgon-product__similar" onClick={(event) => { event.stopPropagation(); navigate("/contacts"); }}>{t("awp_request_similar")}<i className="fa-regular fa-envelope" aria-hidden="true" /></button>}
                        </div>
                      </>
                    )}
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        <section className="furgon-catalog__description">
          <p>Транспортировка товаров с соблюдением температурного режима становится всё более востребованной в разных отраслях. Компании, работающие с продуктами питания, фармацевтикой и другими чувствительными грузами, всё чаще выбирают изотермические фургоны для безопасной доставки.</p>
          <h2>Ассортимент</h2>
          <p>В компании представлен широкий выбор техники для перевозки продукции при заданном температурном режиме. В каталоге представлены модели от проверенных производителей:</p>
          <ul>
            <li>KAMAZ</li>
            <li>JAC</li>
            <li>DAEWOO</li>
            <li>FAW</li>
            <li>DONG FENG</li>
            <li>SHACMAN</li>
            <li>ISUZU</li>
            <li>HYUNDAI</li>
            <li>HINO</li>
            <li>FUSO</li>
          </ul>
          <p>Каждая марка отличается надежностью и современными технологиями, обеспечивая сохранность груза на всех этапах транспортировки. Выбор подходящей модели позволяет оптимизировать логистику и повысить эффективность работы компании.</p>
          <h2>Особенности изотермических фургонов</h2>
          <ul>
            <li>Сохранение температуры — надежная термоизоляция позволяет поддерживать стабильный температурный режим, предотвращая порчу продукции.</li>
            <li>Разнообразие моделей — широкий выбор фургонов разного объема и грузоподъемности обеспечивает оптимальный вариант для любых задач.</li>
            <li>Надежность техники — проверенные марки и современные технологии снижают риск поломок и обеспечивают долгий срок службы транспорта.</li>
            <li>Экономия ресурсов — уменьшение потерь груза и оптимизация логистики сокращают затраты на перевозку и хранение.</li>
            <li>Удобство эксплуатации — продуманная конструкция фургонов облегчает загрузку, разгрузку и обслуживание транспорта.</li>
            <li>Поддержка производителя — наличие сервисных центров и консультаций позволяет быстро решить любые вопросы, связанные с эксплуатацией.</li>
          </ul>
          <h2>Сферы применения</h2>
          <p>Изотермические фургоны активно используются в пищевой промышленности для перевозки продуктов, требующих поддержания определенной температуры. Фрукты, овощи, мясо и молочная продукция сохраняют свежесть на протяжении всего пути, что особенно важно для дальних перевозок и дистрибуции в розничные сети.</p>
          <h2>Преимущества работы с компанией «РусТрак»</h2>
          <ul>
            <li>Широкий выбор техники — компания предлагает фургоны разных марок и моделей, что позволяет подобрать оптимальный вариант под любые задачи.</li>
            <li>Качество и надежность — все транспортные средства соответствуют современным стандартам и проходят проверку перед продажей.</li>
            <li>Профессиональная консультация — специалисты помогают подобрать модель с учетом особенностей бизнеса и требований к перевозкам.</li>
            <li>Поддержка и сервис — «РусТрак» обеспечивает сервисное обслуживание, ремонт и поставку запчастей, что снижает риски простоя техники.</li>
            <li>Индивидуальный подход — компания учитывает потребности каждого клиента, предлагая гибкие условия покупки и дополнительное оборудование.</li>
            <li>Оптимизация логистики — грамотный подбор техники и сопровождение сделки позволяют повысить эффективность перевозок и сократить расходы.</li>
          </ul>
          <h2>Оптимальные решения для температурной логистики</h2>
          <p>Купить фургон изотермический цена которого соответствует бюджету и различным задачам — разумное решение для компаний, стремящихся к надежной перевозке товаров. Такой транспорт обеспечивает стабильный температурный режим и минимизирует потери продукции. Компания «РусТрак» помогает подобрать технику с учетом индивидуальных требований и особенностей бизнеса, чтобы обеспечить оптимальный выбор для ваших перевозок.</p>
        </section>
      </div>
    </section>
  );
};

export default CatalogFurgon;