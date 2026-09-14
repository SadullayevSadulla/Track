import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "./oNas.css";
import OnacData from "./oNasData";
import { useLanguage } from "../../i18n/LanguageContext";

const Onac = () => {
  const { t } = useLanguage();

  const todayPoints = Array.from({ length: 7 });

  return (
    <section>
      <div className="about mt-10">
        <div className="about_i container">
          <div className="about_i_text">
            <h1>{t("onac_hero_title")}</h1>

            <div className="about_badge">
              <div className="about_badge_shape">
                <span className="about_badge_number">{t("onac_badge_number")}</span>
                <span className="about_badge_text">{t("onac_badge_text")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="swiper container">

        <div className="swiper__top flex py-20 justify-between">
          <h2 className="about_tt">{t("onac_swiper_title")}</h2>

          <div className="swiper__buttonsss flex gap-4">
            <button className="categories-prev">
              <span>‹</span>
            </button>

            <button className="categories-next">
              <span>›</span>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".categories-prev",
            nextEl: ".categories-next",
          }}
          loop={true}
          spaceBetween={32}
          slidesPerView={4}
          speed={500}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 15,
            },

            576: {
              slidesPerView: 2,
              spaceBetween: 20,
            },

            900: {
              slidesPerView: 3,
              spaceBetween: 25,
            },

            1200: {
              slidesPerView: 4,
              spaceBetween: 32,
            },
          }}
          className="categories__swiper"
        >
          {OnacData.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to="/">
                <div className="about_sw">
                  <div className="about_img">
                    <img
                      src={item.image}
                      className="about_img_icon"
                      alt={t(item.titleKey)}
                    />
                  </div>
                  <div className="about_text">
                    <div className="ttt">
                      {t(item.titleKey)}
                    </div>
                    <div className="ppp">
                      {t(item.cardTitleKey)}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <div className="container">
        <div className="section_seg mt-20 flex justify-between">
          <div className="seg_text">
            <h1>{t("onac_today_title")}</h1>
            <div className="seb_p">
              {todayPoints.map((_, index) => (
                <div className="pppp" key={index}>
                  <div className="lot">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <p>{t("onac_today_point")}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="seg_img">
            <img src="/about-track.png" alt="" />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="section_cat flex justify-between mt-20">
          <div className="section_cat_right">
            <div className="cat_right_top_text">
              <h1>{t("onac_industries_title")}</h1>
              <p>{t("onac_industries_text")}</p>
            </div>
            <div className="cat_right_top_text">
              <h1>{t("onac_equipment_title")}</h1>
              <p>{t("onac_equipment_text")}</p>
            </div>
          </div>
          <div className="section_cat_left">
            <img src="/about-im_v2.webp" alt="" />
            <img src="/about-im2_v2.webp" alt="" />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="section_cat_button flex flex-col gap-10 mt-20">
          <p>{t("onac_dealer_text")}</p>
          <p>{t("onac_trust_text")}</p>
          <p>{t("onac_clients_text")}</p>
        </div>
      </div>
    </section>
  )
}

export default Onac