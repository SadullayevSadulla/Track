import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "./oNas.css";
import OnacData from "./oNasData";

const Onac = () => {
  return (
    <section>
      <div className="about mt-10">
        <div className="about_i container">
          <div className="about_i_text">
            <h1>
              Автомобильный завод «РусТрак» - ведущий производитель
              коммерческого транспорта и специализированной техники
              в Нижнем Новгороде.
            </h1>

            <div className="about_badge">
              <div className="about_badge_shape">
                <span className="about_badge_number">17+</span>
                <span className="about_badge_text">лет опыта</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="swiper container">

        <div className="swiper__top flex py-20 justify-between">
          <h2 className="about_tt">Автомобильный завод «РусТрак» является предприятием полного цикла: от конструкторско-технологических разработок до готового изделия.</h2>

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
          {OnacData.map((OnacData) => (
            <SwiperSlide key={OnacData.id}>
              <Link to="/">
                <div className="about_sw">
                  <div className="about_img">
                    <img
                      src={OnacData.image}
                      className="about_img_icon"
                    />
                  </div>
                  <div className="about_text">
                    <div className="ttt">
                      {OnacData.title}
                    </div>
                    <div className="ppp">
                      {OnacData.cardTitle}
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
            <h1>Сегодня ООО «Рустрак» - это:</h1>
            <div className="seb_p">
              <div className="pppp">
                <div className="lot">
                  <i className="fa-solid fa-check"></i>
                </div>
                <p>3 производственных корпуса, общей площадью более 7000 м2;</p>
              </div>
              <div className="pppp">
                <div className="lot">
                  <i className="fa-solid fa-check"></i>
                </div>
                <p>3 производственных корпуса, общей площадью более 7000 м2;</p>
              </div>
              <div className="pppp">
                <div className="lot">
                  <i className="fa-solid fa-check"></i>
                </div>
                <p>3 производственных корпуса, общей площадью более 7000 м2;</p>
              </div>
              <div className="pppp">
                <div className="lot">
                  <i className="fa-solid fa-check"></i>
                </div>
                <p>3 производственных корпуса, общей площадью более 7000 м2;</p>
              </div>
              <div className="pppp">
                <div className="lot">
                  <i className="fa-solid fa-check"></i>
                </div>
                <p>3 производственных корпуса, общей площадью более 7000 м2;</p>
              </div>
              <div className="pppp">
                <div className="lot">
                  <i className="fa-solid fa-check"></i>
                </div>
                <p>3 производственных корпуса, общей площадью более 7000 м2;</p>
              </div>
              <div className="pppp">
                <div className="lot">
                  <i className="fa-solid fa-check"></i>
                </div>
                <p>3 производственных корпуса, общей площадью более 7000 м2;</p>
              </div>
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
              <h1>Отрасли применения выпускаемой техники:</h1>
              <p>Cтроительная, телекоммуникационная, коммунальная, дорожное хозяйство, логистика, сельское хозяйство.</p>
            </div>
            <div className="cat_right_top_text">
              <h1>Выпускаемая техника:</h1>
              <p>Краны-манипуляторы, автотопливозаправщики, автовышки, фургоны, самосвалы, бортовые платформы, эвакуаторы, крюковые погрузчики, мастерские, пищевые цистерны, вакуумные машины, автогидроподъёмники.</p>
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
          <p>ООО «РусТрак» является официальным дилером на территории РФ следующих марок: Palfinger, ИНМАН, HKTC, UNIC, DongYang, FASSI, Hangil, XCMG, HIAB.</p>
          <p>За 16 лет деятельности компания заслужила высокий уровень доверия дистрибьютеров и автопроизводителей: ИСУЗУ РУС, КАМАЗ, ГАЗ, DAEWOO, FAW, JAC, ТРАКС ВОСТОК РУС (КОМПАС), МАЗ РУС, ДАЙМЛЕР КАМАЗ РУС (FUSO), ХИНО МОТОРС, FOTON, DONG FENG, SHACHMAN, НЕФАЗ, ЗАВОД СТАРТ</p>
          <p>Наши клиенты: Газпром, Росатом, Россети, РСК «МИГ», Роснефть и др.</p>
        </div>
      </div>
    </section>
  )
}

export default Onac