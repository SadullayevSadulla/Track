import "./repair.css"
import { useLanguage } from "../../i18n/LanguageContext";

import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from "react-compare-slider";

const Repair = () => {
  const { t } = useLanguage();

  return (
    <div className="container">
      <div className="remont">
        <div className="remont_top">
          <div className="top_text flex flex-col gap-4 mb-[25px]">
            <h1>{t("repair_title")}</h1>
            <p>{t("repair_intro")}</p>
          </div>
          <div className="top_img flex justify-center gap-4 mb-7.5">
            <img src="/first_car_2.jpg" alt="" />
            <img src="/first_car_1.jpg" alt="" />
          </div>
          <div className="remont_button">
            <button>{t("repair_calc_btn")}</button>
          </div>
        </div>

        <div className="remont_bot">
          <div className="bot_text">
            <h1>{t("repair_services_title")}</h1>
            <p>{t("repair_services_text")}{" "}
              <span className="text-[#000]">{t("repair_services_important_label")}</span>{t("repair_services_important_text")}</p>
          </div>
        </div>
      </div>

      <section className="slide-section mt-10">
        <div className="bot_img mb-7">
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src="/first_car_2.jpg"
                alt={t("repair_before")}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src="/first_car_1.jpg"
                alt={t("repair_after")}
              />
            }
          />
        </div>
      </section>

      <div className="pas_section">
        <div className="text">
          <div className="h1">
            <h1>{t("repair_advantages_title")}</h1>
          </div>
          <div className="paragrf">
            <p>{t("repair_advantage1")}</p>
            <p>{t("repair_advantage2")}</p>
            <p>{t("repair_advantage3")}</p>
            <p>{t("repair_advantage4")}</p>
            <p>{t("repair_advantage5")}</p>
            <p>{t("repair_advantage6")}</p>
          </div>
        </div>
        <div className="pas_img mt-10">
          <div className="img1">
            <img src="/proizvodstvo_3.jpg" alt="" />
          </div>
          <div className="imgs flex">
            <img src="/proizvodstvo_1.png" alt="" />
            <img src="/proizvodstvo_4.jpg" alt="" />
            <img src="/proizvodstvo_2.png" alt="" />
          </div>
        </div>
      </div>
      <div className="remont_top mt-[30px]">
        <div className="remont_button">
          <button>{t("repair_calc_btn")}</button>
        </div>
        <div className="bot_text">
          <h1>{t("repair_bottom_title")}</h1>
          <p>{t("repair_bottom_text")}</p>
        </div>
      </div>

    </div>
  )
}

export default Repair