import "./katolg.css"
import katolgData, { BRANDS, WEIGHTS } from "./katolgData"
import { useMemo, useRef, useState } from "react"
import { useLanguage } from "../../i18n/LanguageContext"
import { useNavigate } from "react-router-dom"
import { useCartStore } from "../../store/cartStore"

const Katolg = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()

  const [favorites, setFavorites] = useState([])
  const addToCart = useCartStore((state) => state.addToCart);
  const [view, setView] = useState("list")
  const [brandQuery, setBrandQuery] = useState("")
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedWeights, setSelectedWeights] = useState([])
  const [offerModalOpen, setOfferModalOpen] = useState(false)
  const [offerForm, setOfferForm] = useState({
    name: "",
    email: "",
    phone: "",
    consent: true,
  })
  const dataRef = useRef(null)

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    )
  }

  const toggleInList = (setter, value) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const visibleBrands = useMemo(() => {
    const q = brandQuery.trim().toLowerCase()
    if (!q) return BRANDS
    return BRANDS.filter((b) => t(b.labelKey).toLowerCase().includes(q))
  }, [brandQuery, t])

  const filteredProducts = useMemo(() => {
    return katolgData.filter((p) => {
      const brandOk = selectedBrands.length === 0 || selectedBrands.includes(p.brand)
      const weightOk = selectedWeights.length === 0 || selectedWeights.includes(p.weight)
      return brandOk && weightOk
    })
  }, [selectedBrands, selectedWeights])

  const resetFilters = () => {
    setSelectedBrands([])
    setSelectedWeights([])
    setBrandQuery("")
  }

  const scrollToProducts = () => {
    dataRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleOfferChange = (event) => {
    const { name, value, type, checked } = event.target
    setOfferForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleOfferSubmit = (event) => {
    event.preventDefault()
    if (!offerForm.name.trim() || !offerForm.email.trim() || !offerForm.phone.trim()) return
    setOfferModalOpen(false)
    setOfferForm({ name: "", email: "", phone: "", consent: true })
  }

  const hasFilters = selectedBrands.length > 0 || selectedWeights.length > 0 || brandQuery

  return (
    <section className="container">
      {offerModalOpen && (
        <div className="offer_modal_overlay" onClick={() => setOfferModalOpen(false)}>
          <div className="offer_modal" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="offer_modal_close"
              onClick={() => setOfferModalOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            <h3 className="offer_modal_title">Получить коммерческое предложение</h3>

            <form className="offer_modal_form" onSubmit={handleOfferSubmit}>
              <label className="offer_field">
                <span>Ваше имя <span className="required">*</span></span>
                <input type="text" name="name" value={offerForm.name} onChange={handleOfferChange} placeholder="Иван" required />
              </label>
              <label className="offer_field">
                <span>E-mail <span className="required">*</span></span>
                <input type="email" name="email" value={offerForm.email} onChange={handleOfferChange} placeholder="your@mail.com" required />
              </label>
              <label className="offer_field">
                <span>Телефон <span className="required">*</span></span>
                <input type="tel" name="phone" value={offerForm.phone} onChange={handleOfferChange} placeholder="+7" required />
              </label>
              <label className="offer_checkbox">
                <input type="checkbox" name="consent" checked={offerForm.consent} onChange={handleOfferChange} />
                <span>Я согласен на обработку персональных данных</span>
              </label>
              <button type="submit" className="offer_submit_btn">{t("btn_get_offer")}</button>
            </form>
          </div>
        </div>
      )}

      <div className="katolg">
        <div className="katolg_top flex justify-between items-center">
          <div className="top_text flex items-center gap-8">
            <h1 className="font-[500] text-[32px]">{t("katolg_title")}</h1>
            <p>
              {t("katolg_count")} ({filteredProducts.length})
            </p>
          </div>

          <div className="top_button flex items-center gap-4">
            <button
              type="button"
              className={`btnn ${view === "list" ? "active" : ""}`}
              onClick={() => setView("list")}
              aria-label="List view"
              aria-pressed={view === "list"}
            >
              <i className="fa-solid fa-list-ul"></i>
            </button>

            <button
              type="button"
              className={`btnn ${view === "grid" ? "active" : ""}`}
              onClick={() => setView("grid")}
              aria-label="Grid view"
              aria-pressed={view === "grid"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <rect width="8" height="8" x="3" y="3" fill="currentColor" rx="1.5" ry="1.5" />
                <rect width="8" height="8" x="13" y="3" fill="currentColor" rx="1.5" ry="1.5" />
                <rect width="8" height="8" x="3" y="13" fill="currentColor" rx="1.5" ry="1.5" />
                <rect width="8" height="8" x="13" y="13" fill="currentColor" rx="1.5" ry="1.5" />
              </svg>
            </button>
          </div>
        </div>
        <div className="katolg_left mt-10">
          <div className="left_marka flex flex-col gap-6">
            <div className="marka_in">
              <h1>{t("katolg_brand_label")}</h1>
              <div className="in">
                <input
                  type="search"
                  placeholder={t("katolg_search_placeholder")}
                  value={brandQuery}
                  onChange={(e) => setBrandQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="mk">
              {visibleBrands.map((brand) => (
                <label className="kj" key={brand.value}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.value)}
                    onChange={() => toggleInList(setSelectedBrands, brand.value)}
                  />
                  <p>{t(brand.labelKey)}</p>
                </label>
              ))}
            </div>

            <div className="marka_in">
              <h1>{t("katolg_weight_label")}</h1>
              <div className="mk">
                {WEIGHTS.map((w) => (
                  <label className="kj" key={w.value}>
                    <input
                      type="checkbox"
                      checked={selectedWeights.includes(w.value)}
                      onChange={() => toggleInList(setSelectedWeights, w.value)}
                    />
                    <p>{t(w.labelKey)}</p>
                  </label>
                ))}
              </div>

              <div className="btn9">
                <button type="button" onClick={scrollToProducts}>
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
        </div>
        <div
          ref={dataRef}
          className={`katolg_data ${view === "list" ? "katolg_data--list" : ""}`}
        >
          {filteredProducts.length === 0 && (
            <p className="katolg_empty">{t("katolg_empty")}</p>
          )}

          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id)
            const weightLabel = WEIGHTS.find((w) => w.value === product.weight)?.labelKey

            return (
              <div key={product.id}>
                <div
                  className="product-card cursor-pointer"
                  role="link"
                  tabIndex={0}
                  onClick={() => navigate("/information")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      navigate("/information")
                    }
                  }}
                >
                  <div className="product-card__image">
                    <img src={product.image} alt={t(product.titleKey)} />

                    <button
                      type="button"
                      className={`product-card__favorite ${isFav ? "active" : ""}`}
                      onClick={(event) => {
                        event.stopPropagation()
                        toggleFavorite(product.id)
                      }}
                      aria-label="Favorite"
                      aria-pressed={isFav}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={isFav ? "#f5a623" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  </div>

                  <div className="product-card__info">
                    <h3 className="product-card__title">
                      {t(product.titleKey)}
                    </h3>

                    {view === "list" && (
                      <div className="product-card__specs">
                        <p>
                          <strong>{t("katolg_weight_label")}</strong>
                          <i></i>
                          <span>{t(`weight_${product.weight}`)}</span>
                        </p>
                        {product.loadCapacity && (
                          <p>
                            <strong>{t("katolg_load_label")}</strong>
                            <i></i>
                            <span>{product.loadCapacity} kg</span>
                          </p>
                        )}
                      </div>
                    )}

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
                            className="product-card__btn-main font-[400] text-[16px] text-[#000000]"
                          >
                            {t("btn_more")}
                          </button>

                          <button
                            type="button"
                            className="product-card__btn-secondary"
                            onClick={(event) => {
                              event.stopPropagation()
                              setOfferModalOpen(true)
                            }}
                          >
                            {t("btn_get_offer")}
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
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
                            className="product-card__btn-main font-[400] text-[16px] text-[#000000]"
                          >
                            {t("btn_more")}
                          </button>
                          <button
                            type="button"
                            className="product-card__cart cursor-pointer"
                            onClick={(event) => {
                              event.stopPropagation()

                              addToCart(product)
                            }}
                            aria-label="Savatga qo'shish"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.5em"
                              height="1.5em"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M0 0h16v16H0z"
                                fill="none"
                              />

                              <path
                                fill="currentColor"
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607L1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4a2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4a2 2 0 0 0-2 0m-7 1a1 1 0 1 1 0 2a1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2a1 1 0 0 1 0-2"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="product-card__btn-secondary text-[16px]"
                            aria-label={t("btn_get_offer")}
                            title={t("btn_get_offer")}
                            onClick={(event) => {
                              event.stopPropagation()
                              setOfferModalOpen(true)
                            }}
                          >
                            {t("btn_get_offer")}
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                            </svg>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="katolg_description">
          <p>{t("katolg_desc_1")}</p>
          <h2>{t("katolg_assortment_title")}</h2>
          <p>{t("katolg_desc_2")}</p>
          <p>{t("katolg_brands_label")}</p>
          <ul>
            <li>{t("brand_gaz")}</li>
            <li>{t("brand_valday")}</li>
            <li>{t("brand_kamaz")}</li>
            <li>{t("brand_kompas")}</li>
            <li>{t("brand_jac")}</li>
            <li>{t("brand_maz")}</li>
            <li>{t("brand_faw")}</li>
            <li>{t("brand_foton")}</li>
            <li>{t("brand_daewoo")}</li>
          </ul>
          <p>{t("katolg_desc_3")}</p>
          <h2>{t("katolg_features_title")}</h2>
          <ul>
            {Array.from({ length: 12 }, (_, i) => (
              <li key={i}>{t(`feature_${i + 1}`)}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Katolg