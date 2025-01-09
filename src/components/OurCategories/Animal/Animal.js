import React, { useState, useEffect } from "react";
import "./Animal.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../../Api/dataApi"; 
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Animal = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const result = await fetchData("Animals"); 
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
      <h2 className="Animal-title">{t("available_animals")}</h2>

      {loading && <p>{t("loading")}</p>}
      {error && <p style={{ color: "red" }}>{t("error_message")}: {error}</p>} 

      <div className="Animal-container">
        {data.map((animal) => (
          <div key={animal.id || animal._id} className="Animal-card">
            <Link to={`/product/${animal.id || animal._id}`}>
              <img 
                src={
                  Array.isArray(animal.images) && animal.images.length > 0
                    ? animal.images[0]
                    : t("no_image")
                } 
                alt={animal.title || t("no_name")} 
                className="Animal-image" 
              />
            </Link>
            <div className="Animal-content">
              <h3 className="animal-name">{animal.title || t("no_name")}</h3>
              <p className="animal-description">{animal.description || t("no_description")}</p>
              <p className="animal-price">{t("price")}: {animal.price || t("no_price")}</p>
              <p className="animal-location">{t("location")}: {animal.location || t("no_location")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Animal;
