import React, { useState } from 'react';
import './productModal.css';


export const useProductModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(null);

  const openModal = (productDetails) => {
    setProduct(productDetails); // تخزين بيانات المنتج
    setIsOpen(true); // فتح الـModal
  };

  const closeModal = () => {
    setIsOpen(false); // غلق الـModal
    setProduct(null); // تفريغ البيانات
  };

  const ProductModal = () => (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-container">
          <button className="close-button" onClick={closeModal}>
            &times;
          </button>
          {product ? (
            <div className="modal-content">
              <img src={product.images} alt={product.title} className="modal-image" />
              <div className="modal-details">
                <h2>{product.title}</h2>
                <p>Description:{product.description}</p>
                <p className="modal-price">Price: {product.price}</p>
                <p className="modal-location">Location: {product.location}</p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    )
  );

  return { ProductModal, openModal, closeModal };
};
