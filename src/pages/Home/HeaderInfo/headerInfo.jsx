import "./headerInfo.css";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useLanguage } from "../../../i18n/LanguageContext";

const HeaderInfo = () => {
    const { t } = useLanguage();

    return (
        <section className="container">
            <div className="header_info">
                <Swiper
                    navigation={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    autoHeight={true}
                    modules={[Navigation, Pagination, Autoplay]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="slide slide--bleed">
                            <img
                                className="slide_bg"
                                src="/of3bmzwmj5m8ikxz6p1x8rl82eywgs0h (1).jpg"
                                alt={t("alt_slide1")}
                            />
                            <div className="slide_overlay slide_overlay--left" />
                            <div className="slide_content">
                                <h2 className="slide_title">
                                    {t("slide1_title_1")}
                                    <br />
                                    {t("slide1_title_2")}
                                </h2>
                                <p className="slide_text">
                                    {t("slide1_text_1")}
                                    <br />
                                    {t("slide1_text_2")}
                                </p>
                                <div className="slide_actions">
                                    <button className="btn btn--outline btn--light">
                                        {t("btn_order_call")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="slide slide--bleed">
                            <img
                                className="slide_bg"
                                src="/ec4ce04icyymuqjzb5cb07lpnenco2s4.jpg"
                                alt={t("alt_slide2")}
                            />
                            <div className="slide_overlay slide_overlay--left" />
                            <div className="slide_content">
                                <h2 className="slide_title">
                                    {t("slide2_title_1")}
                                    <br />
                                    {t("slide2_title_2")}
                                </h2>
                                <p className="slide_text">
                                    {t("slide2_text")}
                                </p>
                                <div className="slide_actions">
                                    <button className="btn btn--solid">{t("btn_more")}</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="slide slide--bleed">
                            <img
                                className="slide_bg"
                                src="/5xwcouzc1uqntaf8r1g33v4tfzeg1x9o.jpg"
                                alt={t("alt_slide3")}
                            />
                            <div className="slide_overlay slide_overlay--left slide_overlay--black" />
                            <div className="slide_content">
                                <h2 className="slide_title">{t("slide3_title")}</h2>
                                <p className="slide_text">
                                    {t("slide3_text")}
                                </p>
                                <div className="slide_actions">
                                    <button className="btn btn--solid">{t("btn_open_catalog")}</button>
                                    <button className="btn btn--outline btn--light">
                                        {t("btn_order_call")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="slide slide--bleed">
                            <img
                                className="slide_bg"
                                src="/fg49oplosx7l3yhqbxjmj7pxo2c4d8xs.jpg"
                                alt={t("alt_slide4")}
                            />
                            <div className="slide_overlay slide_overlay--left" />
                            <div className="slide_content">
                                <h2 className="slide_title">
                                    {t("slide4_title_1")}
                                    <br />
                                    {t("slide4_title_2")}
                                </h2>
                                <p className="slide_text">
                                    {t("slide4_text")}
                                </p>
                                <div className="slide_actions">
                                    <button className="btn btn--solid">{t("btn_more")}</button>
                                    <button className="btn btn--outline btn--light">
                                        {t("btn_order_call")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
};

export default HeaderInfo;
