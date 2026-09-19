import React from 'react'
import "./reklama.css"
import reklamaData from "./reklamaData"
import { useLanguage } from "../../i18n/LanguageContext"

const Reklama = () => {
  const { t } = useLanguage();

  return (
    <div className='container'>
        <div className="reklama">
            <div className="reklama_top_text">
                <h1>{t("reklama_page_title")}</h1>
            </div>
            <div className="reklama_bot">
                {reklamaData.map((group) => (
                    <div className="reklama_bot_texts" key={group.id}>
                        <h1>{t(group.titleKey)}</h1>
                        {group.links.map((linkKey) => (
                            <a href="#" key={linkKey}>{t(linkKey)}</a>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Reklama