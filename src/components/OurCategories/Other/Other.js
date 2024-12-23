import React, { useState, useEffect } from "react";
import "./Other.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { useProductModal } from '../../ProductModalManager/ProductModal'; 

const Other = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const { ProductModal, openModal } = useProductModal();

 
  const fetchData = async () => {
    try {
      const response = await fetch("https://api.example.com/Other"); 
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result); 
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  return (
    <div className="Other">
      <CategoriesNav/>
      <h2 className="Other-title">Available Other</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} 

      <div className="Other-container">
        {data.map((other) => (
          <div key={other.id} className="Other-card">
            <img src={other.image} alt={other.name} className="Other-image" onClick={() => openModal(other)} />
            <div className="Other-content">
              <h3 className="Other-name">{other.name}</h3>
              <p className="Other-description">{other.description}</p>
              <p className="Other-price">Price: {other.price}</p>
            </div>
          </div>
        ))}
      </div>
      <ProductModal />
    </div>
  );
};

export default Other;
