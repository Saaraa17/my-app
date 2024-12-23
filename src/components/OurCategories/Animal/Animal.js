import React, { useState, useEffect } from "react";
import "./Animal.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../dataApi"; 
const Animal = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  // جلب البيانات عند تحميل الكومبوننت
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const result = await fetchData('Animals'); // تصفية البيانات حسب فئة Animals
        setData(result); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchAnimals();
  }, []);

  return (
    <div className="Animal">
      <CategoriesNav />
      <h2 className="Animal-title">Available Animals</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} 

      <div className="Animal-container">
        {data.map((animal) => (
          <div key={animal.id} className="Animal-Animald">
            <img src={animal.images} alt={animal.name} className="Animal-image" />
            <div className="Animal-content">
              <h3 className="animal-name">{animal.title}</h3>
              <p className="animal-description">{animal.description}</p>
              <p className="animal-price">Price: {animal.price}</p>
              <p className="animal-location">Location: {animal.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Animal;
