import React, { useEffect, useState } from 'react';
import { useProductModal } from '../../ProductModalManager/ProductModal';
import './animalsSection.css';
import { fetchData } from '../../OurCategories/dataApi';
import { Link } from 'react-router-dom';

const AnimalsSection = () => {
  const [Animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ProductModal, openModal } = useProductModal(); // استدعاء الـModal

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const result = await fetchData('Animals'); // Fetch Animals data
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
        <h2>All in Animal</h2>
        <div className="section-header">
          <Link to="/Animal" className="see-more">See More {'>'}</Link>
        </div>
        <div className="Animal-grid">
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {Animals.map((Animal) => (
            <div
              className="Animal-card"
              key={Animal.id}
              onClick={() => openModal(Animal)} // فتح الـModal عند الضغط
            >
              <img src={Animal.images} alt={Animal.title} className="Animal-image" />
              <div className="Animal-details">
                <h3>{Animal.title}</h3>
                <p className="Animal-description">{Animal.description}</p>
                <p className="Animal-price">Price: {Animal.price}</p>
                <p className="Animal-location">Location: {Animal.location}</p>
              </div>
            </div>
          ))}
        </div>

      {/* عرض الـModal */}
      <ProductModal />
    </div>
  );
};

export default AnimalsSection;
