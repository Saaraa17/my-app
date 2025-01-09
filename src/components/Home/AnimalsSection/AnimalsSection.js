import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './animalsSection.css';
import { fetchData } from '../../Api/dataApi';
import { useTranslation } from 'react-i18next';

const AnimalsSection = () => {
  const { t } = useTranslation();
  const [Animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const result = await fetchData('Animals');
        setAnimals(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <div className="Animal-section">
      <h2>{t('All in Animal')}</h2>
      <div className="section-header">
        <Link to="/Animal" className="see-more">{t('See More')} {'>'}</Link>
      </div>
      <div className="Animal-grid">
        {loading && <p>{t('Loading...')}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {Animals.map((Animal) => (
          <div
            className="Animal-card"
            key={Animal.id || Animal._id}
          >
            <Link to={`/product/${Animal.id || Animal._id}`}>
              <img
                src={
                  Array.isArray(Animal.images) && Animal.images.length > 0
                    ? Animal.images[0]
                    : 'default-image-url.jpg'
                }
                alt={Animal.title || t('No Name')}
                className="Animal-image"
              />
              <div className="Animal-details">
                <h3>{Animal.title || t('No Name')}</h3>
                <p className="Animal-description">{Animal.description || t('No Description')}</p>
                <p className="Animal-price">{t('Price')}: {Animal.price || t('No Price')}</p>
                <p className="Animal-location">{t('Location')}: {Animal.location || t('No Location')}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalsSection;
