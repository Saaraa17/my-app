import React, { useState, useEffect } from 'react';
import './furnitureSection.css';
import { fetchData } from '../../Api/dataApi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FurnitureSection = () => {
  const { t } = useTranslation();
  const [Furnitures, setFurnitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const result = await fetchData('Furniture');
        setFurnitures(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFurniture();
  }, []);

  return (
    <div className="Furniture-section">
      <h2>{t('all_in_furniture')}</h2>
      <div className="section-header">
        <Link to="/Furniture" className="see-more">{t('see_more')} {'>'}</Link>
      </div>
      <div className="Furniture-grid">
        {loading && <p>{t('Loading...')}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {Furnitures.map((Furniture) => (
          <div
            className="Furniture-card"
            key={Furniture._id || Furniture.id}
          >
            <Link to={`/product/${Furniture._id || Furniture.id}`}>
              <img
                src={
                  Array.isArray(Furniture.images) && Furniture.images.length > 0
                    ? Furniture.images[0]
                    : 'default-image-url.jpg'
                }
                alt={Furniture.title || t('No Name')}
                className="Furniture-image"
              />
              <div className="Furniture-details">
                <h3>{Furniture.title || t('No Name')}</h3>
                <p className="Furniture-description">{Furniture.description || t('No Description')}</p>
                <p className="Furniture-price">{t('Price')}: {Furniture.price || t('No Price')}</p>
                <p className="Furniture-location">{t('Location')}: {Furniture.location || t('No Location')}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FurnitureSection;
