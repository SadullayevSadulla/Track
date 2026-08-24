import { createContext, useContext, useState, useEffect, useCallback } from "react";
import translations from "./translations";

const LanguageContext = createContext(null);

const SUPPORTED_LANGS = ["ru", "uz", "en"];
const STORAGE_KEY = "site_lang";

const getInitialLang = () => {
    if (typeof window === "undefined") return "ru";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
    return "ru";
};

export const LANG_LABELS = {
    ru: "RU",
    uz: "UZ",
    en: "EN",
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(getInitialLang);

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;
    }, [lang]);

    const changeLang = useCallback((newLang) => {
        if (SUPPORTED_LANGS.includes(newLang)) {
            setLang(newLang);
        }
    }, []);

    const t = useCallback(
        (key) => {
            const dict = translations[lang] || translations.ru;
            return dict[key] ?? translations.ru?.[key] ?? key;
        },
        [lang]
    );

    return (
        <LanguageContext.Provider value={{ lang, setLang: changeLang, t, supportedLangs: SUPPORTED_LANGS, LANG_LABELS }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return ctx;
};

export default LanguageContext;