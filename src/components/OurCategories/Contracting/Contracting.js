import React, { useState, useEffect } from "react";
import "./Contracting.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../dataApi"; 

const Contracting = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  // جلب البيانات حسب فئة Contracting
  useEffect(() => {
    const fetchContracting = async () => {
      try {
        const result = await fetchData('Contracting'); // تصفية البيانات حسب فئة Contracting
        setData(result); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchContracting();
  }, []);

  return (
    <div className="Contracting">
      <CategoriesNav />
      <h2 className="Contracting-title">Available Contracting</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} 

      <div className="Contracting-container">
        {data.map((contracting) => (
          <div key={contracting.id} className="Contracting-card">
            <img src={contracting.images} alt={contracting.name} className="Contracting-image" />
            <div className="Contracting-content">
              <h3 className="contracting-name">{contracting.title}</h3>
              <h3 className="Contracting-name">{contracting.name}</h3>
              <p className="Contracting-description">{contracting.description}</p>
              <p className="Contracting-price">Price: {contracting.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contracting;
