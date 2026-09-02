import "./service.css"
import { useLanguage } from "../../i18n/LanguageContext";

const Service = () => {
  const { t } = useLanguage();

  return (
    <section className="container">
      <div className="service">
        <div className="service_top">
          <h1>{t("service_title")}</h1>
          <p>{t("service_intro")}</p>
        </div>
        <div className="service_main">
          <h1>{t("service_support_title")}</h1>
            <div className="best">
              <div className="card">
                <div className="son">1</div>
                <p><a href="#">{t("service_step1_link")}</a> {t("service_step1_text")}</p>
              </div>
              <div className="card">
                <div className="son">2</div>
                <p>{t("service_step2_text")}</p>
              </div>
              <div className="card">
                <div className="son">3</div>
                <p>{t("service_step3_text")}</p>
              </div>
            </div>
        </div>
        <p>{t("service_footer_text")}</p>
      </div>
    </section>
  )
}

export default Service