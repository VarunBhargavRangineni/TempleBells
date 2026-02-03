import React from 'react';
import { translations } from '../translations';
import './SacredSpots.css';

function SacredSpots({ lang }) {
  const t = translations[lang || 'EN'];

  return (
    <>
      <section className="spots-section" id="spots">
        <div className="container">
          <div className="grand-title">
            <span className="spots-title-span">{t.spots_title}</span>
            <h2>{t.spots_subtitle}</h2>
            <div className="divider"></div>
          </div>

          <div className="spots-layout">
            <div className="spots-info-grid">
              {t.spots.map((spot, i) => (
                <div className="spot-item" key={i}>
                  <div className="spot-num">0{i + 1}</div>
                  <div className="spot-content">
                    <h4>{spot.name}</h4>
                    <p>{spot.desc}</p>
                    <small>{spot.detail}</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="spots-visual">
              <div className="visual-card annadanam">
                <div className="visual-tag">{t.daily_seva}</div>
                <h3>{t.annadanam_title}</h3>
                <p>{t.annadanam_desc}</p>
                <div className="time-badge">12:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


export default SacredSpots;
