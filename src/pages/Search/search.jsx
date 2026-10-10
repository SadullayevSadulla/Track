import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import translations from "../../i18n/translations";
import "../Home/MainCard/mainCard.css";
import katolgData, { BRANDS, WEIGHTS } from "../Katolg/katolgData";
import { swiperCardTrck } from "../../object";
import { CATEGORY_ROUTE_BY_ID, PATHS } from "../../router/paths";

const LANGS = ["ru", "uz", "en"];

const normalize = (value) =>
    String(value ?? "")
        .toLocaleLowerCase()
        .replace(/ё/g, "е")
        .replace(/\s+/g, " ")
        .trim();

const allLangs = (key) =>
    LANGS.map((code) => translations[code]?.[key]).filter(Boolean);

const brandLabels = Object.fromEntries(
    BRANDS.map((b) => [b.value, allLangs(b.labelKey)])
);
const weightLabels = Object.fromEntries(
    WEIGHTS.map((w) => [w.value, allLangs(w.labelKey)])
);

const productIndex = katolgData.map((product) => ({
    product,
    haystack: normalize(
        [
            ...allLangs(product.titleKey),
            product.brand,
            ...(brandLabels[product.brand] || []),
            ...(weightLabels[product.weight] || []),
            product.loadCapacity,
        ].join(" ")
    ),
}));

const categoryIndex = swiperCardTrck
    .filter((item) => CATEGORY_ROUTE_BY_ID[item.id])
    .map((item) => ({
        item,
        haystack: normalize(Object.values(item.title || {}).join(" ")),
    }));

function SearchPage() {
    const { t, lang } = useLanguage();
    const [searchParams] = useSearchParams();
    const query = (searchParams.get("q") || "").trim();

    const { products, categories } = useMemo(() => {
        const words = normalize(query).split(" ").filter(Boolean);
        if (words.length === 0) return { products: [], categories: [] };

        const matches = (haystack) => words.every((word) => haystack.includes(word));

        return {
            products: productIndex
                .filter(({ haystack }) => matches(haystack))
                .map(({ product }) => product),
            categories: categoryIndex
                .filter(({ haystack }) => matches(haystack))
                .map(({ item }) => item),
        };
    }, [query]);

    const total = products.length + categories.length;

    if (total === 0) {
        return (
            <div className="container">
                <div className="pb-10">
                    <h2 className="font-FiraSans font-normal text-2xl md:text-[32px] leading-[120%] text-black dark:text-white mb-7.5 md:mb-5 pt-8 md:pt-2">
                        {t("search_no_results")}
                    </h2>
                    {query && (
                        <p className="font-FiraSans font-normal text-base md:text-lg leading-[150%] text-black dark:text-white mb-10 max-w-full md:max-w-[60%]">
                            «{query}»
                        </p>
                    )}
                    <Link
                        to={PATHS.catalog}
                        className="inline-block py-3.25 px-7.5 bg-[#FEC80B] rounded hover:bg-[#FFD43A] transition-all duration-300 font-FiraSans font-normal text-base leading-[110%] text-black"
                    >
                        {t("catalog")}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="pb-10">
                <div className="flex items-end gap-6 mb-8">
                    <h2 className="font-FiraSans font-normal text-2xl md:text-[32px] leading-[120%] text-black dark:text-white pt-8 md:pt-2">
                        {t("search_results_title")}: «{query}»
                    </h2>
                    <span className="hidden lg:flex font-FiraSans font-normal text-base leading-[130%] text-black/30 dark:text-white/30 mb-1">
                        {total}
                    </span>
                </div>

                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-8">
                        {categories.map((item) => (
                            <Link
                                key={item.id}
                                to={CATEGORY_ROUTE_BY_ID[item.id]}
                                className="py-2.5 px-5 border border-[#FEC80B] rounded-[30px] font-FiraSans text-base text-black hover:bg-[#FEC80B] transition-all duration-300"
                            >
                                {item.title?.[lang] || item.title?.ru}
                            </Link>
                        ))}
                    </div>
                )}

                {products.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <article className="product-card" key={product.id}>
                                <div className="product-card__image">
                                    <img src={product.image} alt={t(product.titleKey)} />
                                </div>
                                <div className="product-card__info">
                                    <h3 className="product-card__title">{t(product.titleKey)}</h3>
                                    <p className="product-card__price">
                                        {product.priceType === "from"
                                            ? `${t("price_from")} ${product.priceAmount}`
                                            : t("price_on_request")}
                                    </p>
                                    <Link
                                        to={PATHS.information}
                                        className="product-card__btn-main text-center"
                                    >
                                        {t("btn_more")}
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPage;