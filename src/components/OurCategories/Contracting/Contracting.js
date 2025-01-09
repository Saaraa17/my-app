import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Contracting.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../../Api/dataApi"; 
import { Link } from "react-router-dom";

const Contracting = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchContracting = async () => {
      try {
        const result = await fetchData("Contracting");
        setData(result); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchContracting();
  }, []);

  return (
    <div className="Contracting">
      <CategoriesNav />
      <h2 className="Contracting-title">{t("contracting")}</h2>

      {loading && <p>{t("loading")}</p>}
      {error && <p style={{ color: "red" }}>{t("error_message")}: {error}</p>} 

      <div className="Contracting-container">
        {data.map((contracting) => (
          <div key={contracting.id || contracting._id} className="Contracting-card">
            <Link to={`/product/${contracting.id || contracting._id}`}>
              <img 
                src={
                  Array.isArray(contracting.images) && contracting.images.length > 0
                    ? contracting.images[0]
                    : t("no_image")
                }
                alt={contracting.title || t("no_name")} 
                className="Contracting-image" 
              />
            </Link>
            <div className="Contracting-content">
              <h3 className="contracting-name">{contracting.title || t("no_name")}</h3>
              <p className="Contracting-description">{contracting.description || t("no_description")}</p>
              <p className="Contracting-price">{t("price")}: {contracting.price || t("no_price")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contracting;
