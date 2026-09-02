import "./mainZapros.css"
import { useLanguage } from "../../i18n/LanguageContext";

const MainZapros = () => {
    const { t } = useLanguage();

    return (
        <section className="bg-[#F2F2F2] mt-[60px]">
            <div className="fun flex justify-between py-15 px-15">
                <div className="container">
                    <div className="zapros">
                        <div className="zapros_text">
                            <h1 className="text-[42px] font-medium font-primary">{t("zapros_title")}</h1>
                            <p className="text-[18px] font-normal ">{t("zapros_subtitle")}</p>
                        </div>
                        <div className="zapros_inputs flex mt-9.5 mb-5 gap-4.75 items-end">
                            <div className="input flex flex-col gap-1">
                                <label htmlFor="#">{t("zapros_name_label")}</label>
                                <input type="text" placeholder={t("zapros_name_placeholder")} />
                            </div>
                            <div className="input flex flex-col gap-1">
                                <label htmlFor="#">{t("zapros_phone_label")}</label>
                                <input type="text" placeholder={t("zapros_phone_placeholder")} />
                            </div>
                            <div className="button ">
                                <button className="cursor-pointer">{t("zapros_submit_btn")}</button>
                            </div>
                        </div>
                        <div className="zapros_t">
                            <p className="text-[#9D9D9D]">
                                {t("zapros_consent_prefix")}{" "}
                                <a href="#" className="text-[#656c98]">{t("zapros_consent_link")}</a>
                            </p>
                        </div>
                    </div>
                </div>
                    <div className="zapros_img">
                        <img src="/feedback-truck_result.webp" alt="" />
                    </div>
            </div>
        </section>
    )
}

export default MainZapros;