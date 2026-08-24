import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "./mainCard.css";
import productsData from "./cardData";
import { useLanguage } from "../../../i18n/LanguageContext";

const MainCard = () => {
    const [favorites, setFavorites] = useState([]);
    const { t } = useLanguage();


    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
        );
    };

    return (
        <section className="products mt-[70px]">
            <div className="container">

                <div className="products__top">
                    <h2>{t("products_section_title")}</h2>

                    <div className="products__buttons">
                        <button className="products-prev">
                            <span>‹</span>
                        </button>

                        <button className="products-next">
                            <span>›</span>
                        </button>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: ".products-prev",
                        nextEl: ".products-next",
                    }}
                    loop={productsData.length >= 5}
                    spaceBetween={24}
                    speed={500}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 15,
                        },
                        576: {
                            slidesPerView: 2,
                            spaceBetween: 18,
                        },
                        900: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    }}
                    className="products__swiper"
                >
                    {productsData.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="product-card">

                                <div className="product-card__image flex">
                                    <img src={product.image} alt={t(product.titleKey)} />

                                    <button
                                        className={`product-card__favorite ${favorites.includes(product.id) ? "active" : ""
                                            }`}
                                        onClick={() => toggleFavorite(product.id)}
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill={favorites.includes(product.id) ? "#f5a623" : "none"}
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="product-card__info">
                                    <h3 className="font-[400] text-[18px] max-w-[288px] text-[#000000]">{t(product.titleKey)}</h3>
                                    <p className="product-card__price">
                                        {product.priceType === "from"
                                            ? `${t("price_from")} ${product.priceAmount}`
                                            : t("price_on_request")}
                                    </p>

                                    <div className="product-card__actions">
                                        <button className="product-card__btn-main font-[400] text-[16px] text-[#000000]">
                                            {t("btn_more")}
                                        </button>

                                        <button className="product-card__btn-secondary">
                                            {t("btn_get_offer")}
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
};

export default MainCard;