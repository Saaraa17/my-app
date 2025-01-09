import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// استيراد الصور
import googlePlayIcon from "../assets/google-play-icon.png";
import appStoreIcon from "../assets/app-store-icon.png";
import facebookIcon from "../assets/facebook-icon.png";
import twitterIcon from "../assets/twitter-icon.png";
import instagramIcon from "../assets/instagram-icon.png";
import linkedinIcon from "../assets/linkedin-icon.png";
import kwaitLogo from "../assets/kwait-removebg 1.png";
import emailIcon from "../assets/email-icon.png";
import phoneIcon from "../assets/phone-icon.png";


const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      {/* الجزء الأيسر */}
      <div className="footer-left">
        <div className="footer-logo">
              <img src={kwaitLogo} alt="Logo" />
         </div>
             <div className="footer-text">
                 <p className="footer-description">{t('we_are_the_place')}</p>
                 <p className="footer-description">{t('download_kwait_markets')}</p>
             </div>        
        {/* تغيير النص و إضافة الأزرار */}
        <div className="download-buttons">
          <h2>{t('download_now')}</h2>
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
            <img src={googlePlayIcon} alt="Google Play" className="download-icon" />
          </a>
          <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
            <img src={appStoreIcon} alt="App Store" className="download-icon" />
          </a>
        </div>

        {/* النص Follow Us مع أيقونات السوشيال ميديا */}
        <div className="footer-follow-us">
          <span className="follow-us-text">{t('follow_us')}</span>
          <div className="social-icons">
            <a href="https://www.facebook.com/Kwtmarkets" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://www.kwtmarkets.com/" target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="Twitter" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/kwtmarkets/" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
            </a>
            <a href="https://www.kwtmarkets.com/" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      
      {/* الجهة الوسطية */}
      <div className="footer-center">
      <h3 className="categories-title">{t('our_categories')}</h3>
      <ul className="categories-list">
  <li><Link to="/property">{t('property')}</Link></li>
  <li><Link to="/animals">{t('animals')}</Link></li>
  <li><Link to="/electronics">{t('electronics')}</Link></li>
  <li><Link to="/services">{t('services')}</Link></li>
  <li><Link to="/camping">{t('camping')}</Link></li>
  <li><Link to="/cars">{t('cars')}</Link></li>
  <li><Link to="/family">{t('family')}</Link></li>
  <li><Link to="/giftshop">{t('giftshop')}</Link></li>
</ul>
      </div>

        {/* الجهة اليمني  */}
      <div className="footer-right">
      <div className="footer-help-section">
  <p className="footer-help-text">{t('we_are_here_to_help')}</p>

  <div className="footer-contact">
    <div className="contact-item">
      <img src={emailIcon} alt="Email Icon" className="icon" />
      <div>
        <p className="contact-title">{t('email_support')}</p>
        <a href="mailto:admin@kwaitmarkets.com" className="contact-detail">
        admin@kwaitmarkets.com
        </a>
      </div>
    </div>

    <div className="contact-item">
      <img src={phoneIcon} alt="Phone Icon" className="icon" />
      <div>
        <p className="contact-title">{t('phone_support')}</p>
        <p className="contact-detail">0096590001916</p>
      </div>
    </div>
  </div>
</div>
      </div>
    </footer>
  );
};

export default Footer;
