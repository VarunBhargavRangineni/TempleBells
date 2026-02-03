import { translations } from '../translations';
import './Footer.css';

function Footer({ lang }) {
  const t = translations[lang || 'EN'];

  return (
    <>
      <footer className="mega-footer">
        <div className="footer-ornament"></div>

        <div className="container">
          <div className="footer-main-grid">
            <div className="footer-col-about">
              <div className="footer-logo-grand">
                <div className="temple-logo-purple footer-logo-box">
                  <span className="om-symbol footer-om-symbol">🕉</span>
                </div>
                <div>
                  <h2 className="gold-gradient-text footer-brand-title">Temple Bells</h2>
                  <p className="footer-brand-tagline">{t.brand_tagline}</p>
                </div>
              </div>
              <p className="footer-desc">{t.footer_desc}</p>
              <div className="social-box">
                <a href="#" className="social-icon">FB</a>
                <a href="#" className="social-icon">YT</a>
                <a href="#" className="social-icon">TW</a>
                <a href="#" className="social-icon">IG</a>
              </div>
            </div>

            <div className="footer-col">
              <h4>{t.pilgrim_services}</h4>
              <ul>
                <li><a href="#">{t.footer_links.p1}</a></li>
                <li><a href="#">{t.footer_links.p2}</a></li>
                <li><a href="#">{t.footer_links.p3}</a></li>
                <li><a href="#">{t.footer_links.p4}</a></li>
                <li><a href="#">{t.footer_links.p5}</a></li>
                <li><a href="#">{t.footer_links.p6}</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>{t.the_devasthanam}</h4>
              <ul>
                <li><a href="#">{t.footer_links.d1}</a></li>
                <li><a href="#">{t.footer_links.d2}</a></li>
                <li><a href="#">{t.footer_links.d3}</a></li>
                <li><a href="#">{t.footer_links.d4}</a></li>
                <li><a href="#">{t.footer_links.d5}</a></li>
                <li><a href="#">{t.footer_links.d6}</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>{t.support_help}</h4>
              <ul>
                <li><a href="#">{t.footer_links.s1}</a></li>
                <li><a href="#">{t.footer_links.s2}</a></li>
                <li><a href="#">{t.footer_links.s3}</a></li>
                <li><a href="#">{t.footer_links.s4}</a></li>
                <li><a href="#">{t.footer_links.s5}</a></li>
                <li><a href="#">{t.footer_links.s6}</a></li>
              </ul>
            </div>
          </div>


          <div className="footer-copyright">
            <p>{t.footer_copyright}</p>
            <div className="tech-partner">
              {t.designed_by} <span className="gold-gradient-text partner-name">Visdomwaves</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};


export default Footer;
