import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const useProductModal = () => {
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);

  const openModal = (productDetails) => {
    setProduct(productDetails);
  };

  const ProductModal = () =>
    product ? (
      <div className="modal-overlay">
        <div className="modal-container">
          <Link to={`/product/${product.id}`} className="close-button">
            {t("go_to_product_page")}
          </Link>
          <div className="modal-content">
            <div className="image-carousel">
              <img
                src={product.images[0] || t("default_image")}
                alt={product.title || t("no_title")}
                className="modal-image"
              />
            </div>
            <div className="modal-details">
  <h3 className="product-name">{product.title || t("no_title")}</h3>
  <p className="product-description">{product.description || t("no_description")}</p>
  <p className="product-price">{t("price")}: {product.price || t("no_price")}</p>
  <p className="product-category">{t("category")}: {product.category || t("no_category")}</p>
</div>

          </div>
        </div>
      </div>
    ) : null;

  return { ProductModal, openModal };
};
