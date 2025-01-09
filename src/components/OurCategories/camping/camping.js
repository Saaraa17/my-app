import React, { useState, useEffect } from "react";
import "./camping.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../../Api/dataApi"; 
import { Link } from "react-router-dom"; 
import { useTranslation } from "react-i18next";

const Camping = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCamping = async () => {
      try {
        const result = await fetchData("Camping"); 
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
      <h2 className="Camping-title">{t("available_camping")}</h2>

      {loading && <p>{t("loading")}</p>}
      {error && <p style={{ color: "red" }}>{t("error_message")}: {error}</p>} 

      <div className="Camping-container">
        {data.length === 0 && !loading && <p>{t("no_equipment")}</p>}
        
        {data.map((camping) => (
          <div key={camping.id || camping._id} className="Camping-card">
            <Link to={`/product/${camping.id || camping._id}`}> 
              <img 
                src={
                  Array.isArray(camping.images) && camping.images.length > 0
                    ? camping.images[0]
                    : t("no_image")
                } 
                alt={camping.title || t("no_name")} 
                className="Camping-image" 
              />
            </Link>
            <div className="Camping-content">
              <h3 className="camping-name">{camping.title || t("no_name")}</h3>
              <p className="camping-description">{camping.description || t("no_description")}</p>
              <p className="camping-price">{t("price")}: {camping.price || t("no_price")}</p>
              <p className="camping-location">{t("location")}: {camping.location || t("no_location")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Camping;
