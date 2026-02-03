import { translations } from '../translations';
import './PujasAndTimings.css';

function PujasAndTimings({ lang }) {
  const t = translations[lang || 'EN'];

  return (
    <>
      <section className="grand-timings-section" id="timings">
        <div className="container">
          <div className="grand-title">
            <span className="pujas-title-span">{t.pujas_title}</span>
            <h2>{t.pujas_subtitle}</h2>
            <div className="divider"></div>
          </div>

          <div className="schedule-tabs-container">
            <div className="sanctum-card">
              <div className="sanctum-header upper">
                <h3>{t.upper_sanctum}</h3>
                <p>{t.upper_deity}</p>
              </div>
              <div className="schedule-body">
                <div className="time-row">
                  <div className="time">07:00 AM</div>
                  <div className="ritual">
                    <h4>{t.suprabhata}</h4>
                    <p>{t.suprabhata_p}</p>
                  </div>
                </div>
                <div className="time-row highlight">
                  <div className="time">07:30 AM - 03:30 PM</div>
                  <div className="ritual">
                    <h4>{t.panakam_offering}</h4>
                    <p>{t.panakam_offering_p}</p>
                  </div>
                </div>
                <div className="time-row">
                  <div className="time">03:30 PM - 04:00 PM</div>
                  <div className="ritual">
                    <h4>{t.maha_nivedana}</h4>
                    <p>{t.maha_nivedana_p}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sanctum-card">
              <div className="sanctum-header lower">
                <h3>{t.lower_sanctum}</h3>
                <p>{t.lower_deity}</p>
              </div>
              <div className="schedule-body">
                <div className="time-row">
                  <div className="time">05:00 AM - 01:00 PM</div>
                  <div className="ritual">
                    <h4>{t.morning_darshan}</h4>
                    <p>{t.morning_darshan_p}</p>
                  </div>
                </div>
                <div className="time-row highlight">
                  <div className="time">04:00 PM - 08:00 PM</div>
                  <div className="ritual">
                    <h4>{t.evening_darshan}</h4>
                    <p>{t.evening_darshan_p}</p>
                  </div>
                </div>
                <div className="time-row note">
                  <div className="icon">⚠️</div>
                  <div className="ritual">
                    <p>{t.timings_note}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


export default PujasAndTimings;
