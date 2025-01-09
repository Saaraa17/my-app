import React from 'react';
import { useTranslation } from 'react-i18next'; 
import iphonphoto from "../assets/iPhone 15.png";
import googlePlayIcon from "../assets/google-play-icon.png";
import appStoreIcon from "../assets/app-store-icon.png";
import './dawnlodApp.css';



const App = () => {
  const { t } = useTranslation(); 
  
  return (
    <div className="app-section">
      <div className="app-image">
        <img src={iphonphoto} alt="App" />
      </div>
      <div className="app-content">
        <h2>{t('app_heading')}</h2> {/* ترجمة العنوان */}
        <p>{t('app_description')}</p> {/* ترجمة الوصف */}
        <p>{t('download_now')}</p> {/* ترجمة "Download now and enjoy" */}
        <ul>
          <li>
            <p>{t('instant_notifications')}</p> {/* ترجمة "Instant Notifications" */}
          </li>
          <li>
            <p>{t('easy_browsing')}</p> {/* ترجمة "Easy Browsing" */}
          </li>
        </ul>

        <div className="download-buttons">
          <h2>{t('download_now_button')}</h2> {/* ترجمة "Download Now:" */}
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
            <img src={googlePlayIcon} alt="Google Play" className="download-icon" />
          </a>
          <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
            <img src={appStoreIcon} alt="App Store" className="download-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
