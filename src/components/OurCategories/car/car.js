import React, { useState, useEffect } from "react";
import "./car.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../../Api/dataApi"; 
import { Link } from "react-router-dom"; 
import { useTranslation } from "react-i18next";

const Car = () => {
  const { t } = useTranslation();  
  const [filteredData, setFilteredData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData("Cars"); 
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
      <h2 className="car-title">{t("available_cars")}</h2>

      {loading && <p>{t("loading")}</p>}
      {error && <p style={{ color: "red" }}>{t("error_message")}: {error}</p>}

      <div className="car-container">
        {filteredData.map((car) => (
          <div key={car.id || car._id} className="car-card">
            <Link to={`/product/${car.id || car._id}`}>
              <img
                src={
                  Array.isArray(car.images) && car.images.length > 0
                    ? car.images[0]
                    : t("no_image")
                }
                alt={car.title || t("no_name")}
                className="car-image"
              />
            </Link>
            <div className="car-content">
              <h3 className="car-name">{car.title || t("no_name")}</h3>
              <p className="car-description">{car.description || t("no_description")}</p>
              <p className="car-price">{t("price")}: {car.price || t("no_price")}</p>
              <p className="car-location">{t("location")}: {car.location || t("no_location")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Car;
