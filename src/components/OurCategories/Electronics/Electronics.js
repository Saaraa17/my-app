import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Electronics.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../../Api/dataApi";
import { Link } from "react-router-dom";

const Electronics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchElectronics = async () => {
      try {
        const result = await fetchData("Electronics");
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchElectronics();
  }, []);

  return (
    <div className="Electronics">
      <CategoriesNav />
      <h2 className="Electronics-title">{t("available_Electronics")}</h2>

      {loading && <p>{t("loading")}</p>}
      {error && <p style={{ color: "red" }}>{t("error", { message: error })}</p>}

      <div className="Electronics-container">
        {data.map((electronics) => (
          <div key={electronics.id || electronics._id} className="Electronics-card">
            <Link to={`/product/${electronics.id || electronics._id}`}>
              <img
                src={
                  Array.isArray(electronics.images) && electronics.images.length > 0
                    ? electronics.images[0]
                    : t("no_image")
                }
                alt={electronics.title || t("no_name")}
                className="Electronics-image"
              />
            </Link>
            <div className="Electronics-content">
              <h3 className="Electronics-name">{electronics.title || t("no_name")}</h3>
              <p className="Electronics-description">{electronics.description || t("no_description")}</p>
              <p className="Electronics-price">
                {t("electronics.price", { price: electronics.price || t("no_price") })}
              </p>
              <p className="Electronics-location">
                {t("electronics.location", { location: electronics.location || t("no_location") })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Electronics;
