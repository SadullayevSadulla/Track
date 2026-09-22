import { useLanguage } from "../../i18n/LanguageContext";

const Production = () => {
  const { t } = useLanguage();
  return <>
    <section>
      <div className="container">
        <div className="jjjjj">
          <h1>{t("production_page_title")}</h1>
        </div>
        <div className="mb-8 rounded overflow-hidden">
          <img src="/production-1.jpg" alt={t("proizvodstvo_rustrak")} className="w-full h-64 object-cover object-center" />
        </div>

        <p className="text-base leading-relaxed mb-10">{t("production_intro")}</p>
        <img src="/production-scheme.jpg" alt="" />
        <p className="text-base leading-relaxed mb-6">{t("production_capacity_text")}</p>
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">{t("production_staff_title")}</h2>
          <p className="text-base leading-relaxed mb-6">{t("production_staff_text")}</p>

          <div className="flex sm:grid-cols-3 gap-3 mb-6">
            <img src="/photo_production.jpg" alt={t("proizvodstvo_1")} className="w-full h-60 object-cover rounded" />
            <img src="/photo_production2.jpg" alt={t("proizvodstvo_4")} className="w-full h-60 object-cover rounded" />
            <img src="/photo_production3.jpg" alt={t("proizvodstvo_2")} className="w-full h-60 object-cover rounded" />
            <img src="/photo_production4.jpg" alt={t("proizvodstvo_2")} className="w-full h-60 object-cover rounded" />
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">{t("production_bureau_title")}</h2>
          <p className="text-base leading-relaxed mb-6">{t("production_bureau_text")}</p>
          <img src="/production-2.jpg" alt={t("proizvodstvennyy_ceh")} className="rounded" />
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{t("production_quality_title")}</h2>
          <p className="text-base leading-relaxed mb-3">{t("production_quality_text1")}</p>
          <p className="text-base leading-relaxed">{t("production_quality_text2")}</p>
        </section>
      </div>
    </section>;
  </>
};
export default Production;