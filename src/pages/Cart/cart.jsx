import { useNavigate } from "react-router-dom"
import { useLanguage } from "../../i18n/LanguageContext"
import { useCartStore } from "../../store/cartStore"
import "./cart.css"

const Cart = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const cart = useCartStore((state) => state.cart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const changeQuantity = useCartStore((state) => state.changeQuantity)

  return (
    <main className="cart-page">
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
                  <span className="cart-page__favorite" aria-hidden="true">♡</span>
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
                  <button type="button" className="cart-page__offer" onClick={() => navigate("/information")}>
                    {t("btn_get_offer")}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      </div>
    </main>
  )
}

export default Cart
