import React, { useState, useEffect } from 'react';
import { useProductModal } from '../../ProductModalManager/ProductModal'; // استدعاء الـModal
import './furnitureSection.css';
import { fetchData } from '../../OurCategories/dataApi';
import { Link } from 'react-router-dom';


const FurnitureSection = () => {
  const [Furnitures, setFurnitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { ProductModal, openModal } = useProductModal(); // استخدام الـModal

  // جلب بيانات الأثاث
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
      <h2>All in Furniture</h2>
      <div className="section-header">
        <Link to="/Furniture" className="see-more">See More {'>'}</Link>
      </div>
      <div className="Furniture-grid">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {Furnitures.map((Furniture) => (
          <div
            className="Furniture-card"
            key={Furniture.id}
            onClick={() => openModal(Furniture)} // فتح الـModal عند الضغط
          >
            <img src={Furniture.images} alt={Furniture.title} className="Furniture-image" />
            <div className="Furniture-details">
              <h3>{Furniture.title}</h3>
              <p className="Furniture-description">{Furniture.description}</p>
              <p className="Furniture-price">Price: {Furniture.price}</p>
              <p className="Furniture-location">Location: {Furniture.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* عرض الـModal */}
      <ProductModal />
    </div>
  );
};

export default FurnitureSection;
