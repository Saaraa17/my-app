import React, { useState, useEffect } from "react";
import "./Family.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../dataApi"; 
import { useProductModal } from '../../ProductModalManager/ProductModal';

const Family = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const { ProductModal, openModal } = useProductModal();

  // جلب البيانات حسب فئة Family
  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const result = await fetchData('Family'); // تصفية البيانات حسب فئة Family
        setData(result); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchFamily();
  }, []);

  return (
    <div className="Family">
      <CategoriesNav />
      <h2 className="Family-title">Available Family</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} 

      <div className="Family-container">
        {data.map((family) => (
          <div key={family.id} className="Family-card">
             <img 
              src={family.images} 
              alt={family.name} 
              className="Family-image" 
              onClick={() => openModal(family)} 
              />
            <div className="Family-content">
              <h3 className="Family-name">{family.title}</h3>
              <p className="Family-description">{family.description}</p>
              <p className="Family-price">Price: {family.price}</p>
              <p className="Family-location">Location: {family.location}</p>
            </div>
          </div>
        ))}
      </div>
      <ProductModal />
    </div>
  );
};

export default Family;
