import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './heroSection.css';
import image from '../../assets/Rectangle 3.png';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: image,
      title: 'Welcome to Your Creative Space',
      description: 'This is where your ideas come to life—upload any item you need and start creating now!',
    },
    {
      src: image,
      title: 'Your Uploads, Your Way',
      description: 'Easily upload and organize your items in just a few clicks—it’s fast, simple, and all yours.',
    },
    {
      src: image,
      title: 'Start Adding Your Items Now',
      description: 'Upload anything you want and have it ready whenever you need—it’s that easy!',
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
          {/* Modified button to a link */}
          <Link to="/PlaceItem" className="explore-btn">Place Item</Link>
        </div>
      </div>
      <button onClick={nextImage} className="next-arrow">{`>`}</button>
    </div>
  );
};

export default HeroSection;
