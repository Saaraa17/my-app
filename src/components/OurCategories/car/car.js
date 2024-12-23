import React, { useState, useEffect } from "react";
import "./car.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../dataApi"; // استيراد الدالة من api.js

const Car = () => {
  const [filteredData, setFilteredData] = useState([]); // قائمة الفئات المفلترة
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData("Cars"); // استخدام الفئة "Cars"
        setFilteredData(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false);
      }
    };
    
    loadData(); 
  }, []);

  return (
    <div className="car">
      <CategoriesNav />
      <h2 className="car-title">Available Cars</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} 

      <div className="car-container">
        {filteredData.map((car) => (
          <div key={car.id} className="car-card">
            <img src={car.images} alt={car.name} className="car-image" />
            <div className="car-content">
              <h3 className="car-name">{car.title}</h3>
              <p className="car-description">{car.description}</p>
              <p className="car-price">Price: {car.price}</p>
              <p className="car-location">Location: {car.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Car;
