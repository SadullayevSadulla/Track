import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "./header.css"
import { useLanguage } from "../../i18n/LanguageContext";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
    const [openMenu, setOpenMenu] = useState(null);
    const [isCompact, setIsCompact] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSubOpen, setMobileSubOpen] = useState(null);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [callModalOpen, setCallModalOpen] = useState(false);
    const [callForm, setCallForm] = useState({ name: "", phone: "", consent: true });
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileLayout, setIsMobileLayout] = useState(() => window.innerWidth <= 850);
    const menuRef = useRef(null);
    const langRef = useRef(null);
    const searchRef = useRef(null);
    const searchInputRef = useRef(null);
    const headerRef = useRef(null);
    const { lang, setLang, t, supportedLangs, LANG_LABELS } = useLanguage();
    const navigate = useNavigate();
    const labels = LANG_LABELS || { ru: "RU", uz: "UZ", en: "EN" };
    const langs = supportedLangs || ["ru", "uz", "en"];

    const toggleMenu = (menu) => {
        setOpenMenu((prev) => (prev === menu ? null : menu));
    };

    const isCatalogMenuOpen = isMobileLayout ? mobileMenuOpen : openMenu === "catalog";

    useEffect(() => {
        const handleResize = () => setIsMobileLayout(window.innerWidth <= 850);

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleCatalogClick = () => {
        if (isMobileLayout) {
            setMobileMenuOpen((prev) => !prev);
            setMobileSubOpen(null);
            return;
        }

        toggleMenu("catalog");
    };

    const toggleMobileSub = (key) => {
        setMobileSubOpen((prev) => (prev === key ? null : key));
    };

    // Yagona navigatsiya funksiyasi: har doim yopadi + navigate qiladi.
    // Barcha mobil va desktop menyu linklari faqat shu orqali ishlaydi.
    const navigateAndClose = (path) => {
        setOpenMenu(null);
        setMobileMenuOpen(false);
        setMobileSubOpen(null);
        navigate(path);
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

    const handleCallChange = (event) => {
        const { name, value, type, checked } = event.target;
        setCallForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleCallSubmit = (event) => {
        event.preventDefault();
        if (!callForm.name.trim() || !callForm.phone.trim()) return;
        setCallModalOpen(false);
        setCallForm({ name: "", phone: "", consent: true });
    };

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen || callModalOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen, callModalOpen]);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setIsCompact((prev) => (y > 80 ? true : y < 10 ? false : prev));
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setOpenMenu(null);
    }, [isCompact]);

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

    const CatalogToggleIcon = ({ open }) => (
        <span className="catalog_toggle_icon" aria-hidden="true">
            {open ? (
                <svg viewBox="0 0 24 24" className="catalog_close_icon">
                    <path fill="currentColor" d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.7 2.88 18.29 9.18 12 2.88 5.71 4.29 4.29l6.3 6.3 6.3-6.3z" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" className="catalog_hamburger_icon">
                    <path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" />
                </svg>
            )}
        </span>
    );

    const MegaMenuContent = () => (
        <div
            className="mega_menu"
            style={{
                top: headerRef.current?.getBoundingClientRect().bottom ?? 200,
                height: "min(800px, calc(100vh - (var(--header-offset, 0px))))",
            }}
        >
            <div className="container py-[40px]">
                <div className="grid grid-cols-4 gap-[40px]">
                    <div>
                        <h3 className="text-[20px] font-[700] font-['Fira_Sans'] mb-[20px]">{t("menu_categories_title")}</h3>
                        <ul className="flex flex-col gap-[16px]">
                            <li><a href="/katolg" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/katolg"); }}>{t("menu_cat_curtain")}</a></li>
                            <li><a href="/katolg" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/katolg"); }}>{t("menu_cat_crane")}</a></li>
                            <li><a href="/katolg" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/katolg"); }}>{t("menu_cat_fuel_truck")}</a></li>
                            <li><a href="/katolg" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/katolg"); }}>{t("menu_cat_lift")}</a></li>
                            <li><a href="/katolg" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/katolg"); }}>{t("menu_cat_tank")}</a></li>
                            <li><a href="/katolg" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/katolg"); }}>{t("menu_cat_tow")}</a></li>
                            <li><a href="/katolg" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/katolg"); }}>{t("menu_cat_flatbed")}</a></li>
                            <li><a href="/katolg" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/katolg"); }}>{t("menu_cat_isotherm")}</a></li>
                            <li><a href="/katolg" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/katolg"); }}>{t("menu_cat_container")}</a></li>
                            <li><a href="/katolg" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/katolg"); }}>{t("menu_cat_hook_loader")}</a></li>
                            <li><a href="/katolg" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/katolg"); }}>{t("menu_cat_dump")}</a></li>
                            <li><a href="/katolg" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/katolg"); }}>{t("menu_cat_adr")}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[20px] font-[700] font-['Fira_Sans'] mb-[20px]">{t("menu_about_title")}</h3>
                        <ul className="flex flex-col gap-[16px]">
                            <li><a href="/onac" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/onac"); }}>{t("menu_about_company")}</a></li>
                            <li><a href="/news" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/news"); }}>{t("menu_about_news")}</a></li>
                            <li><a href="/hamkor" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/hamkor"); }}>{t("menu_about_partners")}</a></li>
                            <li><a href="/certeficat" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/certeficat"); }}>{t("menu_about_certificates")}</a></li>
                            <li><a href="/vaqansiya" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/vaqansiya"); }}>{t("menu_about_vacancies")}</a></li>
                            <li><a href="/kredit" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/kredit"); }}>{t("menu_about_leasing")}</a></li>
                            <li><a href="/kredit" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/production"); }}>{t("menu_about_production")}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[20px] font-[700] font-['Fira_Sans'] mb-[20px]">{t("menu_media_title")}</h3>
                        <ul className="flex flex-col gap-[16px]">
                            <li><a href="/foto" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/foto"); }}>{t("menu_media_gallery")}</a></li>
                            <li><a href="/vido" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/vido"); }}>{t("menu_media_video")}</a></li>
                            <li><a href="/reklama" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/reklama"); }}>{t("menu_media_ads")}</a></li>
                            <li><a href="/media" className="text-sm-base font-['Fira_Sans']" onClick={(event) => { event.preventDefault(); navigateAndClose("/media"); }}>{t("menu_media_info")}</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-[20px]">
                        <a href="/service" onClick={(event) => { event.preventDefault(); navigateAndClose("/service"); }} className="text-[20px] font-[700] font-['Fira_Sans']">{t("menu_service")}</a>
                        <a href="/repair" onClick={(event) => { event.preventDefault(); navigateAndClose("/repair"); }} className="text-[20px] font-[700] font-['Fira_Sans']">{t("menu_repair")}</a>
                        <a href="/news" onClick={(event) => { event.preventDefault(); navigateAndClose("/news"); }} className="text-[20px] font-[700] font-['Fira_Sans']">{t("menu_news")}</a>
                        <a href="/contacts" onClick={(event) => { event.preventDefault(); navigateAndClose("/contacts"); }} className="text-[20px] font-[700] font-['Fira_Sans']">{t("menu_contacts")}</a>
                    </div>

                </div>
            </div>
        </div>
    );

    const MobileMenu = () => createPortal(
        <div className="mobile_menu">
            <ul className="mobile_menu_list">
                <li>
                    <button type="button" onClick={() => toggleMobileSub("lang")}>
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
                    <button type="button" onClick={() => toggleMobileSub("cat")}>
                        {t("menu_categories_title") || "Категории"}
                        <ChevronIcon open={mobileSubOpen === "cat"} />
                    </button>
                    {mobileSubOpen === "cat" && (
                        <ul className="mobile_submenu">
                            <li><button type="button" onClick={() => navigateAndClose("/katolg")}>{t("menu_cat_curtain")}</button></li>
                            <li><button type="button" onClick={() => navigateAndClose("/katolg")}>{t("menu_cat_crane")}</button></li>
                            <li><button type="button" onClick={() => navigateAndClose("/katolg")}>{t("menu_cat_fuel_truck")}</button></li>
                            <li><button type="button" onClick={() => navigateAndClose("/katolg")}>{t("menu_cat_lift")}</button></li>
                            <li><button type="button" onClick={() => navigateAndClose("/katolg")}>{t("menu_cat_tank")}</button></li>
                            <li><button type="button" onClick={() => navigateAndClose("/katolg")}>{t("menu_cat_tow")}</button></li>
                            <li><button type="button" onClick={() => navigateAndClose("/katolg")}>{t("menu_cat_flatbed")}</button></li>
                            <li><button type="button" onClick={() => navigateAndClose("/katolg")}>{t("menu_cat_isotherm")}</button></li>
                            <li><button type="button" onClick={() => navigateAndClose("/katolg")}>{t("menu_cat_container")}</button></li>
                            <li><button type="button" onClick={() => navigateAndClose("/katolg")}>{t("menu_cat_hook_loader")}</button></li>
                            <li><button type="button" onClick={() => navigateAndClose("/katolg")}>{t("menu_cat_dump")}</button></li>
                            <li><button type="button" onClick={() => navigateAndClose("/katolg")}>{t("menu_cat_adr")}</button></li>
                        </ul>
                    )}
                </li>

                <li>
                    <button type="button" onClick={() => toggleMobileSub("about")}>
                        {t("about_us")}
                        <ChevronIcon open={mobileSubOpen === "about"} />
                    </button>
                    {mobileSubOpen === "about" && (
                        <ul className="mobile_submenu">
                            <li><a href="/onac" onClick={(event) => { event.preventDefault(); navigateAndClose("/onac"); }}>{t("menu_about_company")}</a></li>
                            <li><a href="/news" onClick={(event) => { event.preventDefault(); navigateAndClose("/news"); }}>{t("menu_about_news")}</a></li>
                            <li><a href="/hamkor" onClick={(event) => { event.preventDefault(); navigateAndClose("/hamkor"); }}>{t("menu_about_partners")}</a></li>
                            <li><a href="/certeficat" onClick={(event) => { event.preventDefault(); navigateAndClose("/certeficat"); }}>{t("menu_about_certificates")}</a></li>
                            <li><a href="/vaqansiya" onClick={(event) => { event.preventDefault(); navigateAndClose("/vaqansiya"); }}>{t("menu_about_vacancies")}</a></li>
                            <li><a href="/kredit" onClick={(event) => { event.preventDefault(); navigateAndClose("/kredit"); }}>{t("menu_about_leasing")}</a></li>
                        </ul>
                    )}
                </li>

                <li>
                    <button type="button" onClick={() => toggleMobileSub("media")}>
                        {t("media")}
                        <ChevronIcon open={mobileSubOpen === "media"} />
                    </button>
                    {mobileSubOpen === "media" && (
                        <ul className="mobile_submenu">
                            <li><a href="/foto" onClick={(event) => { event.preventDefault(); navigateAndClose("/foto"); }}>{t("menu_media_gallery")}</a></li>
                            <li><a href="/vido" onClick={(event) => { event.preventDefault(); navigateAndClose("/vido"); }}>{t("menu_media_video")}</a></li>
                            <li><a href="/reklama" onClick={(event) => { event.preventDefault(); navigateAndClose("/reklama"); }}>{t("menu_media_ads")}</a></li>
                            <li><a href="/media" onClick={(event) => { event.preventDefault(); navigateAndClose("/media"); }}>{t("menu_media_info")}</a></li>
                        </ul>
                    )}
                </li>

                <li><a href="/service" onClick={(event) => { event.preventDefault(); navigateAndClose("/service"); }}>{t("service")}</a></li>
                <li><a href="/repair" onClick={(event) => { event.preventDefault(); navigateAndClose("/repair"); }}>{t("repair")}</a></li>
                <li><a href="/news" onClick={(event) => { event.preventDefault(); navigateAndClose("/news"); }}>{t("news")}</a></li>
                <li><a href="/contacts" onClick={(event) => { event.preventDefault(); navigateAndClose("/contacts"); }}>{t("contacts")}</a></li>
            </ul>
        </div>,
        document.body
    );

    return (
        <header {...props} className={`header_wrap ${props.className || ""}`}>
            <div ref={headerRef} className={`header_fixed ${isCompact ? "is-compact" : ""}`}>
                <div className="header_top_wrap">
                    <div className="header_top_inner">
                        <div className="container">
                            <div className="header_top">
                                <div className="header_logo flex items-center">
                                    <a className="logo" href="/" onClick={(event) => { event.preventDefault(); navigateAndClose("/"); }}>
                                        <img src="./logo (3).png" alt="" className="w-[160px] h-[45px]" />
                                    </a>
                                    <span className="divider"></span>
                                    <div className="texxt max-w-[167px]">
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
                                        <button
                                            type="button"
                                            className="img call_trigger"
                                            onClick={() => setCallModalOpen(true)}
                                            aria-label="Заказать звонок"
                                        >
                                            <img src="./icon_normal_call.png" alt="" />
                                        </button>
                                    </div>

                                    <div className="lang_switcher relative" ref={langRef}>
                                        <button
                                            type="button"
                                            className="flex items-center gap-[6px] text-[15px] font-[500] font-['Fira_Sans'] border-[1px] border-[#FEC80B] rounded-[4px] px-[12px] py-[6px] cursor-pointer bg-white"
                                            onClick={() => setLangMenuOpen((prev) => !prev)}
                                        >
                                            {labels[lang] || lang?.toUpperCase()}
                                            <svg
                                                className={`w-[16px] h-[16px] text-[#FEC80B] transition-transform ${langMenuOpen ? "rotate-180" : ""}`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <path fill="currentColor" d="M7 10l5 5 5-5z" />
                                            </svg>
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
                    </div>
                </div>

                {callModalOpen && createPortal(
                    <div className="call_modal_overlay" onClick={() => setCallModalOpen(false)}>
                        <div className="call_modal" onClick={(event) => event.stopPropagation()}>
                            <button
                                type="button"
                                className="call_modal_close"
                                onClick={() => setCallModalOpen(false)}
                                aria-label="Закрыть"
                            >
                                ×
                            </button>

                            <h3 className="call_modal_title">Заказать звонок</h3>
                            <p className="call_modal_subtitle">Наш менеджер свяжется с Вами в ближайшее время</p>

                            <form className="call_modal_form" onSubmit={handleCallSubmit}>
                                <label className="call_field">
                                    <span>Ваше имя <span className="required">*</span></span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={callForm.name}
                                        onChange={handleCallChange}
                                        placeholder="Иван"
                                    />
                                </label>

                                <label className="call_field">
                                    <span>Телефон <span className="required">*</span></span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={callForm.phone}
                                        onChange={handleCallChange}
                                        placeholder="+7"
                                    />
                                </label>

                                <label className="call_checkbox">
                                    <input
                                        type="checkbox"
                                        name="consent"
                                        checked={callForm.consent}
                                        onChange={handleCallChange}
                                    />
                                    <span>Я согласен на обработку персональных данных</span>
                                </label>

                                <button type="submit" className="call_submit_btn">Оставить заявку</button>
                            </form>

                            <div className="call_modal_footer">
                                <span>Для регионов: 8 (800) 511-05-25</span>
                                <span>Нижний Новгород: 8 (831) 235-26-16</span>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

                <div className="section header_nav_section border-t-[1px] border-[#FEC80B]">
                    <div className="container">
                        <div className="header_bottom flex items-center justify-between py-[1px]">
                            <div className="sa flex items-center gap-[30px]" ref={menuRef}>
                                <img src="./logo (3).png" alt="" className="mini_logo" />

                                <div className="relative">
                                    <button
                                        type="button"
                                        className={`catalog_btn flex items-center gap-[8px] bg-[#FEC80B] rounded-[4px] w-[132px] h-[42px] shrink-0 font-normal text-[18px] font-['Fira_Sans'] text-[#000000] cursor-pointer ${isCatalogMenuOpen ? "is-open" : ""}`}
                                        onClick={handleCatalogClick}
                                        aria-label={t("catalog")}
                                        aria-expanded={isCatalogMenuOpen}
                                    >
                                        <CatalogToggleIcon open={isCatalogMenuOpen} />
                                        <span className="catalog_label">{t("catalog")}</span>
                                    </button>

                                    {openMenu === "catalog" && <MegaMenuContent />}
                                </div>

                                <nav className="nav_menu flex items-center gap-[28px]">
                                    <div className="relative">
                                        <button
                                            type="button"
                                            className="flex items-center gap-[4px] text-[15px] font-normal font-['Fira_Sans']"
                                            onClick={() => toggleMenu("onas")}
                                        >
                                            {t("about_us")}
                                            <svg
                                                className={`w-[30px] h-[40px] text-[#FEC80B] transition-transform ${openMenu === "onas" ? "rotate-180" : ""}`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <path fill="currentColor" d="M7 10l5 5 5-5z" />
                                            </svg>
                                        </button>

                                        {openMenu === "onas" && <MegaMenuContent />}
                                    </div>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            className="flex items-center gap-[4px] text-[15px] font-normal font-['Fira_Sans']"
                                            onClick={() => toggleMenu("media")}
                                        >
                                            {t("media")}
                                            <svg
                                                className={`w-[30px] h-[40px] text-[#FEC80B] transition-transform ${openMenu === "media" ? "rotate-180" : ""}`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <path fill="currentColor" d="M7 10l5 5 5-5z" />
                                            </svg>
                                        </button>

                                        {openMenu === "media" && <MegaMenuContent />}
                                    </div>
                                    <a href="/service" className="text-sm-base font-normal font-primary" onClick={(event) => { event.preventDefault(); navigateAndClose("/service"); }}>{t("service")}</a>
                                    <a href="/repair" className="text-[15px] font-normal font-primary" onClick={(event) => { event.preventDefault(); navigateAndClose("/repair"); }}>{t("repair")}</a>
                                    <a href="/news" className="text-[15px] font-normal font-primary" onClick={(event) => { event.preventDefault(); navigateAndClose("/news"); }}>{t("news")}</a>
                                    <a href="/contacts" className="text-[15px] font-normal font-primary" onClick={(event) => { event.preventDefault(); navigateAndClose("/contacts"); }}>{t("contacts")}</a>
                                </nav>
                            </div>

                            <div className="header_actions flex items-center gap-5">
                                <form className="search_box relative" onSubmit={handleSearchSubmit} ref={searchRef}>
                                    <input
                                        type="text"
                                        placeholder={t("search_placeholder")}
                                        className="w-70 h-11 rounded-[30px] border border-[#FEC80B] px-5 pr-12 text-[14px] font-['Fira_Sans'] outline-none"
                                        value={searchQuery}
                                        onChange={(event) => setSearchQuery(event.target.value)}
                                        ref={searchInputRef}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-4.5 top-1/2 -translate-y-1/2 cursor-pointer"
                                        onClick={handleSearchIconClick}
                                        aria-label={t("search_placeholder")}
                                    >
                                        <i className="fa-solid fa-magnifying-glass w-4.5 h-4.5"></i>
                                    </button>
                                </form>

                                <button className="cart_btn" type="button">
                                    <i className="fa-solid fa-cart-shopping w-7.5 h-7.5"></i>
                                </button>

                                <button className="fav_btn" type="button">
                                    <i className="fa-regular fa-heart w-7.5 h-7.5"></i>
                                </button>

                                <button
                                    type="button"
                                    className="call_mini"
                                    onClick={() => setCallModalOpen(true)}
                                    aria-label="Заказать звонок"
                                >
                                    <img src="./icon_normal_call.png" alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && <MobileMenu />}
        </header>
    )
}

export default Header;