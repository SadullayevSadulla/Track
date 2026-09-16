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
            <h1>Первый в России контейнеровоз на шасси КАМАЗ‑65658 выпустил «Рустрак»</h1>
            <p>07.07.2026</p>
          </div>
          <div className="mainNews_top_main flex">
            <div className="mainNews_top_main_left flex flex-col gap-10">
              <div className="mainNews_left_text">
                <p>ООО «РУСТРАК» разработал контейнеровоз на шасси КАМАЗ 65658-1766-49 — первый в России проект на базе этого шасси. Это компактное и маневренное решение для контейнерной логистики. Предназначен для перевозки контейнеров с опасными грузами (категории ТС FL, АТ по классификации ДОПОГ).</p>
                <h3>Ключевые характеристики</h3>
              </div>
              <div className="mainNews_left_text">
                <p>Габариты — 9040 × 2550 × 3480 мм;</p>
                <p>Грузоподъёмность — 20 000 кг, полная масса — 29 500 кг;</p>
                <p>Двигатель — 400 л.с. (КАМАЗ 689);</p>
                <p>КПП — F12JZ24DD (12-ти ступенчатая роботизированная);</p>
                <p> Нагрузка на оси — до 9000 кг (передняя) и 20 500 кг (ведущий мост).</p>
              </div>
              <div className="mainNews_left_text">
                <h3>Конструкция</h3>
                <p>Шасси укорочено для оптимального сопряжения согласно стандартам морских контейнеров. Усиленный надрамник изготовлен из швеллеров и гнутых профилей из сталей марок применяемых в автомобилестроении, платформа оснащена сертифицированными фитинговыми замками TLT-10 для надёжной фиксации груза. Контейнеровоз Рустрак на шасси КАМАЗ 65658 предназначен для перевозки контейнеров типов - 1CX, 1C, 1CC.</p>
              </div>
              <div className="mainNews_left_text">
                <h3>Защита</h3>
                <p>Весь металл проходит трёхэтапную обработку: дробеструйную очистку, эпоксидное грунтование с цинкфосфатными соединениями и финишную многослойную окраску. Такая технология обеспечивает высокую адгезию покрытия, надёжную антикоррозионную защиту и продлевает срок службы конструкции даже в условиях агрессивной среды портов и терминалов.</p>
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