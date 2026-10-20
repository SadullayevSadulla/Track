import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import "./information.css"
import "../Home/MainCard/mainCard.css"
import { useLanguage } from "../../i18n/LanguageContext"
import productsData from "../Home/MainCard/cardData"
import curtainProducts from "../Katolg/katolgData"
import CatalogAwpData from "../Katolg/CatalogAwp/catalogAwpData"
import CatalogBordData from "../Katolg/CatalogBord/catalogBordData"
import CatalogCantoData from "../Katolg/CatalogCanto/catalogCantoData"
import CatalogDoptData from "../Katolg/CatalogDopt/CatalogDoptData"
import CatalogEvkratorData from "../Katolg/CatalogEvkrator/catalogEvkratorData"
import CatalogFuelData from "../Katolg/CatalogFuel/catalogFuelData"
import CatalogFurgonData from "../Katolg/CatalogFurgon/catalogFurgonData"
import CatalogIlData from "../Katolg/CatalogIL/catalogIlData"
import CatalogWaterData from "../Katolg/CatalogWater/catalogWaterData"
import CatalogYukData from "../Katolg/CatalogYuk/catalogYukData"
import { formatUzDigits } from "../../utils/phone"

const allCatalogProducts = [
  ...productsData,
  ...curtainProducts,
  ...CatalogAwpData,
  ...CatalogBordData,
  ...CatalogCantoData,
  ...CatalogDoptData,
  ...CatalogEvkratorData,
  ...CatalogFuelData,
  ...CatalogFurgonData,
  ...CatalogIlData,
  ...CatalogWaterData,
  ...CatalogYukData,
];

const Information = () => {
  const { t } = useLanguage();
  const { productId, productSlug } = useParams();
  const curtainId = productSlug?.match(/^curtain-truck-(\d{4})$/)?.[1];
  const curtainProduct = curtainId
    ? curtainProducts.find((item) => item.id === Number(curtainId))
    : null;
  const matchedProduct = productId
    ? allCatalogProducts.find((item) => String(item.id) === String(productId))
    : null;
  const product = curtainProduct
    ? {
        ...curtainProduct,
        payload: Number(curtainProduct.payload ?? curtainProduct.loadCapacity),
      }
    : matchedProduct ?? productsData[0];
  const specifications = product.specifications ?? [
    ...(product.titleKey === "product2_title"
      ? [["spec_chassis_label", null, "КАМАЗ 43118"]]
      : []),
    ...(product.grossWeight != null
      ? [["spec_gross_weight_label", null, `${(product.grossWeight * 1000).toLocaleString("ru-RU")}`]]
      : []),
    ...(product.payload != null && Number.isFinite(product.payload)
      ? [["spec_payload_label", null, `${product.payload.toLocaleString("ru-RU")}`]]
      : []),
    ...(product.weight
      ? [["spec_weight_category_label", null, `${t(`weight_${product.weight}`)} т`]]
      : []),
    ...(curtainProduct?.weight
      ? [["katolg_weight_label", null, `${t(`weight_${curtainProduct.weight}`)} т`]]
      : []),
  ];
  const [offerModalOpen, setOfferModalOpen] = useState(false)
  const [offerForm, setOfferForm] = useState({
    name: "",
    email: "",
    phone: "",
    consent: true,
  })

  const handleOfferChange = (event) => {
    const { name, value, type, checked } = event.target
    const sanitizedValue = type === "tel" ? formatUzDigits(value) : value
    setOfferForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : sanitizedValue,
    }))
  }

  const handleOfferSubmit = (event) => {
    event.preventDefault()
    if (!offerForm.name.trim() || !offerForm.email.trim() || !offerForm.phone.trim()) return
    setOfferModalOpen(false)
    setOfferForm({ name: "", email: "", phone: "", consent: true })
  }

  const getSpecValue = ([, valueKey, rawValue]) =>
    valueKey ? t(valueKey) : rawValue;

  return (
    <section className="information container">
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
                <input type="text" name="name" value={offerForm.name} onChange={handleOfferChange} placeholder="Иван" />
              </label>

              <label className="offer_field">
                <span>E-mail <span className="required">*</span></span>
                <input type="email" name="email" value={offerForm.email} onChange={handleOfferChange} placeholder="your@mail.com" />
              </label>

              <label className="offer_field">
                <span>Телефон <span className="required">*</span></span>
                <input type="tel" name="phone" value={offerForm.phone} onChange={handleOfferChange} placeholder="+7" />
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

      <div className="information__inner">
        <h1 className="information__title">
          {product.title || t(product.titleKey)}
        </h1>

        <div className="information__layout">
          <div className="information__photo">
            <img src={product.image} alt={product.title || t(product.titleKey)} />
          </div>

          <div className="information__details">
            <h2>{product.priceType === "from" ? `${t("price_from")} ${product.priceAmount}` : t("price_on_request")}</h2>
            <div className="information__actions">
              <button className="information__cart" type="button">{t("info_add_to_cart")}</button>
              <button className="information__offer" type="button" onClick={() => setOfferModalOpen(true)}>{t("btn_get_offer")}</button>
            </div>

            <dl className="information__specifications">
              {specifications.map((spec) => (
                <div className="information__specification flex gap-10" key={spec[0]}>
                  <dt>{t(spec[0])}</dt>
                  <dd>{getSpecValue(spec)}</dd>
                </div>
              ))}
            </dl>

            <a className="information__more text-[#A2A2A2]" href="#specifications">{t("info_specs_link")}</a>
          </div>
        </div>
        <div className="gggg mt-10">
          <img src="/tr80_3014.png" alt={t(product.titleKey)} />
        </div>
      </div>

      <div className="infarmation_cataolg" id="specifications">
        <div className="w-full p-6 font-sans">
          <h1 className="text-3xl font-bold text-neutral-900 mb-6">
            {t("info_specs_title")}
          </h1>

          <div className="rounded-md overflow-hidden border border-neutral-200">
            <div className="bg-amber-400 px-6 py-4">
              <span className="font-bold text-neutral-900">
                {product.title || t(product.titleKey)}
              </span>
            </div>

            <div>
              {specifications.map((spec, i) => (
                <div
                  key={spec[0]}
                  className={`grid grid-cols-1 sm:grid-cols-2 ${i !== specifications.length - 1 ? "border-b border-neutral-200" : ""
                    } ${i % 2 === 1 ? "bg-neutral-50" : "bg-white"}`}
                >
                  <div className="px-6 py-4 text-neutral-800 sm:border-r border-neutral-200">
                    {t(spec[0])}
                  </div>
                  <div className="px-6 py-4 text-neutral-700 text-center flex items-center justify-center">
                    {getSpecValue(spec)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Information;