import React from 'react';
import iphonphoto from "../assets/iPhone 15.png";
import googlePlayIcon from "../assets/google-play-icon.png";
import appStoreIcon from "../assets/app-store-icon.png";
import './dawnlodApp.css';

const App = () => {
  return (
    <div className="app-section">
      <div className="app-image">
        <img src={iphonphoto} alt="App" />
      </div>
      <div className="app-content">
        <h2>Shop Anywhere, Anytime! Download Our Mobile App Today</h2>
        <p>Discover a seamless shopping experience on the go with our mobile app. Get exclusive deals, faster checkout, and more.</p>
        <p>
        Download now and enjoy:
        <ui>
          <li>
          Instant Notifications: Be the first to know about our latest offers and promotions.
          </li>
          <li>
          Easy Browsing: Explore our products effortlessly with a user-friendly interface.
          </li>
        </ui>
        </p>



        <div className="download-buttons">
          <h2>Dawnlod Now:</h2>
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
