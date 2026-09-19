import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination as AntPagination } from 'antd';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './mainNewsCard.css';

import { Autoplay, Navigation, Pagination as SwiperPagination } from 'swiper/modules';
import newsCardData from './newsCardData';
import { useLanguage } from '../../i18n/LanguageContext';

const MainNewsCard = () => {
  const { t } = useLanguage();

  return (
    <div className='container'>
      <div className="mainNewsCard">
        <div className="mainNews_top">
          <div className="mianNews_top_text mb-20">
            <h1>{t("newscard_title")}</h1>
            <p>{t("newscard_date")}</p>
          </div>
          <div className="mainNews_top_main flex">
            <div className="mainNews_top_main_left flex flex-col gap-10">
              <div className="mainNews_left_text">
                <p>{t("newscard_intro")}</p>
                <h3>{t("newscard_specs_title")}</h3>
              </div>
              <div className="mainNews_left_text">
                <p>{t("newscard_spec1")}</p>
                <p>{t("newscard_spec2")}</p>
                <p>{t("newscard_spec3")}</p>
                <p>{t("newscard_spec4")}</p>
                <p>{t("newscard_spec5")}</p>
              </div>
              <div className="mainNews_left_text">
                <h3>{t("newscard_design_title")}</h3>
                <p>{t("newscard_design_text")}</p>
              </div>
              <div className="mainNews_left_text">
                <h3>{t("newscard_protection_title")}</h3>
                <p>{t("newscard_protection_text")}</p>
              </div>
            </div>
            <div className="mainNews_top_main_right">
              <div className="mainNews_topppp">
                <div className="mainNews_swiper_section">
                  <Swiper
                    pagination={{ clickable: true }}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                    }}
                    loop={true}
                    autoHeight={true}
                    modules={[Navigation, SwiperPagination, Autoplay]}
                    className="news_swiper"
                  >
                    <SwiperSlide className="news_slide">
                      <img src="/000 (5).webp" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className="news_slide">
                      <img src="/0001.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className="news_slide">
                      <img src="/0002.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className="news_slide">
                      <img src="/0004.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className="news_slide">
                      <img src="/0005.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className="news_slide">
                      <img src="/0006.jpg" alt="" />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mainNews_bot">
          <div className="div">
            <div className="news_bot flex flex-wrap mt-12">
              {newsCardData.map((item) => (
                <div key={item.id}>
                  <div className="news-card">
                    <div className="news-card__info">
                      <p className="news-card__price">{t("news_common_text")}</p>
                      <div className="product-card__actions">

                        <button className="news-card__btn-secondary text-[18px] cursor-pointer">
                          {t("btn_more")}
                          <i className="fa-solid fa-arrow-right-long"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainNewsCard