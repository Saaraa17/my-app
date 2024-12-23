import React from "react";
import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation(); // الوصول إلى البيانات المرسلة عبر navigate
  const { product } = location.state || {}; // استخراج المنتج من الـ state

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-details-page">
      <img src={product.image} alt={product.title} className="product-image" />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price} KWD</p>
      <p>{product.days} Days ago</p>
    </div>
  );
};

export default ProductDetails;
