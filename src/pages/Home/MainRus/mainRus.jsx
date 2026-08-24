import "./mainRus.css"
import { useLanguage } from "../../../i18n/LanguageContext";

const MainRus = () => {
    const { t } = useLanguage();

    return (
        <section className="container">
            <div className="rusSection flex justify-content items-center mt-[50px]">
                <div className="section_left">
                    <h1 className="font-[500] text-[42px]">
                        {t("about_company_title_prefix")}{" "}
                        <span className="text-[#FEC80B]">{t("about_company_title_highlight")}</span>
                    </h1>
                    <p className="mt-[22px] mb-[64px] text-[18px] font-[400] max-w-[536px]">
                        {t("about_company_text").split("\n\n").map((paragraph, index) => (
                            <span key={index}>
                                {paragraph}
                                <br /><br />
                            </span>
                        ))}
                    </p>
                    <button className="bg-[#FEC80B] text-white px-[30px] py-[13px] rounded-[4px] cursor-pointer hover:bg-white hover:text-[#FEC80B] hover:border border-1px yellow hover:shadow-lg">
                        {t("about_company_btn")} <i className="fa-solid fa-arrow-right-long"></i>
                    </button>
                </div>
                <div className="section_right">
                    <img src="/white-trucks 2.png" alt="" />
                </div>
            </div>
        </section>
    )
}

export default MainRus;