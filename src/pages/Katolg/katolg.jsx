import "./katolg.css"
import katolgData from "./katolgData"
import { useState } from "react"
import { SwiperSlide } from "swiper/react"
import { useLanguage } from "../../i18n/LanguageContext"

const Katolg = () => {
  const [favorites, setFavorites] = useState([])
  const { t } = useLanguage()

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favoriteId) => favoriteId !== id) : [...prev, id]
    )
  }

  return (
    <section className="container">
      <div className="katolg flex">
        <div className="katolg_top flex justify-between items-center">
          <div className="top_text flex items-center gap-8">
            <h1 className="font-[500] text-[32px]">{t("katolg_title")}</h1>
            <p>{t("katolg_count")}</p>
          </div>
          <div className="top_button flex items-center gap-4">
            <div className="btnn">
              <button><i className="fa-solid fa-list-ul"></i></button>
            </div>
            <button className="btnn">
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
                <input type="search" placeholder={t("katolg_search_placeholder")} />
              </div>
            </div>
            <div className="mk">
              <div className="kj">
                <input type="checkbox" />
                <p>{t("brand_gaz")}</p>
              </div>
              <div className="kj">
                <input type="checkbox" />
                <p>{t("brand_kamaz")}</p>
              </div>
              <div className="kj">
                <input type="checkbox" />
                <p>{t("brand_jac")}</p>
              </div>
              <div className="kj">
                <input type="checkbox" />
                <p>{t("brand_daewoo")}</p>
              </div>
              <div className="kj">
                <input type="checkbox" />
                <p>{t("brand_foton")}</p>
              </div>
              <div className="kj">
                <input type="checkbox" />
                <p>{t("brand_dongfeng")}</p>
              </div>
              <div className="kj">
                <input type="checkbox" />
                <p>{t("brand_maz")}</p>
              </div>
            </div>
            <div className="marka_in">
              <h1>{t("katolg_weight_label")}</h1>
              <div className="mk">
                <div className="kj">
                  <input type="checkbox" />
                  <p>{t("weight_up_to_12")}</p>
                </div>
                <div className="kj">
                  <input type="checkbox" />
                  <p>{t("weight_up_to_20")}</p>
                </div>
                <div className="kj">
                  <input type="checkbox" />
                  <p>{t("weight_up_to_5_5")}</p>
                </div>
                <div className="kj">
                  <input type="checkbox" />
                  <p>{t("weight_over_20")}</p>
                </div>
              </div>
              <div className="btn9">
                <button>{t("katolg_show_products_btn")}</button>
              </div>
            </div>
          </div>
        </div>
        <div className="katolg_data">
          {katolgData.map((product) => (
            <div key={product.id}>
              <div className="product-card">

                <div className="product-card__image flex">
                  <img src={product.image} alt={t(product.titleKey)} />

                  <button
                    className={`product-card__favorite ${favorites.includes(product.id) ? "active" : ""
                      }`}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill={favorites.includes(product.id) ? "#f5a623" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                <div className="product-card__info">
                  <h3 className="font-[400] text-[18px] max-w-[288px] text-[#000000]">{t(product.titleKey)}</h3>
                  <p className="product-card__price">
                    {product.priceType === "from"
                      ? `${t("price_from")} ${product.priceAmount}`
                      : t("price_on_request")}
                  </p>

                  <div className="product-card__actions">
                    <button className="product-card__btn-main font-[400] text-[16px] text-[#000000]">
                      {t("btn_more")}
                    </button>

                    <button className="product-card__btn-secondary">
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

              </div>
            </div>
          ))}
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
            <li>{t("feature_1")}</li>
            <li>{t("feature_2")}</li>
            <li>{t("feature_3")}</li>
            <li>{t("feature_4")}</li>
            <li>{t("feature_5")}</li>
            <li>{t("feature_6")}</li>
            <li>{t("feature_7")}</li>
            <li>{t("feature_8")}</li>
            <li>{t("feature_9")}</li>
            <li>{t("feature_10")}</li>
            <li>{t("feature_11")}</li>
            <li>{t("feature_12")}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Katolg