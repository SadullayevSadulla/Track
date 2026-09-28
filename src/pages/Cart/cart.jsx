import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../../i18n/LanguageContext"
import { useCartStore } from "../../store/cartStore"
import "./cart.css"
import "../Home/MainCard/mainCard.css"

const Cart = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [offerModalOpen, setOfferModalOpen] = useState(false)
  const [offerForm, setOfferForm] = useState({
    name: "",
    email: "",
    phone: "",
    consent: true,
  })
  const cart = useCartStore((state) => state.cart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const changeQuantity = useCartStore((state) => state.changeQuantity)

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

  return (
    <main className="cart-page">
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

      <div className="container">
        <h1>{t("cart_title")}</h1>

        {cart.length === 0 ? (
          <div className="cart-page__empty">
            <p>{t("cart_empty")}</p>
            <button type="button" onClick={() => navigate("/katolg")}>
              {t("katolg_show_products_btn")}
            </button>
          </div>
        ) : (
          <div className="cart-page__list">
            {cart.map((product) => (
              <article className="cart-page__row" key={product.id}>
                <div className="cart-page__image-wrap">
                  <img src={product.image} alt={t(product.titleKey)} />
                </div>

                <div className="cart-page__info">
                  <h2>{t(product.titleKey)}</h2>
                  <div className="cart-page__specs">
                    <p><span>{t("cart_dimensions_label")}</span><i></i><strong>-</strong></p>
                    <p><span>{t("katolg_load_label")}</span><i></i><strong>{product.loadCapacity || "-"} кг</strong></p>
                  </div>
                </div>

                <div className="cart-page__quantity" aria-label={t("cart_quantity")}>
                  <button type="button" aria-label="Decrease quantity" onClick={() => changeQuantity(product.id, -1)}>−</button>
                  <span>{product.quantity || 1}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => changeQuantity(product.id, 1)}>+</button>
                </div>

                <div className="cart-page__actions">
                  <button type="button" className="cart-page__offer" onClick={() => setOfferModalOpen(true)}>
                    {t("btn_get_offer")}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                    </svg>
                  </button>
                  <button type="button" className="cart-page__remove" onClick={() => removeFromCart(product.id)}>
                    {t("cart_remove")}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="container">
          <div className="cart_button mt-30 flex gap-70">
            <div className="cart_left">
              <div className="cart_button_text">
                <h1>Оформить заказ</h1>
              </div>
              <div className="cart_button_inputs flex flex-col gap-5">
                <div className="inputs flex flex-col gap-1">
                  <label htmlFor="" className="text-[#888]">Ваше имя *</label>
                  <input type="text" placeholder="Иван" />
                </div>
                <div className="inputs flex flex-col gap-1">
                  <label htmlFor="" className="text-[#888]">E-mail *</label>
                  <input type="text" placeholder="your@mail.com" />
                </div>
                <div className="inputs flex flex-col gap-1">
                  <label htmlFor="" className="text-[#888]">Телефон *</label>
                  <input type="text" placeholder="+7" />
                </div>
              </div>
              <div className="cart_button_check flex gap-3 mt-5 items-center">
                <input type="checkbox" className="w-6 h-6"/>
                <p className="max-w-[354px]">Я согласен <a href="#" className="text-blue-600 max-w-[354px]">на обработку персональных данных</a></p>
              </div>
            </div>
            <div className="cart_right flex flex-col mt-30">
              <div className="cart_rightt_textt">
                <h1>Остались вопросы?</h1>
              </div>
              <div className="cart_right_ps flex flex-col gap-3">
                <p>Свяжитесь с нашим менеджером или оставьте заявку на обратный звонок</p>
                <p>Для регионов: 8 (800) 511-05-25
                  Нижний Новгород: 8 (831) 225-00-55</p>
                <div className="cart_right_button">
                  <button>Заказать звонок</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Cart
