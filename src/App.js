import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/navbar';
import Home from './components/Home/home';
import Footer from './components/Footer/footer';
import ProductDetails from './components/ProductModalManager/ProductDetails';
import SignUp from './components/pages/Registertion/SignUp';
import Login from './components/pages/Registertion/Login';
import ForgotPassword from './components/pages/Registertion/ForgetPassword';
import { Car, Property, Services, Furniture, Camping, Gifts, Contracting, Family, Animal, Electronics, Jobs, Other } from './components/OurCategories/ProductsIndex';
import DownloadApp from './components/DawnlodApp/dawnlodApp';
import PlaceItem from './components/Home/PlaceItem/placeItem';
import FurnitureSection from './components/Home/FurnitureSection/furnitureSection'; 
import RecommendedProductPage from './components/Home/RecommendedSection/recommendedProduct';
import { Helmet } from 'react-helmet'; 
import { useTranslation } from 'react-i18next';

function App() {
  const { t,i18n } = useTranslation(); 
  const currentLanguage = i18n.language;
  const linkToEnglish = `https://kwtmarkets.net/${currentLanguage === 'en' ? '' : 'en'}`;
  const linkToArabic  = `https://kwtmarkets.net/${currentLanguage === 'ar' ? '' : 'ar'}`;

  
  const categories = [
    { path: "/car", component: <Car /> },
    { path: "/property", component: <Property /> },
    { path: "/services", component: <Services /> },
    { path: "/furniture", component: <Furniture /> },
    { path: "/camping", component: <Camping /> },
    { path: "/gifts", component: <Gifts /> },
    { path: "/contracting", component: <Contracting /> },
    { path: "/family", component: <Family /> },
    { path: "/animal", component: <Animal /> },
    { path: "/electronics", component: <Electronics /> },
    { path: "/jobs", component: <Jobs /> },
    { path: "/other", component: <Other /> },
  ];

  const handleFurnitureClick = (id) => {
    console.log('Clicked Furniture ID:', id);
  };

  return (
    <Router>
      <div className="App">
        <Helmet>
          <meta name="description" content={t('meta.description')} />
          <title>{t('meta.title')}</title>
          <link rel="alternate" href={linkToEnglish} hreflang="en" />
          <link rel="alternate" href={linkToArabic} hreflang="ar" />
        </Helmet>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/PlaceItem" element={<PlaceItem />} />
          <Route path="/recommendedProducts" element={<RecommendedProductPage />} />
          <Route
            path="/furniture-section"
            element={<FurnitureSection handleFurnitureClick={handleFurnitureClick} />}
          />
          {categories.map((category, index) => (
            <Route key={index} path={category.path} element={category.component} />
          ))}
        </Routes>
        <DownloadApp />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
