import React, { useState, useEffect } from "react";
import "./Property.css";
import CategoriesNav from "../categoriesNav/categoriesNav";

const Property = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

 
  const fetchData = async () => {
    try {
      const response = await fetch("https://api.example.com/Property"); 
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
    <div className="Property">
      <CategoriesNav/>
      <h2 className="Property-title">Available Property</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} 

      <div className="Property-container">
        {data.map((property) => (
          <div key={property.id} className="Property-card">
            <img src={property.image} alt={property.name} className="Property-image" />
            <div className="Property-content">
              <h3 className="Property-name">{property.name}</h3>
              <p className="Property-description">{property.description}</p>
              <p className="Property-price">Price: {property.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Property;
