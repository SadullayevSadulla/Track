import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import "../Home/MainCard/mainCard.css";
import katolgData from "../Katolg/katolgData";

function SearchPage() {
    const { t } = useLanguage();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const filteredProducts = katolgData.filter((item) =>
        t(item.titleKey).toLocaleLowerCase().includes(normalizedQuery)
    );

    return (
        <>
            <div>

                <div className="container">
                    <div>
                        {filteredProducts.length === 0 ? (
                            <div className="pb-10">
                                <h2 className="font-FiraSans font-normal text-2xl md:text-[32px] leading-[120%]  text-black dark:text-white mb-7.5 md:mb-5 pt-8 md:pt-2">
                                    {t("search_no_results")}
                                </h2>
                                <p className="font-FiraSans font-normal text-base md:text-lg leading-[150%] text-black dark:text-white mb-10 max-w-full md:max-w-[60%]">
                                    «{query}»
                                </p>
                                <Link
                                    to={"/catalog"}
                                    className="inline-block py-3.25 px-7.5 bg-[#FEC80B] rounded hover:bg-[#FFD43A] transition-all duration-300 font-FiraSans font-normal text-base leading-[110%] text-black"
                                >
                                    {t("catalog")}
                                </Link>
                            </div>
                        ) : (
                            <div className="pb-10">
                                <div className="flex items-end gap-6 mb-8">
                                    <h2 className="font-FiraSans font-normal text-2xl md:text-[32px] leading-[120%]  text-black dark:text-white pt-8 md:pt-2">
                                        {t("search_results_title")}: «{query}»
                                    </h2>
                                    <span className="hidden lg:flex font-FiraSans font-normal text-base leading-[130%] text-black/30 dark:text-white/30 mb-1">
                                        {filteredProducts.length}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {filteredProducts.map((product) => (
                                        <article className="product-card" key={product.id}>
                                            <div className="product-card__image">
                                                <img src={product.image} alt={t(product.titleKey)} />
                                            </div>
                                            <div className="product-card__info">
                                                <h3 className="product-card__title">
                                                    {t(product.titleKey)}
                                                </h3>
                                                <p className="product-card__price">
                                                    {product.priceType === "from"
                                                        ? `${t("price_from")} ${product.priceAmount}`
                                                        : t("price_on_request")}
                                                </p>
                                                <Link
                                                    to="/information"
                                                    className="product-card__btn-main text-center"
                                                >
                                                    {t("btn_more")}
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default SearchPage;