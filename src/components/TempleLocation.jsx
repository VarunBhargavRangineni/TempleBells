import { translations } from '../translations';
import './TempleLocation.css';

function TempleLocation({ lang }) {
  const t = translations[lang || 'EN'];

  return (
    <>
      <section className="location-section" id="contact">
        <div className="grand-title">
          <span className="location-title-span">{t.location_title}</span>
          <h2>{t.location_subtitle}</h2>
          <div className="divider"></div>
        </div>

        <div className="location-portal-grid">
          <div className="contact-details">
            <div className="office-card">
              <h3>{t.admin_office}</h3>
              <p><strong>{t.eo}</strong></p>
              <p>{t.address_line1}</p>
              <p>{t.address_line2}</p>
              <p>{t.address_line3}</p>

              <div className="contact-links" style={{ marginTop: '20px' }}>
                <p>📧 <strong>{t.email}:</strong> {t.email_val}</p>
                <p>📞 <strong>{t.phone}:</strong> {t.phone_val}</p>
              </div>
            </div>

            <div className="travel-portal">
              <h3>{t.travel_info}</h3>
              <div className="travel-mode">
                <span>🚂 {t.nearest_rail}</span>
                <p>{t.places.mangalagiri} (2 km) / {t.places.vijayawada} (12 km)</p>
              </div>
              <div className="travel-mode">
                <span>✈️ {t.nearest_air}</span>
                <p>{t.places.airport} (20 km)</p>
              </div>
              <div className="travel-mode">
                <span>🚌 {t.local_transport}</span>
                <p>{t.bus_info}</p>
              </div>
            </div>
          </div>

          <div className="map-view">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.9748685954605!2d80.55182831486326!3d16.42609098866164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f0f37be85f81%3A0xc62b48995aeb7ce1!2sPanakala%20Narasimha%20Swamy%20Temple!5e0!3m2!1sen!2sin!4v1647412345678!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px', borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              title={t.nav_location}
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default TempleLocation;
