import './home.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from './HeroSection/heroSection';
import CategoriesSection from './CategoriesSection/categoriesSection';
import RecommendedSection from './RecommendedSection/recommendedSection';
import FurnitureSection from './FurnitureSection/furnitureSection';
import AnimalsSection from './AnimalsSection/AnimalsSection';
import Ads from '../Home/Ads/Ads';

const App = () => {
  const products = [
    {
      _id: '1',
      name: 'Product 1',
      description: 'Description for product 1',
      price: 100,
      image: 'path/to/image1.jpg',
    },
    {
      _id: '2',
      name: 'Product 2',
      description: 'Description for product 2',
      price: 150,
      image: 'path/to/image2.jpg',
    },
    {
      _id: '3',
      name: 'Product 3',
      description: 'Description for product 3',
      price: 200,
      image: 'path/to/image3.jpg',
    },
  ];
  
  const navigate = useNavigate();

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
