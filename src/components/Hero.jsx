import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import './Hero.css';

function Hero({ lang }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = translations[lang || 'EN'];

  const slideImages = [
    'https://www.fabhotels.com/blog/wp-content/uploads/2019/03/Sri-Venkateswara-Swamy-Temple-Tirumala.jpg',
    'https://srisailamtourism.com/images/partner-tours/1-day-hyderabad-to-srisailam-sightseeing-tour-package-private-car-header.jpg',
    'https://live.staticflickr.com/409/18298741278_a0675e8527_b.jpg',
    'https://media.tripinvites.com/places/visakhapatnam/simhachalam-temple/the-simhachalam-temple-featured.jpg',
    'https://1.bp.blogspot.com/-woaUFQ48K_s/X9HT2Di-ToI/AAAAAAAADVc/ih29PL2h6OgzUYbydOZpgRZKOOChKJ5YACLcBGAsYHQ/s2048/Kotappakonda%2BTemple%2BTop%2BView.jpg',
    'https://www.holidify.com/images/cmsuploads/compressed/shutterstock_1539191288_20200102183329_20200416152607.jpg',
    'https://www.pilgrimaide.com/image/cache/catalog/Blogs/Panakala%20Narasimha%20Swamy%20Temple-2120x800w.jpg',
    'http://bhadrachalaramadasu.com/wp-content/uploads/2014/10/rrr.jpg',
    'https://travellerkaka.com/wp-content/uploads/2025/03/Add-a-subheading-22-5-1068x559.png',
    'https://famoustemplesofindia.com/wp-content/uploads/2023/09/Kanipakam-Varasiddhi-Vinayaka-Swamy-2-1024x578.jpg',
    'https://www.hyderabadzone.com/wp-content/uploads/2022/11/Yadagirigutta-Yadadri-Temple-4-1200x674.jpg',
    'https://i.ytimg.com/vi/AYmHRURQZVA/maxresdefault.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="hero-grand-container">
        <div className="visdom-badge">
          <div className="visdom-logo">
            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 25 L18 35 L30 15" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="check-1" />
              <path d="M16 25 L24 35 L36 15" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="check-2" />
              <path d="M22 25 L30 35 L42 15" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="check-3" />
            </svg>
          </div>
          <div className="visdom-content">
            <div className="visdom-label">Powered by</div>
            <div className="visdom-header">Visdom Waves</div>
            <div className="visdom-sub">Innovations Private Limited</div>
            <div className="visdom-tagline">Driven by vision</div>
          </div>
        </div>
        <div className="slideshow">
          {t.slides.map((slide, idx) => (
            <div key={idx} className={`slide ${idx === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${slideImages[idx]})` }}>
              <div className="container slide-content">
                <span className="slide-tag animate-slide-right" style={{ animationDelay: '0.2s' }}>{slide.tag}</span>
                <h1 className="animate-slide-right" style={{ animationDelay: '0.4s' }}>{slide.title}</h1>
                <p className="animate-slide-left" style={{ animationDelay: '0.6s' }}>{slide.subtitle}</p>
                <div className="hero-cta animate-slide-up" style={{ animationDelay: '0.8s' }}>
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
