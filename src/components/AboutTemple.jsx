import { translations } from '../translations';
import './AboutTemple.css';

function AboutTemple({ lang }) {
  const t = translations[lang || 'EN'];

  return (
    <>
      <section className="temple-chronicle-section" id="about">
        <div className="container">
          <div className="grand-title">
            <span className="history-title-span">{t.history_title}</span>
            <h2>{t.history_subtitle}</h2>
            <div className="divider"></div>
          </div>

          <div className="history-archival-grid">
            <div className="archival-content">
              <div className="history-era">
                <span className="era-tag">{t.era1_tag}</span>
                <h3>{t.era1_title}</h3>
                <p>{t.era1_p}</p>
                <div className="miracle-callout">
                  <h4>{t.miracle_title}</h4>
                  <p>{t.miracle_p}</p>
                </div>
              </div>

              <div className="history-era">
                <span className="era-tag">{t.era2_tag}</span>
                <h3>{t.era2_title}</h3>
                <p>{t.era2_p}</p>
              </div>
            </div>

            <div className="archival-sidebar">
              <div className="gallery-stack">
                <div className="stack-item item-1">
                  <img src="https://www.panakalanarasimhaswamy.org/images/temple-image-10.jpg" alt="Temple Entrance" />
                  <label>{t.sidebar_item1}</label>
                </div>
                <div className="stack-item item-2">
                  <img src="https://www.panakalanarasimhaswamy.org/images/temple-image-9.jpg" alt="Ancient Carvings" />
                  <label>{t.sidebar_item2}</label>
                </div>
                <div className="stack-item item-3">
                  <img src="https://www.panakalanarasimhaswamy.org/images/temple-image-3.jpg" alt="Raja Gopuram" />
                  <label>{t.sidebar_item3}</label>
                </div>
              </div>

              <div className="administrative-stat">
                <h4>{t.agama_title}</h4>
                <p>{t.agama_p}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


export default AboutTemple;
