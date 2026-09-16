import React, { useState } from 'react';
import './foto.css';

const imagesData = {
  cars: [
    { id: 1, src: '/yioe30qveqer3vjd8ujjtj2jxa15wgod.webp', title: 'Avtomobil 1' },
    { id: 2, src: '/yioe30qveqer3vjd8ujjtj2jxa15wgod.webp', title: 'Avtomobil 2' },
    { id: 3, src: '/yioe30qveqer3vjd8ujjtj2jxa15wgod.webp', title: 'Avtomobil 3' },
    { id: 4, src: '/yioe30qveqer3vjd8ujjtj2jxa15wgod.webp', title: 'Avtomobil 4' },
    { id: 5, src: '/yioe30qveqer3vjd8ujjtj2jxa15wgod.webp', title: 'Avtomobil 5' },
    { id: 6, src: '/yioe30qveqer3vjd8ujjtj2jxa15wgod.webp', title: 'Avtomobil 6' },
  ],
  production: [
    { id: 7, src: '/yioe30qveqer3vjd8ujjtj2jxa15wgod.webp', title: 'Ishlab chiqarish 1' },
    { id: 8, src: '/yioe30qveqer3vjd8ujjtj2jxa15wgod.webp', title: 'Ishlab chiqarish 2' },
    { id: 9, src: '/yioe30qveqer3vjd8ujjtj2jxa15wgod.webp', title: 'Ishlab chiqarish 3' },
  ],
  company: [
    { id: 10, src: '/yioe30qveqer3vjd8ujjtj2jxa15wgod.webp', title: 'Kompaniya 1' },
    { id: 11, src: '/yioe30qveqer3vjd8ujjtj2jxa15wgod.webp', title: 'Kompaniya 2' },
  ],
  exhibitions: [
    { id: 12, src: '/yioe30qveqer3vjd8ujjtj2jxa15wgod.webp', title: 'Ko\'rgazma 1' },
    { id: 13, src: '/yioe30qveqer3vjd8ujjtj2jxa15wgod.webp', title: 'Ko\'rgazma 2' },
    { id: 12, src: '/yioe30qveqer3vjd8ujjtj2jxa15wgod.webp', title: 'Ko\'rgazma 1' },
  ]
};

export default function Foto() {
  const [activeTab, setActiveTab] = useState('cars');
  const [modalImg, setModalImg] = useState(null);

  const currentImages = imagesData[activeTab] || imagesData.cars;

  return (
    <div className="gallery-container container">
      <header className="gallery-header">
        <h1 className="gallery-title">Фотогалерея производителя автоспецтехники РусТрак</h1>
        <button className="video-btn">Смотреть видео</button>
      </header>

      <nav className="gallery-nav">
        <button 
          className={`nav-btn ${activeTab === 'cars' ? 'active' : ''}`}
          onClick={() => setActiveTab('cars')}
        >
          Автомобили
        </button>
        <button 
          className={`nav-btn ${activeTab === 'production' ? 'active' : ''}`}
          onClick={() => setActiveTab('production')}
        >
          Производство
        </button>
        <button 
          className={`nav-btn ${activeTab === 'company' ? 'active' : ''}`}
          onClick={() => setActiveTab('company')}
        >
          О компании
        </button>
        <button 
          className={`nav-btn ${activeTab === 'exhibitions' ? 'active' : ''}`}
          onClick={() => setActiveTab('exhibitions')}
        >
          Выставки
        </button>
      </nav>

      <div className="gallery-grid">
        {currentImages.map((img) => (
          <div key={img.id} className="gallery-item" onClick={() => setModalImg(img.src)}>
            <img src={img.src} alt={img.title} />
          </div>
        ))}
      </div>

      {modalImg && (
        <div className="modal-overlay" onClick={() => setModalImg(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setModalImg(null)}>&times;</button>
            <img src={modalImg} alt="Kattalashtirilgan rasm" />
          </div>
        </div>
      )}
    </div>
  );
}