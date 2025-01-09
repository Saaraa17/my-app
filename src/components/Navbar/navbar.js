import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../Api/dataApi";
import "./navbar.css";
import englishFlag from "../assets/english-flag.png";
import arabicFlag from "../assets/arabic-flag.png";
import profilePic from "../assets/profile.png";
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [, setLanguage] = useState("EN");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang.toLowerCase());
    console.log("Current language:", i18n.language);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const results = await fetchData(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error("Error during search:", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/logo.png" alt="Logo" />
          </Link>
        </div>
        
        {isLoggedIn && (
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder={t("search_placeholder")} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
      </div>

      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <div className="profile-container">
              <button onClick={handleLogout} className="btn logout-btn">
                {t("logout")} 
              </button>
              <img
                src={user?.profilePicture || profilePic}
                alt="Profile"
                className="profile-pic"
              />
            </div>
            {/* عرض نتائج البحث */}
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((item) => (
                  <div key={item.id} className="search-result-item">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="btn login-btn">{t("login")}</Link> 
            <Link to="/signup" className="btn signup-btn">{t("signup")}</Link> 
          </>
        )}
        
        <div className="language-dropdown">
          <button className="btn language-btn">
            {i18n.language === "en" ? (
              <>
                <img src={englishFlag} alt="English" className="flag-icon" /> {t("english")}
              </>
            ) : (
              <>
                <img src={arabicFlag} alt="Arabic" className="flag-icon" /> {t("arabic")}
              </>
            )}
          </button>
          <div className="dropdown-menu">
            <span onClick={() => handleLanguageChange("EN")}>
              <img src={englishFlag} alt="English" className="flag-icon" /> {t("english")}
            </span>
            <span onClick={() => handleLanguageChange("AR")}>
              <img src={arabicFlag} alt="Arabic" className="flag-icon" /> {t("arabic")}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
