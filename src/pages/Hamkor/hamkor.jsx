import React from 'react'
import "./hamkor.css"
import hamkorData from "./hamkorData"
import { useLanguage } from "../../i18n/LanguageContext"

const Hamkor = () => {
  const { t } = useLanguage();

  return (
    <div className='container'>
        <div className="hamkor flex flex-col gap-10">
            <div className="hamkor_top">
                <h1>{t("hamkor_page_title")}</h1>
            </div>
            <div className="hamkor_bot">
                {hamkorData.map((partner) => (
                    <div className="hamkor_bots" key={partner.id}>
                        <h1>{t(partner.titleKey)}</h1>
                        <p>{t(partner.textKey)}</p>
                        {partner.hasReadMore && <a href="#">{t("hamkor_read_more")}</a>}
                        {partner.link && <a href={partner.link}>{partner.link}</a>}
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Hamkor