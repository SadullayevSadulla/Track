import React from 'react'
import "./kredit.css"
import { useLanguage } from "../../i18n/LanguageContext"

const Kredit = () => {
  const { t } = useLanguage();

  return (
    <div className='container'>
      <div className="kredit flex flex-col gap-15">
        <div className="kredit_t flex flex-col gap-5">
          <h1>{t("kredit_title")}</h1>
          <p>{t("kredit_intro")}</p>
        </div>
        <div className="kredit_text">
          <h1>{t("kredit_terms_title")}</h1>
          <p>{t("kredit_terms_text")}</p>
        </div>
        <div className="kredit_text">
          <h1>{t("kredit_advantages_title")}</h1>
          <p>{t("kredit_advantages_text")}</p>
        </div>
        <div className="leasing_types">
          <h1>{t("kredit_types_title")}</h1>
          <div className="leasing_type">
            <span className="leasing_type_number">1</span>
            <div>
              <h2>{t("kredit_type1_title")}</h2>
              <p>{t("kredit_type1_text")}</p>
            </div>
          </div>
          <div className="leasing_type">
            <span className="leasing_type_number">2</span>
            <div>
              <h2>{t("kredit_type2_title")}</h2>
              <p>{t("kredit_type2_text")}</p>
            </div>
          </div>
          <div className="leasing_type">
            <span className="leasing_type_number">3</span>
            <div>
              <h2>{t("kredit_type3_title")}</h2>
              <p>{t("kredit_type3_text")}</p>
            </div>
          </div>
        </div>
        <div className="kredit_text">
          <h1>{t("kredit_partner_title")}</h1>
          <p>{t("kredit_partner_text")}</p>
        </div>
      </div>
    </div>
  )
}

export default Kredit;