import React from 'react';
import { translations } from '../translations';
import './MediaGallery.css';

function MediaGallery({ lang }) {
  const t = translations[lang || 'EN'];
  const images = [
    'https://www.panakalanarasimhaswamy.org/images/temple-image-2.jpg',
    'https://www.panakalanarasimhaswamy.org/images/temple-image-10.jpg',
    'https://www.panakalanarasimhaswamy.org/images/temple-image-3.jpg',
    'https://www.panakalanarasimhaswamy.org/images/temple-image-5.jpg'
  ];

  return (
    <>
      <section className="gallery-section" id="gallery">
        <div className="container">
          <div className="grand-title">
            <span className="gallery-title-span">{t.gallery_title}</span>
            <h2>{t.gallery_subtitle}</h2>
            <div className="divider"></div>
          </div>

          <div className="gallery-grid">
            {images.map((img, i) => (
              <div className="gallery-item" key={i}>
                <img src={img} alt={`${t.nav_gallery} ${i + 1}`} />
                <div className="gallery-overlay">
                  <span>{t.view_more}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};


export default MediaGallery;
