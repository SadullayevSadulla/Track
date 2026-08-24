import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "./mainNews.css";
import newsData from "./newsData";
import { useLanguage } from "../../../i18n/LanguageContext";

const MainNews = () => {
    const [favorites, setFavorites] = useState([]);
    const { t } = useLanguage();

    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
        );
    };

    return (
        <section className="products">
            <div className="container">

                <div className="products__top">
                    <h2>{t("news_section_title")}</h2>

                    <div className="products__buttons">
                        <button className="products-prevs">
                            <span>‹</span>
                        </button>

                        <button className="products-nexts">
                            <span>›</span>
                        </button>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation]}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        prevEl: ".products-prevs",
                        nextEl: ".products-nexts",
                    }}
                    loop={true}
                    spaceBetween={24}
                    slidesPerView={4}
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
                    {newsData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="product-card">

                                <div className="product-card__image flex">
                                    <img src={item.image} alt={t(item.textKey)} />
                                </div>

                                <div className="product-card__info">
                                    <h3 className="font-normal text-[18px] max-w-[288px] text-[#000000]">{item.date}</h3>
                                    <p className="product-card__price">{t(item.textKey)}</p>

                                    <div className="product-card__actions">

                                        <button className="product-card__btn-secondary text-[18px]">
                                            {t("btn_more")}
                                            <i className="fa-solid fa-arrow-right-long"></i>
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

export default MainNews;