import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

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
  return (
    <footer className="footer">
      {/* الجزء الأيسر */}
      <div className="footer-left">
        <div className="footer-logo">
              <img src={kwaitLogo} alt="Logo" />
         </div>
             <div className="footer-text">
                 <p className="footer-description"> We are the place where you can sell, buy, and rent anything.</p>
                 <p className="footer-description">Download Kwait Markets on Android or iOS and enjoy your experience now. </p>
             </div>        
        {/* تغيير النص و إضافة الأزرار */}
        <div className="download-buttons">
          <h2>Dawnlod Now:</h2>
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
            <img src={googlePlayIcon} alt="Google Play" className="download-icon" />
          </a>
          <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
            <img src={appStoreIcon} alt="App Store" className="download-icon" />
          </a>
        </div>

        {/* النص Follow Us مع أيقونات السوشيال ميديا */}
        <div className="footer-follow-us">
          <span className="follow-us-text">Follow Us:</span>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="Twitter" className="social-icon" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      
      {/* الجهة الوسطية */}
      <div className="footer-center">
      <h3 className="categories-title">Our Categories</h3>
        <ul className="categories-list">
        <li><Link to="/property">Property</Link></li>
        <li><Link to="/animals">Animals</Link></li>
        <li><Link to="/electronics">Electronics</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/camping">Camping</Link></li>
        <li><Link to="/cars">Cars</Link></li>
        <li><Link to="/family">Family</Link></li>
        <li><Link to="/giftshop">GiftShop</Link></li>
        </ul>
      </div>

        {/* الجهة اليمني  */}
      <div className="footer-right">
      <div className="footer-help-section">
  <p className="footer-help-text">We Are here always to help you</p>

  <div className="footer-contact">
    <div className="contact-item">
      <img src={emailIcon} alt="Email Icon" className="icon" />
      <div>
        <p className="contact-title">Email Support:</p>
        <a href="mailto:Kwaitmarkets@support.com" className="contact-detail">
          Kwaitmarkets@support.com
        </a>
      </div>
    </div>

    <div className="contact-item">
      <img src={phoneIcon} alt="Phone Icon" className="icon" />
      <div>
        <p className="contact-title">Phone Support:</p>
        <p className="contact-detail">1197854</p>
      </div>
    </div>
  </div>
</div>



      </div>
    </footer>
  );
};

export default Footer;
