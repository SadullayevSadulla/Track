import { useLanguage } from "../../../i18n/LanguageContext";

const MainDar = () => {
    const { t } = useLanguage();

    return (
        <section className="bg-[#FEC80B] mt-[70px]">
            <div className="mainDar container">
                <div className="card flex justify-between items-center">
                    <div className="cards">
                        <div className="text">
                            <h1 className="font-[500] text-[100px]">{t("stat1_number")}</h1>
                            <h1 className="font-[500] text-[32] mb-[24px]">{t("stat1_label")}</h1>
                        </div>
                        <p className="font-[400] text-[18px] max-w-[400px]">{t("stat1_text")}</p>
                    </div>
                    <div className="cards">
                        <div className="text">
                            <h1 className="font-[500] text-[100px]">{t("stat2_number")}</h1>
                            <h1 className="font-[500] text-[32] mb-[24px]">{t("stat2_label")}</h1>
                        </div>
                        <p className="font-[400] text-[18px] max-w-[400px]">{t("stat2_text")}</p>
                    </div>
                    <div className="cards">
                        <div className="text">
                            <h1 className="font-[500] text-[100px]">{t("stat3_number")}</h1>
                            <h1 className="font-[500] text-[32] mb-[24px]">{t("stat3_label")}</h1>
                        </div>
                        <p className="font-[400] text-[18px] max-w-[400px]">{t("stat3_text")}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainDar;