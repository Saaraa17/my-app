import React, { useState, useEffect } from "react";
import "./Gifts.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../dataApi"; 
import { useProductModal } from '../../ProductModalManager/ProductModal'; 

const Gifts = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const { ProductModal, openModal } = useProductModal();

  // جلب البيانات حسب فئة Gifts
  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const result = await fetchData('Gifts'); // تصفية البيانات حسب فئة Gifts
        setData(result); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchGifts();
  }, []);

  return (
    <div className="Gifts">
      <CategoriesNav />
      <h2 className="Gifts-title">Available Gifts</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} 

      <div className="Gifts-container">
        {data.map((gifts) => (
          <div key={gifts.id} className="Gifts-card">
            <img  
             src={gifts.images} 
             alt={gifts.name}
             className="Gifts-image" 
             onClick={() => openModal(gifts)}
             />
            <div className="Gifts-content">
              <h3 className="Gifts-name">{gifts.title}</h3>
              <p className="Gifts-description">{gifts.description}</p>
              <p className="Gifts-price">Price: {gifts.price}</p>
              <p className="Gifts-location">Location: {gifts.location}</p>
            </div>
          </div>
        ))}
      </div>
      <ProductModal /> 
    </div>
  );
};

export default Gifts;
