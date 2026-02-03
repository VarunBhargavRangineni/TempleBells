import React from 'react';
import { translations } from '../translations';
import './Festivals.css';

function Festivals({ lang }) {
  const t = translations[lang || 'EN'];

  return (
    <>
      <section className="festivals-section" id="festivals">
        <div className="container">
          <div className="grand-title">
            <span className="fest-title-span">{t.fest_title}</span>
            <h2>{t.fest_subtitle}</h2>
            <div className="divider"></div>
          </div>

          <div className="festivals-grid">
            {t.festivals.map((fest, i) => (
              <div className="fest-card" key={i}>
                <div className="fest-date">{fest.date}</div>
                <h3>{fest.name}</h3>
                <p>{fest.desc}</p>
                <div className="fest-decoration">☸</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};


export default Festivals;
