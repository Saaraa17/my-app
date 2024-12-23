import React, { useState, useEffect } from "react";
import "./Furniture.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../dataApi"; 
import { useProductModal } from '../../ProductModalManager/ProductModal'; 

const Furniture = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const { ProductModal, openModal } = useProductModal();

  // جلب البيانات حسب فئة Furniture
  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const result = await fetchData('Furniture'); // تصفية البيانات حسب فئة Furniture
        setData(result); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchFurniture();
  }, []);

  return (
    <div className="Furniture">
      <CategoriesNav />
      <h2 className="Furniture-title">Available Furniture</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} 

      <div className="Furniture-container">
        {data.map((furniture) => (
          <div key={furniture.id} className="Furniture-card">
             <img
              src={furniture.images} 
              alt={furniture.name}
               className="Furniture-image" 
               onClick={() => openModal(furniture)}
               />
            <div className="Furniture-content">
              <h3 className="Furniture-name">{furniture.title}</h3>
              <p className="Furniture-description">{furniture.description}</p>
              <p className="Furniture-price">Price: {furniture.price}</p>
              <p className="Furniture-location">Location: {furniture.location}</p>
            </div>
          </div>
        ))}
      </div>
      <ProductModal /> 
    </div>
  );
};

export default Furniture;
