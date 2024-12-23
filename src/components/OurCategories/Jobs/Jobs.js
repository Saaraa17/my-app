import React, { useState, useEffect } from "react";
import "./Jobs.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { useProductModal } from '../../ProductModalManager/ProductModal'; 

const Jobs = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const { ProductModal, openModal } = useProductModal();

 
  const fetchData = async () => {
    try {
      const response = await fetch("https://api.example.com/Jobs"); 
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
    <div className="Jobs">
      <CategoriesNav/>
      <h2 className="Jobs-title">Available Jobs</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} 

      <div className="Jobs-container">
        {data.map((jobs) => (
          <div key={jobs.id} className="Jobs-card">
            <img src={jobs.image} alt={jobs.name} className="Jobs-image" onClick={() => openModal(jobs)}/>
            <div className="Jobs-content">
              <h3 className="Jobs-name">{jobs.name}</h3>
              <p className="Jobs-description">{jobs.description}</p>
              <p className="Jobs-price">Price: {jobs.price}</p>
            </div>
          </div>
        ))}
      </div>
      <ProductModal />
    </div>
  );
};

export default Jobs;
