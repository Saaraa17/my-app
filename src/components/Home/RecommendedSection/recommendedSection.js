import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './recommendedSection.css';

const RecommendedProducts = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [allCategories, setAllCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://demo.kwtmarkets.com/items');
      const categories = await response.json();
      setAllCategories(categories); 
      setDisplayedCategories(getRandomCategories(categories, 3)); // عرض 3 فقط
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getRandomCategories = (data, count) => {
    const shuffled = [...data].sort(() => Math.random() - 0.5); // ترتيب عشوائي
    return shuffled.slice(0, count); // أخذ أول 3 فئات
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="recommended-products">
      <h2> Recommended Products</h2>
      <div className="section-header">
        {/* Link إلى صفحة جديدة لعرض المزيد */}
        <Link to="/recommended-products" className="see-more">See More {'>'}</Link>
      </div>
      <div className="product-grid">
        {displayedCategories.map((category) => (
          <div className="product-card" key={category.id}>
            <img 
              src={category.images || 'default-image-url.jpg'} 
              alt={category.title || 'Product'} 
              className="product-image" 
            />
            <div className="product-details">
              <h3>{category.title || 'No Name'}</h3>
              <p>{category.description || 'No Description'}</p>
              <p>{category.price || 'No Price'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
