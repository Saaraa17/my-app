import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Gifts.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../../Api/dataApi";
import { Link } from "react-router-dom";

const Gifts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const result = await fetchData("Gifts");
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGifts();
  }, []);

  return (
    <div className="Gifts">
      <CategoriesNav />
      <h2 className="Gifts-title">{t("available_gifts")}</h2>

      {loading && <p>{t("loading")}</p>}
      {error && <p style={{ color: "red" }}>{t("error_message", { message: error })}</p>}

      <div className="Gifts-container">
        {data.map((gifts) => (
          <div key={gifts.id || gifts._id} className="Gifts-card">
            <Link to={`/product/${gifts.id || gifts._id}`}>
              <img
                src={
                  Array.isArray(gifts.images) && gifts.images.length > 0
                    ? gifts.images[0]
                    : t("default_image")
                }
                alt={gifts.title || t("no_name")}
                className="Gifts-image"
              />
            </Link>
            <div className="Gifts-content">
              <h3 className="Gifts-name">{gifts.title || t("no_name")}</h3>
              <p className="Gifts-description">{gifts.description || t("no_description")}</p>
              <p className="Gifts-price">{t("price", { price: gifts.price || t("no_price") })}</p>
              <p className="Gifts-location">{t("location", { location: gifts.location || t("no_location") })}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gifts;
