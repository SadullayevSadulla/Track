import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import mainData from "./mainData";
import "./main.css";
import { useLanguage } from "../../../i18n/LanguageContext";

const Categories = () => {
  const { t } = useLanguage();

  return (
    <section className="categories container">

        <div className="categories__top container">
          <h2>{t("categories_section_title")}</h2>

          <div className="categories__buttons">
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
          {mainData.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="category-card">

                <div className="category-card__info">
                  <h3>{t(category.titleKey)}</h3>

                  <p>{t(category.modelsKey)}</p>
                </div>

                <div className="category-card__image">
                  <img
                    src={category.image}
                    alt={t(category.titleKey)}
                  />
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    </section>
  );
};

export default Categories;