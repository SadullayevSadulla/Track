import { useState, useRef, useEffect } from "react";
import "./header.css"
import { useLanguage } from "../../i18n/LanguageContext";

const Header = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSubOpen, setMobileSubOpen] = useState(null);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const menuRef = useRef(null);
    const langRef = useRef(null);
    const searchRef = useRef(null);
    const searchInputRef = useRef(null);
    const { lang, setLang, t, supportedLangs, LANG_LABELS } = useLanguage();
    const labels = LANG_LABELS || { ru: "RU", uz: "UZ", en: "EN" };
    const langs = supportedLangs || ["ru", "uz", "en"];

    const toggleMenu = (menu) => {
        setOpenMenu((prev) => (prev === menu ? null : menu));
    };

    const handleCatalogClick = () => {
        if (window.innerWidth <= 850) {
            setMobileMenuOpen((prev) => !prev);
            setMobileSubOpen(null);
        } else {
            toggleMenu("catalog");
        }
    };

    const toggleMobileSub = (key) => {
        setMobileSubOpen((prev) => (prev === key ? null : key));
    };

    const handleSearchSubmit = (e) => {
        e?.preventDefault();
        const q = searchQuery.trim();
        if (!q) return;
        window.location.href = `/search?q=${encodeURIComponent(q)}`;
    };

    const handleSearchIconClick = () => {
        const isMobile = window.innerWidth <= 1024;
        if (isMobile && !mobileSearchOpen) {
            setMobileSearchOpen(true);
            setTimeout(() => searchInputRef.current?.focus(), 0);
            return;
        }
        handleSearchSubmit();
    };

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(null);
            }
            if (langRef.current && !langRef.current.contains(event.target)) {
                setLangMenuOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setMobileSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const ChevronIcon = ({ open, width = "25px", height = "30px" }) => (
        <svg
            className={`chevron_icon ${open ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{ width, height }}
        >
            <path fill="currentColor" d="M7 10l5 5 5-5z" />
        </svg>
    );

    const MegaMenuContent = () => (
        <div className="fixed left-0 top-[200px] w-full h-full bg-white z-50 shadow-lg ">
            <div className="container py-[40px]">
                <div className="grid grid-cols-4 gap-[40px]">
                    <div>
                        <h3 className="text-[20px] font-[700] font-['Fira_Sans'] mb-[20px]">{t("menu_categories_title")}</h3>
                        <ul className="flex flex-col gap-[16px]">
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_cat_curtain")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_cat_crane")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_cat_fuel_truck")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_cat_lift")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_cat_tank")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_cat_tow")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_cat_flatbed")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_cat_isotherm")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_cat_container")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_cat_hook_loader")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_cat_dump")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_cat_adr")}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[20px] font-[700] font-['Fira_Sans'] mb-[20px]">{t("menu_about_title")}</h3>
                        <ul className="flex flex-col gap-[16px]">
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_about_company")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_about_news")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_about_partners")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_about_production")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_about_suppliers")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_about_reviews")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_about_certificates")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_about_vacancies")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_about_leasing")}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[20px] font-[700] font-['Fira_Sans'] mb-[20px]">{t("menu_media_title")}</h3>
                        <ul className="flex flex-col gap-[16px]">
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_media_gallery")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_media_video")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_media_ads")}</a></li>
                            <li><a href="#" className="text-sm-base font-['Fira_Sans']">{t("menu_media_info")}</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-[20px]">
                        <a href="#" className="text-[20px] font-[700] font-['Fira_Sans']">{t("menu_service")}</a>
                        <a href="#" className="text-[20px] font-[700] font-['Fira_Sans']">{t("menu_repair")}</a>
                        <a href="#" className="text-[20px] font-[700] font-['Fira_Sans']">{t("menu_news")}</a>
                        <a href="#" className="text-[20px] font-[700] font-['Fira_Sans']">{t("menu_contacts")}</a>
                    </div>

                </div>
            </div>
        </div>
    );

    const MobileMenu = () => (
        <div className="mobile_menu">
            <ul className="mobile_menu_list">
                <li>
                    <button onClick={() => toggleMobileSub("lang")}>
                        {labels[lang] || lang?.toUpperCase()}
                        <ChevronIcon open={mobileSubOpen === "lang"} />
                    </button>
                    {mobileSubOpen === "lang" && (
                        <ul className="mobile_submenu">
                            {langs.map((code) => (
                                <li key={code}>
                                    <button
                                        type="button"
                                        className={`mobile_lang_btn ${lang === code ? "active" : ""}`}
                                        onClick={() => {
                                            setLang(code);
                                            setMobileSubOpen(null);
                                        }}
                                    >
                                        {labels[code] || code?.toUpperCase()}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>

                <li>
                    <button onClick={() => toggleMobileSub("cat")}>
                        {t("menu_categories_title") || "Категории"}
                        <ChevronIcon open={mobileSubOpen === "cat"} />
                    </button>
                    {mobileSubOpen === "cat" && (
                        <ul className="mobile_submenu">
                            <li><a href="#">{t("menu_cat_curtain")}</a></li>
                            <li><a href="#">{t("menu_cat_crane")}</a></li>
                            <li><a href="#">{t("menu_cat_fuel_truck")}</a></li>
                            <li><a href="#">{t("menu_cat_lift")}</a></li>
                            <li><a href="#">{t("menu_cat_tank")}</a></li>
                            <li><a href="#">{t("menu_cat_tow")}</a></li>
                            <li><a href="#">{t("menu_cat_flatbed")}</a></li>
                            <li><a href="#">{t("menu_cat_isotherm")}</a></li>
                            <li><a href="#">{t("menu_cat_container")}</a></li>
                            <li><a href="#">{t("menu_cat_hook_loader")}</a></li>
                            <li><a href="#">{t("menu_cat_dump")}</a></li>
                            <li><a href="#">{t("menu_cat_adr")}</a></li>
                        </ul>
                    )}
                </li>

                <li>
                    <button onClick={() => toggleMobileSub("about")}>
                        {t("about_us")}
                        <ChevronIcon open={mobileSubOpen === "about"} />
                    </button>
                    {mobileSubOpen === "about" && (
                        <ul className="mobile_submenu">
                            <li><a href="#">{t("menu_about_company")}</a></li>
                            <li><a href="#">{t("menu_about_news")}</a></li>
                            <li><a href="#">{t("menu_about_partners")}</a></li>
                            <li><a href="#">{t("menu_about_production")}</a></li>
                            <li><a href="#">{t("menu_about_suppliers")}</a></li>
                            <li><a href="#">{t("menu_about_reviews")}</a></li>
                            <li><a href="#">{t("menu_about_certificates")}</a></li>
                            <li><a href="#">{t("menu_about_vacancies")}</a></li>
                            <li><a href="#">{t("menu_about_leasing")}</a></li>
                        </ul>
                    )}
                </li>

                <li>
                    <button onClick={() => toggleMobileSub("media")}>
                        {t("media")}
                        <ChevronIcon open={mobileSubOpen === "media"} />
                    </button>
                    {mobileSubOpen === "media" && (
                        <ul className="mobile_submenu">
                            <li><a href="#">{t("menu_media_gallery")}</a></li>
                            <li><a href="#">{t("menu_media_video")}</a></li>
                            <li><a href="#">{t("menu_media_ads")}</a></li>
                            <li><a href="#">{t("menu_media_info")}</a></li>
                        </ul>
                    )}
                </li>

                <li><a href="/service">{t("service")}</a></li>
                <li><a href="/repair">{t("repair")}</a></li>
                <li><a href="/news">{t("news")}</a></li>
                <li><a href="/contacts">{t("contacts")}</a></li>
            </ul>
        </div>
    );

    return (
        <header className="relative mt-[10px]">
            <div className="container">
                <div className="header_top">
                    <div className="header_logo flex items-center">
                        <a className="logo" href="/">
                            <img src="/logo (3).png" alt="" className="w-[160px] h-[45px]" />
                        </a>
                        <span className="divider"></span>
                        <div className="text max-w-[167px]">
                            <p className="text-[14px] font-normal font-['Fira_Sans']">{t("company_slogan")}</p>
                        </div>
                    </div>
                    <div className="salom flex items-center gap-[61px]">
                        <div className="header_contact flex flex-col gap-[5px] ">
                            <p className="text-[16px] font-normal font-['Fira_Sans']">{t("work_time_label")}</p>
                            <p className="text-[15px] font-normal font-['Fira_Sans'] text-[#A1A1A1]">{t("address")}</p>
                        </div>
                        <div className="header_phone flex items-center gap-[10px]">
                            <div className="texttt">
                                <p className="text-[15px] font-normal font-['Fira_Sans'] text-[#A1A1A1]">{t("phone_regions_label")} {t("phone_regions")}</p>
                                <p className="text-[15px] font-normal font-['Fira_Sans'] text-[#A1A1A1]">{t("phone_nn_label")} {t("phone_nn")}</p>
                            </div>
                            <div className="img">
                                <img src="/icon_normal_call.png" alt="" />
                            </div>
                        </div>

                        <div className="lang_switcher relative" ref={langRef}>
                            <button
                                type="button"
                                className="flex items-center gap-[6px] text-[15px] font-[500] font-['Fira_Sans'] border-[1px] border-[#FEC80B] rounded-[4px] px-[15px] py-[5px] cursor-pointer bg-white"
                                onClick={() => setLangMenuOpen((prev) => !prev)}
                            >
                                {labels[lang] || lang?.toUpperCase()}
                                <ChevronIcon open={langMenuOpen} />
                            </button>
                            {langMenuOpen && (
                                <ul className="absolute right-0 top-[calc(100%+6px)] bg-white border-[1px] border-[#eee] rounded-[6px] shadow-md z-50 min-w-[70px] overflow-hidden">
                                    {langs.map((code) => (
                                        <li key={code}>
                                            <button
                                                type="button"
                                                className={`w-full text-left px-[14px] py-[8px] text-[14px] font-['Fira_Sans'] cursor-pointer hover:bg-[#FEC80B]/20 ${lang === code ? "font-[700] text-[#000]" : "text-[#555]"}`}
                                                onClick={() => {
                                                    setLang(code);
                                                    setLangMenuOpen(false);
                                                }}
                                            >
                                                {labels[code] || code?.toUpperCase()}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="section border-t-[1px] border-[#FEC80B] mt-[30px] py-[30px]">
                <div className="container">
                    <div className="header_bottom flex items-center justify-between py-[1px]">
                        <div className="sa flex items-center gap-[30px]" ref={menuRef}>

                            <div className="relative">
                                <button
                                    className="catalog_btn flex items-center gap-[8px] bg-[#FEC80B] rounded-[4px] w-[132px] h-[42px] shrink-0 font-normal text-[18px] font-['Fira_Sans'] text-[#000000] cursor-pointer justify-center"
                                    onClick={handleCatalogClick}
                                >
                                    {mobileMenuOpen ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.41L13.41 12l4.9-4.89a1 1 0 0 0 0-1.4z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" />
                                        </svg>
                                    )}
                                    {t("catalog")}
                                </button>

                                {openMenu === "catalog" && <MegaMenuContent />}
                            </div>

                            <nav className="nav_menu flex items-center gap-[28px]">
                                <div className="relative">
                                    <button
                                        className="flex items-center gap-[4px] text-[15px] font-normal font-['Fira_Sans'] cursor-pointer"
                                        onClick={() => toggleMenu("onas")}
                                    >
                                        {t("about_us")}
                                        <ChevronIcon open={openMenu === "onas"} />
                                    </button>

                                    {openMenu === "onas" && <MegaMenuContent />}
                                </div>
                                <div className="relative">
                                    <button
                                        className="flex items-center gap-[4px] text-[15px] font-normal font-['Fira_Sans'] cursor-pointer"
                                        onClick={() => toggleMenu("media")}
                                    >
                                        {t("media")}
                                        <ChevronIcon open={openMenu === "media"} />
                                    </button>

                                    {openMenu === "media" && <MegaMenuContent />}
                                </div>
                                <a href="/service" className="text-sm-base font-normal font-primary">{t("service")}</a>
                                <a href="/repair" className="text-[15px] font-normal font-primary">{t("repair")}</a>
                                <a href="/news" className="text-[15px] font-normal font-primary">{t("news")}</a>
                                <a href="/contacts" className="text-[15px] font-normal font-primary">{t("contacts")}</a>
                            </nav>
                        </div>

                        <div className="header_actions flex items-center gap-5">
                            <form
                                className={`search_box relative ${mobileSearchOpen ? "mobile_open" : ""}`}
                                ref={searchRef}
                                onSubmit={handleSearchSubmit}
                            >
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t("search_placeholder")}
                                    className="w-70 h-11 rounded-[30px] border border-[#FEC80B] px-5 pr-12 text-[14px] font-['Fira_Sans'] outline-none"
                                />
                                <i
                                    className="fa-solid fa-magnifying-glass w-4.5 h-4.5 absolute right-4.5 top-1/2 -translate-y-1/2 cursor-pointer"
                                    onClick={handleSearchIconClick}
                                ></i>
                            </form>

                            <button className="cart_btn cursor-pointer">
                                <i className="fa-solid fa-cart-shopping w-7.5 h-7.5"></i>
                            </button>

                            <button className="fav_btn relative cursor-pointer">
                                <i className="fa-regular fa-heart w-7.5 h-7.5"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && <MobileMenu />}
        </header>
    )
}

export default Header;