import React, { useState, useEffect } from "react";
import "./Electronics.css";
import CategoriesNav from "../categoriesNav/categoriesNav";
import { fetchData } from "../dataApi"; 
import { useProductModal } from '../../ProductModalManager/ProductModal'; 

const Electronics = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const { ProductModal, openModal } = useProductModal();

  // جلب البيانات حسب فئة Electronics
  useEffect(() => {
    const fetchElectronics = async () => {
      try {
        const result = await fetchData('Electronics'); // تصفية البيانات حسب فئة Electronics
        setData(result); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchElectronics();
  }, []);

  return (
    <div className="Electronics">
      <CategoriesNav />
      <h2 className="Electronics-title">Available Electronics</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} 

      <div className="Electronics-container">
        {data.map((electronics) => (
          <div key={electronics.id} className="Electronics-card">
             <img 
               src={electronics.images}
               alt={electronics.name} 
               className="Electronics-image"
               onClick={() => openModal(electronics)}
                />
            <div className="Electronics-content">
              <h3 className="Electronics-name">{electronics.title}</h3>
              <p className="Electronics-description">{electronics.description}</p>
              <p className="Electronics-price">Price: {electronics.price}</p>
              <p className="Electronics-location">Location: {electronics.location}</p>
            </div>
          </div>
        ))}
      </div>
      <ProductModal /> 
    </div>
  );
};

export default Electronics;
