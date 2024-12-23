import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/navbar';
import Home from './components/Home/home';
import Footer from './components/Footer/footer';
import ProductDetails from './components/ProductDetails/ProductDetails';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import ForgotPassword from './components/pages/ForgetPassword';
import { Car, Property, Services, Furniture, Camping, Gifts, Contracting, Family, Animal, Electronics, Jobs, Other } from './components/OurCategories/ProductsIndex';
import DownloadApp from './components/DawnlodApp/dawnlodApp';
import PlaceItem from './components/Home/PlaceItem/placeItem';
import FurnitureSection from './components/Home/FurnitureSection/furnitureSection'; 

function App() {
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

  // دالة لمعالجة النقر على عنصر الأثاث
  const handleFurnitureClick = (id) => {
    console.log('Clicked Furniture ID:', id);
    // يمكنك إضافة المزيد من الإجراءات هنا مثل التنقل إلى صفحة تفاصيل المنتج
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/PlaceItem" element={<PlaceItem />} />
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
