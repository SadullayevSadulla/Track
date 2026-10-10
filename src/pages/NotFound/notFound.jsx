import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";

const TEXT = {
    ru: { title: "Страница не найдена", back: "На главную" },
    uz: { title: "Sahifa topilmadi", back: "Bosh sahifaga" },
    en: { title: "Page not found", back: "Back to home" },
};

export default function NotFound() {
    const { lang } = useLanguage();
    const text = TEXT[lang] || TEXT.ru;

    return (
        <section className="container py-20 text-center">
            <h1 className="font-FiraSans text-[64px] font-medium mb-4">404</h1>
            <p className="font-FiraSans text-2xl mb-8">{text.title}</p>
            <Link
                to="/"
                className="inline-block py-3.25 px-7.5 bg-[#FEC80B] rounded hover:bg-[#FFD43A] transition-all duration-300 font-FiraSans text-base text-black"
            >
                {text.back}
            </Link>
        </section>
    );
}