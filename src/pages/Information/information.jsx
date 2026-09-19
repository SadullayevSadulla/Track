import React from 'react'
import "./information.css"
import { useLanguage } from "../../i18n/LanguageContext"

const productImage = "/000.webp"

const specifications = [
  ["spec_chassis_label", "spec_chassis_value"],
  ["spec_engine_label", "spec_engine_value"],
  ["spec_gearbox_label", "spec_gearbox_value"],
  ["spec_length_label", null, "8990"],
  ["spec_width_label", null, "2400"],
  ["spec_height_label", null, "3330"],
  ["spec_wheelbase_label", null, "5200"],
  ["spec_platform_length_label", null, "6200"],
  ["spec_gross_weight_label", null, "8000"],
  ["spec_curb_weight_label", null, "6420"],
  ["spec_payload_label", null, "1580"],
  ["spec_crane_capacity_label", null, "32"],
  ["spec_boom_reach_label", null, "9,8"],
]

const Information = () => {
  const { t } = useLanguage();

  const getSpecValue = ([, valueKey, rawValue]) =>
    valueKey ? t(valueKey) : rawValue;

  return (
    <section className="information container">
      <div className="information__inner">
        <h1 className="information__title">
          {t("info_product_title")}
        </h1>

        <div className="information__layout">
          <div className="information__photo">
            <img src={productImage} alt={t("info_product_title")} />
          </div>

          <div className="information__details">
            <h2>{t("price_on_request")}</h2>
            <div className="information__actions">
              <button className="information__cart" type="button">{t("info_add_to_cart")}</button>
              <button className="information__offer" type="button">{t("btn_get_offer")}</button>
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
          <img src="/tr80_3014.png" alt="" />
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
                {t("info_product_title")}
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