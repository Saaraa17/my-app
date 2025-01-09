import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // استيراد useTranslation
import './recommendedProduct.css';

const RecommendedProductPage = () => {
  const { t } = useTranslation(); // استخدام الترجمة
  const [products, setProducts] = useState([]); // حالة لتخزين المنتجات

  // استخدام useEffect لجلب البيانات عند تحميل الصفحة
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://kwtmarkets.net/back/items'); // تغيير الرابط حسب حاجتك
        const data = await response.json();
        console.log('Fetched Products:', data); // عرض البيانات في الـ console للتأكد من صحتها
        if (data && Array.isArray(data)) {
          setProducts(data); // تخزين المنتجات في الحالة إذا كانت البيانات عبارة عن مصفوفة
        } else {
          console.error('The data format is incorrect');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts(); // استدعاء دالة fetchProducts
  }, []); // التأكد من تنفيذ الكود مرة واحدة فقط عند تحميل الصفحة

  return (
    <div className="recommended-product-page">
      <h1>{t('all_recommended_products')}</h1> {/* ترجمة العنوان */}
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              className="product-card"
              key={product._id || product.id} // استخدم الـ id كمفتاح لكل منتج
            >
              <Link to={`/product/${product._id || product.id}`}>
                <img
                  src={product.images[0] || 'default-image-url.jpg'} // استخدم الصورة الافتراضية إذا لم تكن موجودة
                  alt={product.title || 'منتج'} // الترجمة
                  className="product-image"
                />
                <div className="product-details">
                  <h3>{product.title || t('no_name')}</h3> {/* ترجمة العنوان */}
                  <p>{product.description || t('no_description')}</p> {/* ترجمة الوصف */}
                  <p>{t('price')}: {product.price || t('no_price')}</p> {/* ترجمة السعر */}
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>{t('loading_products')}</p> // ترجمة حالة التحميل
        )}
      </div>
    </div>
  );
};

export default RecommendedProductPage;
