import React from 'react';
import './categoriesSection.css';
import { Link } from 'react-router-dom'; // استيراد Link
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

const CategoriesSection = () => {
  const categories = [
    { name: "Cars",        icon: carIcon,         path: "/car",         component: CategoriesComponents.Car },
    { name: "Property",    icon: propertyIcon,    path: "/property",    component: CategoriesComponents.Property },
    { name: "Services",    icon: servicesIcon,    path: "/services",    component: CategoriesComponents.Services },
    { name: "Furniture",   icon: furnitureIcon,   path: "/furniture",   component: CategoriesComponents.Furniture },
    { name: "Camping",     icon: compingIcon,     path: "/camping",     component: CategoriesComponents.Camping },
    { name: "Gifts",       icon: giftsIcon,       path: "/gifts",       component: CategoriesComponents.Gifts },
    { name: "Contracting", icon: contractingIcon, path: "/contracting", component: CategoriesComponents.Contracting },
    { name: "Family",      icon: familyIcon,      path: "/family",      component: CategoriesComponents.Family },
    { name: "Animal",      icon: animalIcon,      path: "/animal",      component: CategoriesComponents.Animal },
    { name: "Electronics", icon: electronicsIcon, path: "/electronics", component: CategoriesComponents.Electronics },
    { name: "Jobs",        icon: jobsIcon,        path: "/jobs",        component: CategoriesComponents.Jobs },
    { name: "Other",       icon: otherIcon,       path: "/other",       component: CategoriesComponents.Other },
  ];
  

  return (
    <div className="categories-section">
      <h2 className="categories-title">Our Categories</h2>
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
