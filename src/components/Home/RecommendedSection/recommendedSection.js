import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./recommendedSection.css";
import { useTranslation } from "react-i18next";
import { fetchData } from "../../Api/dataApi";

const RecommendedProducts = () => {
  const { t } = useTranslation();
  const [displayedCategories, setDisplayedCategories] = useState([]);

  // دالة لجلب البيانات
  const fetchRecommendedProducts = useCallback(async () => {
    try {
      const categories = await fetchData(); // جلب البيانات باستخدام fetchData
      setDisplayedCategories(getRandomCategories(categories, 3)); // عرض 3 فقط
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  const getRandomCategories = (data, count) => {
    const shuffled = [...data].sort(() => Math.random() - 0.5); // ترتيب عشوائي
    return shuffled.slice(0, count); // أخذ أول 3 فئات
  };

  useEffect(() => {
    fetchRecommendedProducts();
  }, [fetchRecommendedProducts]);

  return (
    <div className="recommended-products">
      <h2>{t("recommended_products")}</h2>
      <div className="section-header">
        <Link to="/recommendedProducts" className="see-more">
          {t("see_more")} {">"}
        </Link>
      </div>
      <div className="product-grid">
        {displayedCategories.length > 0 ? (
          displayedCategories.map((category) => (
            <div
              className="product-card"
              key={category._id || category.id} // تأكد من الحقل الصحيح
            >
              <Link to={`/product/${category._id || category.id}`}>
                <img
                  src={
                    Array.isArray(category.images) && category.images.length > 0
                      ? category.images[0] // الصورة الأولى من المصفوفة
                      : "default-image-url.jpg" // صورة افتراضية
                  }
                  alt={category.title || t("no_name")}
                  className="product-image"
                />
                <div className="product-details">
                  <h3>{category.title || t("no_name")}</h3>
                  <p>{category.description || t("no_description")}</p>
                  <p>
                    {t("price")}: {category.price || t("no_price")}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>{t("loading_categories")}</p>
        )}
      </div>
    </div>
  );
};

export default RecommendedProducts;
