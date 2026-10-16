import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate, useParams } from 'react-router-dom';
import './mainNewsCard.css';
import { useLanguage } from '../../i18n/LanguageContext';
import newsData from '../Home/MainNews/newsData';
import NotFound from '../NotFound/notFound';

const MainNewsCard = () => {
  const { t } = useLanguage();
  const { newsId } = useParams();
  const navigate = useNavigate();
  const isFeaturedArticle = !newsId || newsId === 'featured';
  const selectedNews = isFeaturedArticle
    ? null
    : newsData.find((item) => item.id === Number(newsId));
  const hasFullArticle = isFeaturedArticle || selectedNews?.detailType === 'featured';

  if (!isFeaturedArticle && !selectedNews) {
    return <NotFound />;
  }

  const relatedNews = newsData.filter((item) => item.id !== selectedNews?.id && item.detailType !== 'featured');
  const articleTitle = isFeaturedArticle ? t('newscard_title') : t(selectedNews.textKey);
  const articleDate = isFeaturedArticle
    ? t('newscard_date')
    : selectedNews.dateKey
      ? t(selectedNews.dateKey)
      : selectedNews.date;
  const articleImage = isFeaturedArticle ? '/000 (5).webp' : selectedNews.image;
  const galleryImages = ['/000 (5).webp', '/0001.jpg', '/0002.jpg', '/0004.jpg', '/0005.jpg', '/0006.jpg'];

  return (
    <div className="container">
      <article className="mainNewsCard">
        <header className="mianNews_top_text mb-8">
          <h1>{articleTitle}</h1>
          {articleDate && <p>{articleDate}</p>}
        </header>

        <div className="mainNews_top_main flex">
          <div className="mainNews_top_main_left flex flex-col gap-10">
            {hasFullArticle ? (
              <>
                <div className="mainNews_left_text"><p>{t('newscard_intro')}</p></div>
                <div className="mainNews_left_text">
                  <h3>{t('newscard_specs_title')}</h3>
                  {[1, 2, 3, 4, 5].map((number) => (
                    <p key={number}>• {t(`newscard_spec${number}`)}</p>
                  ))}
                </div>
                <div className="mainNews_left_text">
                  <h3>{t('newscard_design_title')}</h3>
                  <p>{t('newscard_design_text')}</p>
                </div>
                <div className="mainNews_left_text">
                  <h3>{t('newscard_protection_title')}</h3>
                  <p>{t('newscard_protection_text')}</p>
                </div>
              </>
            ) : (
              <>
                <div className="mainNews_left_text mainNews_article_summary">
                  <p>{t(selectedNews.introKey ?? selectedNews.textKey)}</p>
                </div>
                {selectedNews.sectionTitleKey && selectedNews.sectionTextKey && (
                  <div className="mainNews_left_text">
                    <h3>{t(selectedNews.sectionTitleKey)}</h3>
                    <p>{t(selectedNews.sectionTextKey)}</p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mainNews_top_main_right">
            <div className="mainNews_topppp">
              <div className="mainNews_swiper_section">
                {hasFullArticle ? (
                  <Swiper
                    className="mainNews_gallery"
                    modules={[Autoplay, Pagination]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop
                  >
                    {galleryImages.map((image) => (
                      <SwiperSlide key={image}>
                        <img src={image} alt={articleTitle} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <img src={articleImage} alt={articleTitle} />
                )}
              </div>
            </div>
          </div>
        </div>

        <section className="mainNews_bot mt-12">
          <h2 className="mb-6 text-2xl font-semibold">{t('news_section_title')}</h2>
          <div className="news_bot flex flex-wrap mt-12">
            {!hasFullArticle && (
              <div className="news-card news-card--related" key="featured">
                <div className="news-card__info">
                  <p className="text-sm text-gray-500">{t('news_featured_date')}</p>
                  <p className="news-card__price">{t('news_featured_title')}</p>
                  <button
                    className="news-card__btn-secondary text-[18px] cursor-pointer"
                    onClick={() => navigate('/mainNewsCard/featured')}
                  >
                    {t('btn_more')} <i className="fa-solid fa-arrow-right-long"></i>
                  </button>
                </div>
              </div>
            )}
            {relatedNews.map((item) => (
              <div className="news-card news-card--related" key={item.id}>
                <div className="news-card__info">
                  {(item.dateKey || item.date) && <p className="text-sm text-gray-500">{item.dateKey ? t(item.dateKey) : item.date}</p>}
                  <p className="news-card__price">{t(item.textKey)}</p>
                  <button
                    className="news-card__btn-secondary text-[18px] cursor-pointer"
                    onClick={() => navigate(`/mainNewsCard/${item.id}`)}
                  >
                    {t('btn_more')} <i className="fa-solid fa-arrow-right-long"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};

export default MainNewsCard;
