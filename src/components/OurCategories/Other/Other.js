import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Other.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { Link } from "react-router-dom";

const Other = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.example.com/Other");
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
    <div className="Other">
      <CategoriesNav />
      <h2 className="Other-title">{t("available_other")}</h2>

      {loading && <p>{t("loading")}</p>}
      {error && <p style={{ color: "red" }}>{t("error_message", { message: error })}</p>}

      <div className="Other-container">
        {data.map((other) => (
          <div key={other.id || other._id} className="Other-card">
            <Link to={`/other/${other.id || other._id}`}>
              <img
                src={
                  Array.isArray(other.images) && other.images.length > 0
                    ? other.images[0]
                    : t("default_image")
                }
                alt={other.name || t("no_name")}
                className="Other-image"
              />
            </Link>
            <div className="Other-content">
              <h3 className="Other-name">{other.name || t("no_name")}</h3>
              <p className="Other-description">{other.description || t("no_description")}</p>
              <p className="Other-price">{t("price", { price: other.price || t("no_price") })}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Other;
