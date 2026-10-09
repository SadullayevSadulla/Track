import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../i18n/LanguageContext";
import { useCartStore } from "../../../store/cartStore";
import CatalogIlData, { ilWheelFormulas } from "./catalogIlData";
import "../../Home/MainCard/mainCard.css";
import "../katolg.css";
import "../CatalogKran/catalogCran.css";
import "../CatalogCanto/catalogCanto.css";
import "./catalogIl.css";

const CatalogIl = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const productsRef = useRef(null);
  const [view, setView] = useState("grid");
  const [selectedFormulas, setSelectedFormulas] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const visibleProducts = useMemo(
    () => CatalogIlData.filter(
      (p) => !selectedFormulas.length || selectedFormulas.includes(p.wheelFormula)
    ),
    [selectedFormulas]
  );

  const toggleFormula = (value) =>
    setSelectedFormulas((cur) => (cur.includes(value) ? cur.filter((i) => i !== value) : [...cur, value]));

  const toggleFavorite = (id) =>
    setFavorites((cur) => (cur.includes(id) ? cur.filter((i) => i !== id) : [...cur, id]));

  const count = CatalogIlData.length;
  const itemSuffix =
    lang === "ru" && count % 10 === 1 && count % 100 !== 11
      ? "товар"
      : lang === "ru" && count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14)
        ? "товара"
        : t("catalog_items_suffix");

  const stop = (fn) => (event) => { event.stopPropagation(); fn(); };

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
    <section className="cran-catalog canto-catalog il-catalog container">
      <header className="cran-catalog__header">
        <div className="cran-catalog__heading">
          <h1>Крюковые погрузчики</h1>
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

      <aside className="cran-catalog__filters katolg_left canto-catalog__filters il-catalog__filters">
        <div className="marka_in canto-catalog__formula-filter">
          <h1>{t("awp_wheel_formula_label")}</h1>
          <div className="mk">
            {ilWheelFormulas.map((formula) => (
              <label className="kj" key={formula}>
                <input type="checkbox" checked={selectedFormulas.includes(formula)} onChange={() => toggleFormula(formula)} />
                <p>{formula}</p>
              </label>
            ))}
          </div>
        </div>
        <div className="canto-catalog__filter-actions">
          <div className="btn9">
            <button type="button" onClick={() => productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>{t("katolg_show_products_btn")}</button>
          </div>
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

        <section className="canto-catalog__description">
          <p>Транспортная логистика оказывает значительное влияние на развитие промышленности и торговли. Для эффективной работы портов и складов используют крюковой погрузчик, способный справляться с тяжелыми грузами. Новые технические решения в этой сфере повышают скорость и безопасность операций. Компания «РусТрак» внедряет инновационные подходы, оптимизируя процессы перевозки и хранения. Автоматизация и цифровые системы контроля позволяют снизить человеческий фактор и ускорить обработку грузов. Применение современных механизмов значительно увеличивает производительность и снижает издержки.</p>

          <h2>Ассортимент</h2>
          <p>Мы предлагаем только качественную и сертифицированную технику, которая соответствует всем стандартам безопасности и надежности. Каждая единица оборудования проходит строгий контроль и готова к интенсивной эксплуатации, что гарантирует долгий срок службы и эффективность работы. Среди представленных марок:</p>
          <ul>
            <li>ISUZU</li>
            <li>HYUNDAI</li>
          </ul>
          <p>Все модели оснащены современными системами управления и проверенными механизмами, что делает их удобными и безопасными в эксплуатации. Выбор техники позволяет подобрать оптимальное решение под любые задачи и условия работы, обеспечивая стабильность и производительность на высоком уровне.</p>

          <h2>Особенности крюковых погрузчиков</h2>
          <ul>
            <li>Мощные подъемные механизмы – крюковые мультилифты позволяют легко справляться с тяжелыми и крупногабаритными грузами.</li>
            <li>Надёжная конструкция шасси – обеспечивает стабильность и долговечность даже при интенсивной эксплуатации.</li>
            <li>Гибкость и маневренность – техника легко работает в ограниченном пространстве, на узких складах и стройплощадках.</li>
            <li>Система автоматической защиты – предотвращает перегрузку и защищает механизмы от поломок.</li>
            <li>Энергоэффективность – оптимизированный расход топлива снижает эксплуатационные затраты.</li>
            <li>Удобство обслуживания – простая конструкция узлов и лёгкий доступ к сервисным точкам ускоряют ремонт и техобслуживание.</li>
            <li>Адаптивность к условиям работы – техника готова к эксплуатации при разных климатических и дорожных условиях.</li>
          </ul>

          <h2>Сферы применения</h2>
          <p>Погрузчик с крюком активно используется в портах и на терминалах для быстрой погрузки и разгрузки контейнеров и крупногабаритных грузов. Техника позволяет эффективно перемещать тяжелые материалы и оборудование на строительных и промышленных площадках.</p>
          <p>В промышленности техника применяется для перемещения сырья, готовой продукции и крупногабаритного оборудования внутри производственных цехов и складских помещений. Использование современных механизмов повышает скорость операций и минимизирует риск повреждения грузов, что делает логистические процессы более стабильными и предсказуемыми.</p>

          <h2>Преимущества работы с компанией «РусТрак»</h2>
          <ul>
            <li>Широкий выбор техники – компания предлагает разнообразные модели погрузчиков и специализированного оборудования, что позволяет подобрать решение под любые задачи.</li>
            <li>Качественная сертифицированная техника – крюковой погрузчик проходит строгий контроль качества и полностью соответствует стандартам безопасности и надежности.</li>
            <li>Профессиональная поддержка – специалисты компании готовы помочь с выбором, настройкой и эксплуатацией оборудования.</li>
            <li>Сервисное обслуживание и запчасти – оперативный ремонт и наличие оригинальных запчастей минимизируют простои техники.</li>
            <li>Индивидуальные решения – компания подбирает технику и условия работы с учетом особенностей бизнеса каждого клиента.</li>
            <li>Опыт и репутация – «РусТрак» имеет многолетний опыт на рынке и зарекомендовал себя как надежный партнер в сфере транспортной логистики.</li>
            <li>Оптимизация затрат – выгодные условия поставки и обслуживания помогают снизить расходы на эксплуатацию оборудования.</li>
          </ul>

          <h2>Надёжные решения для грузоперевозок</h2>
          <p>Погрузчик с крюком демонстрирует высокую эффективность при работе с тяжелыми грузами и ускоряет логистические процессы. Инвестиции в современную технику помогают повысить производительность и снизить затраты. Компания «РусТрак» предлагает широкий спектр решений для транспортной логистики и обслуживания оборудования. Оцените возможности автоматизации и внедрите новые технологии в свой бизнес. Следите за обновлениями и совершенствуйте процессы хранения и перевозки грузов. Для оформления заказа свяжитесь с нами любым удобным способом, и наши специалисты помогут подобрать оптимальное решение.</p>
        </section>
      </div>
    </section>
  );
};

export default CatalogIl;