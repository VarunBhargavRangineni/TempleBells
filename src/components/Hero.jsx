import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import './Hero.css';

function Hero({ lang }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = translations[lang || 'EN'];

  const slideImages = [
    'https://www.panakalanarasimhaswamy.org/images/temple-image-2.jpg',
    'https://www.panakalanarasimhaswamy.org/images/temple-image-10.jpg',
    'https://www.panakalanarasimhaswamy.org/images/temple-image-3.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="hero-grand-container">
        <div className="slideshow">
          {t.slides.map((slide, idx) => (
            <div key={idx} className={`slide ${idx === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${slideImages[idx]})` }}>
              <div className="container slide-content">
                <span className="slide-tag animate-fade">{slide.tag}</span>
                <h1 className="animate-fade">{slide.title}</h1>
                <p className="animate-fade">{slide.subtitle}</p>
                <div className="hero-cta animate-fade">
                  <a href="#services" className="gold-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>{t.hero_btn}</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="status-ribbon">
          <div className="container ribbon-inner">
            <div className="ribbon-item">
              <span className="icon">⏳</span>
              <div className="info">
                <label>{t.ribbon.wait_label}</label>
                <p>{t.ribbon.wait_val}</p>
              </div>
            </div>
            <div className="ribbon-item">
              <span className="icon">🌡️</span>
              <div className="info">
                <label>{t.ribbon.weather_label}</label>
                <p>{t.ribbon.weather_val}</p>
              </div>
            </div>
            <div className="ribbon-item">
              <span className="icon">🕉️</span>
              <div className="info">
                <label>{t.ribbon.special_label}</label>
                <p>{t.ribbon.special_val}</p>
              </div>
            </div>
            <div className="ribbon-item">
              <span className="icon">🔔</span>
              <div className="info">
                <label>{t.ribbon.panchangam_label}</label>
                <p>{t.ribbon.panchangam_val}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Hero;
