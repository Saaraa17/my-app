import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Jobs.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { Link } from "react-router-dom";

const Jobs = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.example.com/Jobs");
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
    <div className="Jobs">
      <CategoriesNav />
      <h2 className="Jobs-title">{t("available_jobs")}</h2>

      {loading && <p>{t("loading")}</p>}
      {error && <p style={{ color: "red" }}>{t("error_message", { message: error })}</p>}

      <div className="Jobs-container">
        {data.map((job) => (
          <div key={job.id || job._id} className="Jobs-card">
            <Link to={`/job/${job.id || job._id}`}>
              <img
                src={job.image || t("default_image")}
                alt={job.name || t("no_name")}
                className="Jobs-image"
              />
            </Link>
            <div className="Jobs-content">
              <h3 className="Jobs-name">{job.name || t("no_name")}</h3>
              <p className="Jobs-description">{job.description || t("no_description")}</p>
              <p className="Jobs-price">{t("price", { price: job.price || t("no_price") })}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
