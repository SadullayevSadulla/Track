import { useNavigate } from "react-router-dom"
import { useLanguage } from "../../i18n/LanguageContext"
import { useCartStore } from "../../store/cartStore"
import "./cart.css"

const Cart = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const cart = useCartStore((state) => state.cart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)

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
          <div className="cart-page__grid">
            {cart.map((product, index) => (
              <article className="cart-page__card" key={`${product.id}-${index}`}>
                <img src={product.image} alt={t(product.titleKey)} />
                <div className="cart-page__info">
                  <h2>{t(product.titleKey)}</h2>
                  <p>
                    {product.priceType === "from"
                      ? `${t("price_from")} ${product.priceAmount}`
                      : t("price_on_request")}
                  </p>
                  <div className="cart-page__actions">
                    <button type="button" onClick={() => navigate("/information")}>
                      {t("btn_more")}
                    </button>
                    <button type="button" className="cart-page__remove" onClick={() => removeFromCart(product.id)}>
                      {t("cart_remove")}
                    </button>
                  </div>
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
