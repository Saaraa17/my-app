import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useProductModal } from '../../ProductModalManager/ProductModal'; // استخدام الـModal
import './recommendedSection.css';

const RecommendedProducts = () => {
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const { ProductModal, openModal } = useProductModal(); // استدعاء وإدارة الـModal

  // دالة لجلب البيانات
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://demo.kwtmarkets.com/items');
      const categories = await response.json();
      setDisplayedCategories(getRandomCategories(categories, 3)); // عرض 3 فقط
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []); // تعريف ثابت لـ fetchData لتجنب إعادة الإنشاء

  const getRandomCategories = (data, count) => {
    const shuffled = [...data].sort(() => Math.random() - 0.5); // ترتيب عشوائي
    return shuffled.slice(0, count); // أخذ أول 3 فئات
  };

  useEffect(() => {
    fetchData(); // استدعاء دالة fetchData
  }, [fetchData]); // إدراج fetchData كتبعيات لـ useEffect

  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <div className="section-header">
        <Link to="/recommended-products" className="see-more">See More {'>'}</Link>
      </div>
      <div className="product-grid">
        {displayedCategories.map((category) => (
          <div
            className="product-card"
            key={category.id}
            onClick={() => openModal(category)} // فتح الـModal عند الضغط
          >
            <img
              src={category.images || 'default-image-url.jpg'}
              alt={category.title || 'Product'}
              className="product-image"
            />
            <div className="product-details">
              <h3>{category.title || 'No Name'}</h3>
              <p>{category.description || 'No Description'}</p>
              <p>Price: {category.price || 'No Price'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* عرض الـModal */}
      <ProductModal />
    </div>
  );
};

export default RecommendedProducts;
