import React from 'react'
import "./information.css"

const productImage = "/000.webp"

const specifications = [
  ["Базовое шасси", "SOLLERS TR80-47"],
  ["Двигатель", "Cummins D4.0EVID170, 163 л. с."],
  ["КПП", "Механическая, 6-ти ступенчатая"],
  ["Длина автомобиля, мм", "8990"],
  ["Ширина автомобиля, мм", "2400"],
  ["Высота автомобиля, мм", "3330"],
  ["Колесная база, мм", "5200"],
  ["Длина платформы, м", "6200"],
  ["Полная масса, кг", "8000"],
  ["Снаряженная масса, кг", "6420"],
  ["Грузоподъёмность, кг", "1580"],
  ["Грузоподъёмность КМУ, тонн", "3,2"],
  ["Вылет стрелы, м", "9,8"],
]

const Information = () => {
  return (
    <section className="information container">
      <div className="information__inner">
        <h1 className="information__title">
          КРАН-МАНИПУЛЯТОР SOLLERS TR80-47 С КМУ НКТC 3014 (МОДЕЛЬ 4389А8)
        </h1>

        <div className="information__layout">
          <div className="information__photo">
            <img src={productImage} alt="Кран-манипулятор Sollers TR80-47" />
          </div>

          <div className="information__details">
            <h2>Цена по запросу</h2>
            <div className="information__actions">
              <button className="information__cart" type="button">Добавить в корзину</button>
              <button className="information__offer" type="button">Получить КП</button>
            </div>

            <dl className="information__specifications">
              {specifications.map(([label, value]) => (
                <div className="information__specification flex gap-10" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <a className="information__more text-[#A2A2A2]" href="#specifications">Смотреть все характеристики</a>
          </div>
        </div>
        <div className="gggg mt-10">
          <img src="/tr80_3014.png" alt="" />
        </div>
      </div>
    </section>
  )
}

export default Information