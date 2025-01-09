import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_URL } from "../Api/dataApi"; 
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`); // استخدام API_URL
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(t("error_fetching_product"), error);
      }
    };

    fetchProductDetails();
  }, [id, t]);

  if (!product) {
    return <div>{t("loading")}</div>;
  }

  const images = product.images || [t("default_image")];

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="product-container">
      <div className="image-carousel">
        {images.length > 1 && (
          <>
            <button onClick={prevImage} className="carousel-arrow left-arrow">
              &#8592;
            </button>
            <button onClick={nextImage} className="carousel-arrow right-arrow">
              &#8594;
            </button>
          </>
        )}
        <img
          src={images[currentIndex]}
          alt={product.title || t("no_title")}
          className="product-image"
        />
      </div>
      <div className="product-details">
  <h3 className="product-name">{product.title || t("no_title")}</h3>
  <p className="product-description">
    {product.description || t("no_description")}
  </p>
  <p className="product-price">
    {t("price")}: {product.price || t("no_price")}
  </p>
  <p className="product-location">
    {t("location")}: {product.location || t("no_location")}
  </p>
</div>

    </div>
  );
};

export default ProductDetails;
