import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PilgrimHub from './components/PilgrimHub'
import AboutTemple from './components/AboutTemple'
import Festivals from './components/Festivals'
import SacredSpots from './components/SacredSpots'
import MediaGallery from './components/MediaGallery'
import PujasAndTimings from './components/PujasAndTimings'
import TempleLocation from './components/TempleLocation'
import Footer from './components/Footer'
import TempleChatbot from './components/TempleChatbot'
import { translations } from './translations'
import './App.css'

function App() {
  const [lang, setLang] = useState('EN');
  const t = translations[lang];

  return (
    <div className="app-wrapper">
      <header className="frozen-header">
        {/* Top Heritage Bar */}
        <div className="top-bar-gold">
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <div>{t.welcome}</div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <span onClick={() => setLang('HI')} style={{ cursor: 'pointer', color: lang === 'HI' ? 'white' : 'var(--secondary)' }}>हिन्दी</span>
              <span onClick={() => setLang('TE')} style={{ cursor: 'pointer', color: lang === 'TE' ? 'white' : 'var(--secondary)' }}>తెలుగు</span>
              <span onClick={() => setLang('EN')} style={{ cursor: 'pointer', color: lang === 'EN' ? 'white' : 'var(--secondary)' }}>ENGLISH</span>
            </div>
          </div>
        </div>

        {/* Scroling Highlights Ticker */}
        <div className="temple-ticker-container">
          <div className="ticker-label">
            {t.highlights}
          </div>
          <div className="ticker-track">
            <div className="ticker-content">
              <span className="ticker-item"><i className="symbol">☸</i> {t.h1}</span>
              <span className="ticker-item"><i className="symbol">☸</i> {t.h2}</span>
              <span className="ticker-item"><i className="symbol">☸</i> {t.h3}</span>
              <span className="ticker-item"><i className="symbol">☸</i> {t.h4}</span>
              <span className="ticker-item"><i className="symbol">☸</i> {t.h5}</span>
              {/* Duplicate for seamless scroll */}
              <span className="ticker-item"><i className="symbol">☸</i> {t.h1}</span>
              <span className="ticker-item"><i className="symbol">☸</i> {t.h2}</span>
            </div>
          </div>
        </div>

        <Navbar lang={lang} />
      </header>

      <main>
        <Hero lang={lang} />

        {/* The Big Temple Layout Flow */}
        <PilgrimHub lang={lang} />

        <div className="parallax-ornament" style={{ height: '20px', background: 'var(--bg-cream)', position: 'relative' }}>
          <div className="ornamental-border"></div>
        </div>

        <div className="container">
          <AboutTemple lang={lang} />
          <Festivals lang={lang} />
          <SacredSpots lang={lang} />
          <MediaGallery lang={lang} />
          <PujasAndTimings lang={lang} />
          <TempleLocation lang={lang} />
        </div>
      </main>

      <Footer lang={lang} />
      <TempleChatbot lang={lang} />
    </div>
  )
}

export default App
