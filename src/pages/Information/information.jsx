import React from 'react'
import "./information.css"

const productImage = "/000.webp"

const specifications = [
  [
    "Базовое шасси",
    "SOLLERS TR80-47"
  ],
  [
    "Двигатель",
    "Cummins D4.0EVID170, 163 л. с."

  ],
  [
    "КПП",
    "Механическая, 6-ти ступенчатая"

  ],
  [
    "Длина автомобиля, мм",
    "8990"
  ],
  [
    "Ширина автомобиля, мм",
    "2400"
  ],
  [
    "Высота автомобиля",
    "3330"

  ],
  [
    "Колесная база, мм",
    "5200"]
  ,
  [
    "Длина платформы, м",
    "6200"

  ],
  [
    "Полная масса, кг",
    "8000"

  ],
  [
    "Снаряженная масса, кг",
    "6420"
  ],
  [
    "Грузоподъёмность, кг",
    "1580"

  ],
  [
    "Грузоподъёмность КМУ",
    "32"

  ],
  [
    "Вылет стрелы, м",
    "9,8"

  ],
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

      <div className="infarmation_cataolg" id="specifications">
        <div className="w-full p-6 font-sans">
          <h1 className="text-3xl font-bold text-neutral-900 mb-6">
            Характеристики
          </h1>

          <div className="rounded-md overflow-hidden border border-neutral-200">
            <div className="bg-amber-400 px-6 py-4">
              <span className="font-bold text-neutral-900">
                Кран-манипулятор SOLLERS TR80-47 с КМУ НКТС 3014 (модель 4389А8)
              </span>
            </div>

            <div>
              {specifications.map(([label, value], i) => (
                <div
                  key={label}
                  className={`grid grid-cols-1 sm:grid-cols-2 ${i !== specifications.length - 1 ? "border-b border-neutral-200" : ""
                    } ${i % 2 === 1 ? "bg-neutral-50" : "bg-white"}`}
                >
                  <div className="px-6 py-4 text-neutral-800 sm:border-r border-neutral-200">
                    {label}
                  </div>
                  <div className="px-6 py-4 text-neutral-700 text-center flex items-center justify-center">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Information;