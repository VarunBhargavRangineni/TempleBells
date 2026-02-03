import React from 'react';
import './PilgrimServices.css';

const services = [
  { id: 1, name: 'Arjitha Sevas', img: '🛐' },
  { id: 2, name: 'Sri Srinivasa Divyanugraha Homam', img: '🔥' },
  { id: 3, name: 'Accommodation', img: '🏨' },
  { id: 4, name: 'Special Entry Darshan (Ammavari Temple)', img: '👣' },
  { id: 5, name: 'Special Entry Darshan', img: '👣' },
  { id: 6, name: 'Differently Abled/Sr.Citizen Darshan', img: '♿' },
  { id: 7, name: 'Online Sevas (Virtual Participation)', img: '🖥️' },
  { id: 8, name: 'Angapradakshinam', img: '🙏' },
  { id: 9, name: 'Seva E-Dip', img: '🗳️' },
  { id: 10, name: 'Angapradakshinam (for Locals)', img: '🙏' },
  { id: 11, name: 'Swamyvari (e-hundi)', img: '💰' },
  { id: 12, name: 'SV Pranadana Trust Donations', img: '🤝' },
  { id: 13, name: 'Ammavari (e-hundi)', img: '💰' },
  { id: 14, name: 'Donor/USSES Privileges', img: '🎖️' },
  { id: 15, name: 'SRIVANI and Other Trust Donations', img: '🤝' },
  { id: 16, name: 'Kalyanavedika', img: '🏛️' },
  { id: 17, name: 'Panchagavya Products', img: '🥛' },
  { id: 18, name: 'Kalyanamandapam', img: '🏯' },
];

function PilgrimServices() {
  return (
    <>
      <section className="pilgrim-services-section">
        <div className="container">
          <div className="section-head">
            <h2>Pilgrim Services</h2>
            <a href="#" className="see-more">More Services</a>
          </div>

          <div className="services-grid-ttd">
            {services.map(s => (
              <div key={s.id} className="s-card">
                <div className="s-icon-bg">
                  <span className="s-emoji">{s.img}</span>
                </div>
                <p className="s-label">{s.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};


export default PilgrimServices;
