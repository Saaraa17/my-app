import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Services.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../../Api/dataApi";
import { Link } from "react-router-dom";

const Services = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await fetchData("Services");
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="Services">
      <CategoriesNav />
      <h2 className="Services-title">{t("available_services")}</h2>

      {loading && <p>{t("loading")}</p>}
      {error && <p style={{ color: "red" }}>{t("error_message", { message: error })}</p>}

      <div className="Services-container">
        {data.map((service) => (
          <div key={service.id || service._id} className="Services-card">
            <Link to={`/service/${service.id || service._id}`}>
              <img
                src={
                  Array.isArray(service.images) && service.images.length > 0
                    ? service.images[0]
                    : t("default_image")
                }
                alt={service.title || t("no_name")}
                className="Services-image"
              />
            </Link>
            <div className="Services-content">
              <h3 className="Services-name">{service.title || t("no_name")}</h3>
              <p className="Services-description">{service.description || t("no_description")}</p>
              <p className="Services-price">{t("price", { price: service.price || t("no_price") })}</p>
              <p className="Services-location">
                {t("location", { location: service.location || t("no_location") })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
