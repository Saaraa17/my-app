import './home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeroSection from './HeroSection/heroSection';
import CategoriesSection from './CategoriesSection/categoriesSection';
import RecommendedSection from './RecommendedSection/recommendedSection';
import FurnitureSection from './FurnitureSection/furnitureSection';
import AnimalsSection from './AnimalsSection/AnimalsSection';
import Ads from '../Home/Ads/Ads';

const App = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // تخزين الأخطاء
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://rnkoo-154-128-123-67.a.free.pinggy.link/items')
      .then(response => {
        console.log("API Response:", response.data); // تحقق من البيانات هنا
        setProducts(response.data);
        setError(null); // إعادة تعيين الأخطاء
      })
      .catch(error => {
        console.error("Error fetching products:", error.response || error.message || error);
        setError("Failed to load products.");
      });
  }, []);

  const handleProductClick = (productId) => {
    const selectedProduct = products.find((p) => p._id === productId);
    navigate(`/product/${productId}`, { state: { product: selectedProduct } });
  };

  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <RecommendedSection 
        products={products} 
        error={error} 
        handleProductClick={handleProductClick} 
      />
      <FurnitureSection 
        products={products} 
        handleProductClick={handleProductClick} 
      />
      <AnimalsSection 
        products={products} 
        handleProductClick={handleProductClick} 
      />
      <Ads />
    </div>
  );
};

export default App;
