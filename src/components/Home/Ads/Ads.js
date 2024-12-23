import React from 'react';
import onlinepayment from '../../assets/online-payment.png';
import './Ads.css';

const Ads = () => {
  return (
    <div className="ads-section">
      <div className="ads-image">
        <img src={onlinepayment} alt="onlinepayment" />
      </div>
      <div className="ads-content">
        <h2>Post Your Ads in Kwait Markets Easily</h2>
        <p>Your best deal is just a click away, so buy, sell, and rent on the go with Kwait Markets.</p>
        <button className="ads-button">Let’s Start</button>
      </div>
    </div>
  );
};

export default Ads;
