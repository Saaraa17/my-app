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
        const data = await fetchData('Animals'); // Fetch Animals data
        setAnimals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <div className="animals-section">
      <h2>All in Animals</h2>
      <div className="Animal-grid">
        {Animals.length === 0 ? (
          <p>Loading...</p>
        ) : (
          Animals.map((Animal) => (
            <div
              className="Animal-card"
              key={Animal.id}
              onClick={() => openModal(Animal)} // فتح الـModal عند الضغط
            >
              <img src={Animal.images} alt={Animal.title} className="Animal-image" />
              <div className="Animal-details">
                <h3>{Animal.title}</h3>
                <p>{Animal.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* عرض الـModal */}
      <ProductModal />
    </div>
  );
};

export default AnimalsSection;
