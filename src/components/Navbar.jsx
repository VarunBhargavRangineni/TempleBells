import React from 'react';
import { translations } from '../translations';
import './Navbar.css';

function Navbar({ lang }) {
  const t = translations[lang || 'EN'];

  return (
    <nav className="grand-navbar">
      <div className="container nav-inner">
        <div className="brand-box">
          <div className="temple-logo-wrapper">
            <div className="temple-logo-purple">
              <span className="om-symbol">🕉</span>
            </div>
          </div>
          <div className="brand-text">
            <h1 className="gold-gradient-text">Temple Bells</h1>
            <p>{t.brand_tagline}</p>
          </div>
        </div>

        <ul className="main-nav">
          <li><a href="#">{t.nav_home}</a></li>
          <li><a href="#services">{t.nav_services}</a></li>
          <li><a href="#about">{t.nav_about}</a></li>
          <li><a href="#festivals">{t.nav_festivals}</a></li>
          <li><a href="#spots">{t.nav_spots}</a></li>
          <li><a href="#gallery">{t.nav_gallery}</a></li>
          <li><a href="#timings">{t.nav_pujas}</a></li>
          <li><a href="#contact">{t.nav_location}</a></li>
        </ul>

        <div className="nav-actions">
          <button className="gold-btn sign-in-btn">SIGN IN / REGISTER</button>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
