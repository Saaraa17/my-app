import React, { useState, useEffect, useMemo, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';  // استيراد الترجمة
import "./categoriesNav.css";

const CategoriesNav = ({ navbarId }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);
  const location = useLocation();
  const { t } = useTranslation(); // استخدام الترجمة

  const categories = useMemo(() => [
    { name: t("cars"), path: "/car" },
    { name: t("property"), path: "/property" },
    { name: t("services"), path: "/services" },
    { name: t("furniture"), path: "/furniture" },
    { name: t("camping"), path: "/camping" },
    { name: t("gifts"), path: "/gifts" },
    { name: t("contracting"), path: "/Contracting" },
    { name: t("family"), path: "/family" },
    { name: t("animals"), path: "/animal" },
    { name: t("electronics"), path: "/electronics" },
    { name: t("jobs"), path: "/jobs" },
    { name: t("others"), path: "/other" },
  ], [t]); // استخدام الترجمة هنا

  useEffect(() => {
    const category = categories.find((cat) => location.pathname.includes(cat.path));
    if (category) {
      setSelectedCategory(category.name);
    }
  }, [location.pathname, categories]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 820);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategorySelect = useCallback((categoryName) => {
    setSelectedCategory(categoryName);
    setShowDropdown(false);
  }, []);

  const renderCategoriesList = (isMobileView) => (
    <ul className={`categories-list2 ${isMobileView ? "mobile" : "desktop"}`}>
      {categories.map((category, index) => (
        <li key={index} className="category-link">
          <NavLink
            to={category.path}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => handleCategorySelect(category.name)}
          >
            {category.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="categories-navbar" id={navbarId}>
      {isMobile && (
        <button
          className="category-select-button"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedCategory || t("select_category")}
        </button>
      )}

      {isMobile && showDropdown && renderCategoriesList(true)}

      {!isMobile && renderCategoriesList(false)}
    </div>
  );
};

export default CategoriesNav;
