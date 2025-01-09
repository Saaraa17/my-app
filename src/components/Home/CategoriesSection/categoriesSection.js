import React from 'react';
import './categoriesSection.css';
import { Link } from 'react-router-dom'; 
import * as CategoriesComponents from '../../OurCategories/ProductsIndex';
import carIcon from '../../assets/Cars.png';
import servicesIcon from '../../assets/Services.png';
import furnitureIcon from '../../assets/Furniture.png';
import compingIcon from '../../assets/Camping.png';
import giftsIcon from '../../assets/Gifts.png';
import contractingIcon from '../../assets/Contracting.png';
import familyIcon from '../../assets/Family.png';
import animalIcon from '../../assets/Animals.png';
import electronicsIcon from '../../assets/Electronics.png';
import jobsIcon from '../../assets/Jobs.png';
import otherIcon from '../../assets/Others.png';
import propertyIcon from '../../assets/Property.png';
import { useTranslation } from 'react-i18next';

const CategoriesSection = () => {
  const { t } = useTranslation();

  const categories = [
    { name: t("cars"),        icon: carIcon,         path: "/car",         component: CategoriesComponents.Car },
    { name: t("property"),    icon: propertyIcon,    path: "/property",    component: CategoriesComponents.Property },
    { name: t("services"),    icon: servicesIcon,    path: "/services",    component: CategoriesComponents.Services },
    { name: t("furniture"),   icon: furnitureIcon,   path: "/furniture",   component: CategoriesComponents.Furniture },
    { name: t("camping"),     icon: compingIcon,     path: "/camping",     component: CategoriesComponents.Camping },
    { name: t("gifts"),       icon: giftsIcon,       path: "/gifts",       component: CategoriesComponents.Gifts },
    { name: t("contracting"), icon: contractingIcon, path: "/contracting", component: CategoriesComponents.Contracting },
    { name: t("family"),      icon: familyIcon,      path: "/family",      component: CategoriesComponents.Family },
    { name: t("animal"),      icon: animalIcon,      path: "/animal",      component: CategoriesComponents.Animal },
    { name: t("electronics"), icon: electronicsIcon, path: "/electronics", component: CategoriesComponents.Electronics },
    { name: t("jobs"),        icon: jobsIcon,        path: "/jobs",        component: CategoriesComponents.Jobs },
    { name: t("other"),       icon: otherIcon,       path: "/other",       component: CategoriesComponents.Other },
  ];

  return (
    <div className="categories-section">
      <h2 className="categories-title">{t('our_categories')}</h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.path} 
            className="category-item"
          >
            <img src={category.icon} alt={category.name} className="category-icon" />
            <p className="category-name">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
