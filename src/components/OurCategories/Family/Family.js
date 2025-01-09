import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Family.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../../Api/dataApi";
import { Link } from "react-router-dom";

const Family = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const result = await fetchData("Family");
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFamily();
  }, []);

  return (
    <div className="Family">
      <CategoriesNav />
      <h2 className="Family-title">{t("available_family")}</h2>

      {loading && <p>{t("loading")}</p>}
      {error && <p style={{ color: "red" }}>{t("error_message", { message: error })}</p>}

      <div className="Family-container">
        {data.map((family) => (
          <div key={family.id || family._id} className="Family-card">
            <Link to={`/product/${family.id || family._id}`}>
              <img
                src={
                  Array.isArray(family.images) && family.images.length > 0
                    ? family.images[0]
                    : t("default_image")
                }
                alt={family.title || t("no_name")}
                className="Family-image"
              />
            </Link>
            <div className="Family-content">
              <h3 className="Family-name">{family.title || t("no_name")}</h3>
              <p className="Family-description">{family.description || t("no_description")}</p>
              <p className="Family-price">{t("price", { price: family.price || t("no_price") })}</p>
              <p className="Family-location">{t("location", { location: family.location || t("no_location") })}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Family;
