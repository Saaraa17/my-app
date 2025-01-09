import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Property.css";
import CategoriesNav from "../categoriesNav/categoriesNav";

const Property = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.example.com/Property");
      if (!response.ok) {
        throw new Error(t("fetch_failed"));
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Property">
      <CategoriesNav />
      <h2 className="Property-title">{t("available_property")}</h2>

      {loading && <p>{t("loading")}</p>}
      {error && <p style={{ color: "red" }}>{t("error_message", { message: error })}</p>}

      <div className="Property-container">
        {data.map((property) => (
          <div key={property.id || property._id} className="Property-card">
            <img
              src={
                Array.isArray(property.images) && property.images.length > 0
                  ? property.images[0]
                  : t("default_image")
              }
              alt={property.name || t("no_name")}
              className="Property-image"
            />
            <div className="Property-content">
              <h3 className="Property-name">{property.name || t("no_name")}</h3>
              <p className="Property-description">{property.description || t("no_description")}</p>
              <p className="Property-price">
                {t("price", { price: property.price || t("no_price") })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Property;
