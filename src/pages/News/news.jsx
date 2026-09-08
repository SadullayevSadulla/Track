import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination as AntPagination } from 'antd';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './news.css';

import { Autoplay, Navigation, Pagination as SwiperPagination } from 'swiper/modules';
import newsD from './newsD';
import { useLanguage } from '../../i18n/LanguageContext';

const News = () => {
  const { t } = useLanguage();

  return (
    <div className="container">
      <div className="news">
        <div className="news_top">
          <div className="swiper_section">
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
          <div className="news_top_left">
            <div className="product-card__info">
              <h3 className="font-normal text-[18px] text-[#000000]">{t("news_featured_date")}</h3>
              <p className="product-card__price"><a href="#">{t("news_featured_title")}</a></p>
              <div className="product-card__actions">
                <button className="product-card__btn-secondary text-[18px]">
                  <p>{t("btn_more")}</p>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="div">
          <div className="news_bot flex flex-wrap mt-12">
            {newsD.map((item) => (
              <div key={item.id}>
                <div className="news-card">
                  <div className="news-card__image flex">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="news-card__info">
                    <h3 className="font-normal text-[18px] max-w-[288px] text-[#000000]">{item.date}</h3>
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
          <div className="news-pagination">
            <AntPagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default News