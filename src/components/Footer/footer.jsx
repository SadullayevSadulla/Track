import "./footer.css"
import { useLanguage } from "../../i18n/LanguageContext";

const Footer = () => {
    const { t } = useLanguage();

    const navLinks = [
        t("footer_link_categories"),
        t("footer_link_catalog"),
        t("footer_link_favorites"),
        t("footer_link_about"),
        t("footer_link_vacancies"),
    ];

    return (
        <footer className="bg-[#000000]">
            <div className="footer container">
                <div className="footer_top py-16">

                    <div className="footer_bosh">
                        <div className="footer_bosh_text">
                            <p>{t("footer_phone")}</p>
                            <p>{t("footer_email")}</p>
                            <p>{t("footer_address")}</p>
                        </div>

                        <button>{t("footer_call_btn")}</button>
                    </div>

                    <div className="footer_menu">

                        {[1, 2, 3].map((block) => (
                            <div className="footer_nav" key={block}>
                                <h1>{t("footer_nav_title")}</h1>

                                <nav>
                                    {navLinks.map((link, index) => (
                                        <a href="#" key={index}>{link}</a>
                                    ))}
                                </nav>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="footer_bot flex">
                    <div className="footer_bot_text mr-[200px]">
                        <p>{t("footer_copyright")}</p>
                        <p className="po">{t("footer_disclaimer")}</p>
                        <p>{t("footer_dev")}</p>
                    </div>
                    <div className="footer_boot_logo flex gap-2.5">
                        <div className="logoo">
                            <i className="fa-brands fa-facebook-f text-[#666666]"></i>
                        </div>
                        <div className="logoo">
                            <i className="fa-brands fa-twitter text-[#666666]"></i>
                        </div>
                        <div className="logoo">
                            <i className="fa-brands fa-google text-[#666666]"></i>
                        </div>
                        <div className="logoo">
                            <i className="fa-brands fa-youtube text-[#666666]"></i>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;