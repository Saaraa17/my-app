import React from "react";
import { useTranslation } from "react-i18next";
import onlinepayment from "../../assets/online-payment.png";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'; 
import "./Ads.css";


const Ads = () => {
  const { t } = useTranslation();

  // التحقق من حالة تسجيل الدخول
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);  

  return (
    <div className="ads-section">
      <div className="ads-image">
        <img src={onlinepayment} alt="onlinepayment" />
      </div>
      <div className="ads-content">
        <h2>{t("post_ads_title")}</h2>
        <p>{t("post_ads_desc")}</p>
        {isLoggedIn ? (
          <Link to="/PlaceItem" className="ads-button">
            {t("start_button")}
          </Link>
        ) : (
          <p>{t("login_to_post_ads")}</p> 
        )}
      </div>
    </div>
  );
};

export default Ads;
