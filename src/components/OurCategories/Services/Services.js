import React, { useState, useEffect } from "react";
import "./Services.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../dataApi"; 

const Services = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  // جلب البيانات حسب فئة Services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await fetchData('Services'); // تصفية البيانات حسب فئة Services
        setData(result); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="Services">
      <CategoriesNav />
      <h2 className="Services-title">Available Services</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} 

      <div className="Services-container">
        {data.map((services) => (
          <div key={services.id} className="Services-card">
            <img src={services.images} alt={services.name} className="Services-image" />
            <div className="Services-content">
              <h3 className="Services-name">{services.title}</h3>
              <p className="Services-description">{services.description}</p>
              <p className="Services-price">Price: {services.price}</p>
              <p className="Services-location">Location: {services.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
