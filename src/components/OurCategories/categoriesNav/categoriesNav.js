import React, { useState, useEffect, useMemo, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./categoriesNav.css";

const CategoriesNav = ({ navbarId }) => {
  const [selectedCategory, setSelectedCategory] = useState(""); // إدارة الفئة المختارة
  const [showDropdown, setShowDropdown] = useState(false); // لإظهار أو إخفاء القائمة المنسدلة في الشاشات الصغيرة
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820); // متابعة حالة حجم الشاشة
  const location = useLocation(); // للحصول على المسار الحالي

  // تعريف الفئات باستخدام useMemo
  const categories = useMemo(() => [
    { name: "Cars", path: "/car" },
    { name: "Property", path: "/property" },
    { name: "Services", path: "/services" },
    { name: "Furniture", path: "/furniture" },
    { name: "Camping", path: "/camping" },
    { name: "Gifts", path: "/gifts" },
    { name: "Contracting", path: "/Contracting" },
    { name: "Family", path: "/family" },
    { name: "Animals", path: "/animal" },
    { name: "Electronics", path: "/electronics" },
    { name: "Jobs", path: "/jobs" },
    { name: "Others", path: "/other" },
  ], []); // الفئات ثابتة ولا تتغير لذا يمكن استخدام useMemo بدون إضافتها كاعتماديات

  // تحديث الفئة المختارة بناءً على المسار
  useEffect(() => {
    const category = categories.find((cat) => location.pathname.includes(cat.path));
    if (category) {
      setSelectedCategory(category.name); // تحديث النص في الزر عند التغيير في المسار
    }
  }, [location.pathname, categories]);

  // تحديث حالة حجم الشاشة عند التغيير
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 820);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // استخدام useCallback لتحسين الأداء
  const handleCategorySelect = useCallback((categoryName) => {
    setSelectedCategory(categoryName); 
    setShowDropdown(false); 
  }, []);

  // مكون عرض القائمة
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
      {/* زر اختيار الفئة في الشاشات الصغيرة */}
      {isMobile && (
        <button
          className="category-select-button"
          onClick={() => setShowDropdown(!showDropdown)} // عند الضغط على الزر يتم التبديل بين إظهار وإخفاء القائمة المنسدلة
        >
          {selectedCategory || "اختيار الفئة"}
        </button>
      )}

      {/* القائمة المنسدلة في الشاشات الصغيرة */}
      {isMobile && showDropdown && renderCategoriesList(true)}

      {/* في الشاشات العادية (أكبر من 820px)، تظهر القائمة من دون الزر */}
      {!isMobile && renderCategoriesList(false)}
    </div>
  );
};

export default CategoriesNav;
