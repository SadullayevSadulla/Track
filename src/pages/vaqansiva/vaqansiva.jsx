import { useState } from "react"
import "./vaqansiva.css"
import { useLanguage } from "../../i18n/LanguageContext"

const Vaqansiva = () => {
  const [isOpen, setIsOpen] = useState(true)
  const { t } = useLanguage();

  return (
    <section className="vacancies container">
      <h1 className="vacancies__title">{t("vacancy_page_title")}</h1>

      <article className="vacancy">
        <button
          className="vacancy__header"
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span>{t("vacancy_title")}</span>
          <span className={`vacancy__chevron ${isOpen ? "is-open" : ""}`} aria-hidden="true" />
        </button>

        {isOpen && (
          <div className="vacancy__body">
            <div className="vacancy__section">
              <h2>{t("vacancy_responsibilities_title")}</h2>
              <ul>
                <li>{t("vacancy_resp1")}</li>
                <li>{t("vacancy_resp2")}</li>
              </ul>
            </div>

            <div className="vacancy__section">
              <h2>{t("vacancy_requirements_title")}</h2>
              <ul>
                <li>{t("vacancy_req1")}</li>
                <li>{t("vacancy_req2")}</li>
              </ul>
            </div>

            <div className="vacancy__section">
              <h2>{t("vacancy_conditions_title")}</h2>
              <ul>
                <li>{t("vacancy_cond1")}</li>
                <li>{t("vacancy_cond2")}</li>
                <li>{t("vacancy_cond3")}</li>
              </ul>
            </div>

            <button className="vacancy__apply" type="button">{t("vacancy_apply_btn")}</button>
          </div>
        )}
      </article>
    </section>
  )
}

export default Vaqansiva