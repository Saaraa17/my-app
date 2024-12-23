import React, { useState, useEffect } from "react";
import "./camping.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../dataApi"; 

const Camping = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  // جلب البيانات حسب فئة Camping
  useEffect(() => {
    const fetchCamping = async () => {
      try {
        const result = await fetchData('Camping'); // تصفية البيانات حسب فئة Camping
        setData(result); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchCamping();
  }, []);

  return (
    <div className="Camping">
      <CategoriesNav />
      <h2 className="Camping-title">Available Camping</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} 

      <div className="Camping-container">
        {data.map((camping) => (
          <div key={camping.id} className="Camping-card">
            <img src={camping.images} alt={camping.name} className="Camping-image" />
            <div className="Camping-content">
              <h3 className="camping-name">{camping.title}</h3>
              <p className="camping-description">{camping.description}</p>
              <p className="camping-price">Price: {camping.price}</p>
              <p className="camping-location">Location: {camping.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Camping;
