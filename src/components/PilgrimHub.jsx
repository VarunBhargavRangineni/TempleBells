import React, { useState } from 'react';
import { translations } from '../translations';
import './PilgrimHub.css';

function PilgrimHub({ lang }) {
    const [selectedService, setSelectedService] = useState(null);
    const [isDonation, setIsDonation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const t = translations[lang || 'EN'];

    const [bookingDetails, setBookingDetails] = useState({
        date: '',
        pilgrims: 1,
        slot: 'Morning'
    });

    const categories = [
        { title: t.cat_darshan, services: ['Special Entry Darshan', 'SRIVANI Darshan', 'Sr. Citizen/Differently Abled'], color: '#B91D1B' },
        { title: t.cat_sevas, services: ['Arjitha Sevas', 'Kalyanotsavam', 'Virtual Seva Participation'], color: '#D4AF37' },
        { title: t.cat_prasadam, services: ['Ladoo Prasadam', 'Anna Prasadam', 'Panakam Availability'], color: '#27AE60' },
        { title: t.cat_stay, services: ['Cottage Booking', 'Guest House', 'Dormitory'], color: '#2980B9' }
    ];

    const handleBookClick = (service) => {
        setIsDonation(false);
        setShowSuccess(false);
        setSelectedService(service);
    };

    const handleDonationClick = () => {
        setIsDonation(true);
        setShowSuccess(false);
        setSelectedService(t.service_names['General Donation'] || 'General Donation');
    };

    const handleCloseModal = () => {
        setSelectedService(null);
        setIsDonation(false);
        setShowSuccess(false);
    };

    const handleFinalSubmit = () => {
        setShowSuccess(true);
    };

    return (
        <>
            <section className="pilgrim-hub-section" id="services">
                <div className="container">
                    <div className="grand-title">
                        <span className="portal-title-span">{t.portal_title}</span>
                        <h2>{t.portal_subtitle}</h2>
                        <div className="divider"></div>
                    </div>

                    <div className="portal-grid">
                        {categories.map((cat, i) => (
                            <div key={i} className="portal-card" style={{ '--border-color': cat.color }}>
                                <div className="card-top">
                                    <h3>{cat.title}</h3>
                                    <div className="card-dot" style={{ background: cat.color }}></div>
                                </div>
                                <ul className="service-list">
                                    {cat.services.map((s, j) => (
                                        <li key={j} onClick={() => handleBookClick(s)} className="service-item">
                                            <span>{t.service_names[s] || s}</span>
                                            <button
                                                className="book-btn"
                                                onClick={(e) => { e.stopPropagation(); handleBookClick(s); }}
                                            >
                                                {t.book_now}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="card-footer">
                                    <a href="#">{t.view_all} {cat.title} {t.services_text} →</a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Big Action Bar */}
                    <div className="donation-banner animate-fade">
                        <div className="banner-content">
                            <h3>{t.support_dharma}</h3>
                            <p>{t.donation_box}</p>
                        </div>
                        <button className="gold-btn btn-lg" onClick={handleDonationClick}>{t.btn_donate}</button>
                    </div>
                </div>

                {/* Booking/Donation Modal */}
                {selectedService && (
                    <div className="modal-overlay" onClick={handleCloseModal}>
                        <div className="booking-modal animate-fade" onClick={e => e.stopPropagation()}>
                            <button className="close-modal" onClick={handleCloseModal}>&times;</button>

                            {showSuccess ? (
                                <div className="success-view animate-fade">
                                    <div className="success-icon">✓</div>
                                    <h2>{isDonation ? t.donate_success : t.book_confirmed}</h2>
                                    <p className="success-msg">
                                        {isDonation
                                            ? t.thank_donate.replace('{service}', selectedService)
                                            : t.res_success.replace('{service}', selectedService)
                                        }
                                    </p>
                                    <div className="success-details">
                                        <div className="detail-row">
                                            <span>{t.ref_id}:</span>
                                            <strong>#TTD-{Math.floor(100000 + Math.random() * 900000)}</strong>
                                        </div>
                                        <div className="detail-row">
                                            <span>{t.status}:</span>
                                            <strong className="status-confirm">{t.paid_confirm}</strong>
                                        </div>
                                    </div>
                                    <button className="maroon-btn w-full" onClick={handleCloseModal}>{t.close_window}</button>
                                </div>
                            ) : (
                                <>
                                    <div className="modal-header">
                                        <span className="subtitle">{isDonation ? t.contribution : t.booking_options}</span>
                                        <h2>{selectedService}</h2>
                                    </div>

                                    {isDonation ? (
                                        <div className="booking-form">
                                            <div className="form-group">
                                                <label>{t.donate_amt}</label>
                                                <input type="number" placeholder={t.enter_amt} defaultValue="1001" />
                                            </div>
                                            <div className="form-group">
                                                <label>{t.purpose}</label>
                                                <select>
                                                    {t.purposes.map((p, idx) => (
                                                        <option key={idx}>{p}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <button className="gold-btn w-full" onClick={handleFinalSubmit}>
                                                {t.proc_donate}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="booking-form">
                                            <div className="form-group">
                                                <label>{t.pref_date}</label>
                                                <input
                                                    type="date"
                                                    value={bookingDetails.date}
                                                    onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                                                />
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>{t.num_pilgrims}</label>
                                                    <select
                                                        value={bookingDetails.pilgrims}
                                                        onChange={(e) => setBookingDetails({ ...bookingDetails, pilgrims: e.target.value })}
                                                    >
                                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n} {n === 1 ? t.person : t.persons}</option>)}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label>{t.pref_slot}</label>
                                                    <select
                                                        value={bookingDetails.slot}
                                                        onChange={(e) => setBookingDetails({ ...bookingDetails, slot: e.target.value })}
                                                    >
                                                        <option value="Morning">{t.morning}</option>
                                                        <option value="Afternoon">{t.afternoon}</option>
                                                        <option value="Evening">{t.evening}</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="booking-summary">
                                                <div className="summary-item">
                                                    <span>{t.service}:</span>
                                                    <strong>{selectedService}</strong>
                                                </div>
                                                <div className="summary-item">
                                                    <span>{t.base_price}:</span>
                                                    <strong>₹300.00</strong>
                                                </div>
                                            </div>

                                            <button className="gold-btn w-full" onClick={handleFinalSubmit}>
                                                {t.proc_book}
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};


export default PilgrimHub;
