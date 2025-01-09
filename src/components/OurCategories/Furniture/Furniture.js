import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Furniture.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../../Api/dataApi";
import { Link } from "react-router-dom";

const Furniture = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const result = await fetchData("Furniture");
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFurniture();
  }, []);

  return (
    <div className="Furniture">
      <CategoriesNav />
      <h2 className="Furniture-title">{t("available_furniture")}</h2>

      {loading && <p>{t("loading")}</p>}
      {error && <p style={{ color: "red" }}>{t("error_message", { message: error })}</p>}

      <div className="Furniture-container">
        {data.map((furniture) => (
          <div key={furniture.id || furniture._id} className="Furniture-card">
            <Link to={`/product/${furniture.id || furniture._id}`}>
              <img
                src={
                  Array.isArray(furniture.images) && furniture.images.length > 0
                    ? furniture.images[0]
                    : t("default_image")
                }
                alt={furniture.title || t("no_name")}
                className="Furniture-image"
              />
            </Link>
            <div className="Furniture-content">
              <h3 className="Furniture-name">{furniture.title || t("no_name")}</h3>
              <p className="Furniture-description">{furniture.description || t("no_description")}</p>
              <p className="Furniture-price">{t("price", { price: furniture.price || t("no_price") })}</p>
              <p className="Furniture-location">{t("location", { location: furniture.location || t("no_location") })}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Furniture;
