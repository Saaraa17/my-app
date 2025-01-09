import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './heroSection.css';
import image from '../../assets/Rectangle 3.png';
import { useSelector } from 'react-redux';  
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);  
  
  const images = [
    {
      src: image,
      title: t('welcome_title'),
      description: t('welcome_description'),
    },
    {
      src: image,
      title: t('your_uploads_title'),
      description: t('your_uploads_description'),
    },
    {
      src: image,
      title: t('start_adding_title'),
      description: t('start_adding_description'),
    }
  ];

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="hero-section">
      <button onClick={prevImage} className="prev-arrow">{`<`}</button>
      <div className="hero-image">
        <img src={images[currentIndex].src} alt="Real Estate" className="image" />
        <div className="hero-text">
          <h1>{images[currentIndex].title}</h1>
          <p>{images[currentIndex].description}</p>
          {/* عرض رابط Place Item فقط إذا كان المستخدم مسجلاً دخوله */}
          {isLoggedIn && (
            <Link to="/PlaceItem" className="explore-btn">{t('place_item')}</Link>
          )}
        </div>
      </div>
      <button onClick={nextImage} className="next-arrow">{`>`}</button>
    </div>
  );
};

export default HeroSection;
