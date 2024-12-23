import React, { useState, useEffect } from "react";  
import "./navbar.css";
import { Link } from "react-router-dom";

// صور للغات
import englishFlag from "../assets/english-flag.png";
import arabicFlag from "../assets/arabic-flag.png";
import profilePic from "../assets/profile.png"; 

const Navbar = () => {
  const [language, setLanguage] = useState("EN");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); 
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // تعديل اللغة
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    console.log("Language changed to:", lang);
  };

  // جلب بيانات البحث
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const response = await fetch(`https://api.example.com/search?q=${query}`);
        const data = await response.json();
        setSearchResults(data.results); 
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]); // إذا كان الاستعلام فارغًا أو أقل من 3 أحرف
    }
  };

  // عند تحميل الصفحة، نسترجع حالة تسجيل الدخول
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user")); //  بيجيب الداتا من localStorage
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUser(loggedInUser); 
    }
  }, []);

  // دالة تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem("user"); // هنشيل الداتا لما يعمل log out
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <Link to="/"> 
            <img src="/logo.png" alt="Logo" />
          </Link>
        </div>

        {/* مربع البحث */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
  
          {searchQuery && searchResults.length > 0 && (
            <div className="search-results">
              <ul>
                {searchResults.map((result, index) => (
                  <li key={index}>
                    <Link to={`/search/${result.id}`}>{result.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="navbar-right">
        {isLoggedIn ? (
          <div className="profile-container">
            <img
              src={user?.profilePicture || profilePic} // عرض صورة البروفايل
              alt="Profile"
              className="profile-pic"
            />
            <button onClick={handleLogout} className="btn logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn login-btn">Login</Link>
            <Link to="/signup" className="btn signup-btn">Sign Up</Link>
          </>
        )}

        {/* قائمة اختيار اللغة */}
        <div className="language-dropdown">
          <button className="btn language-btn">
            {language === "EN" ? (
              <>
                <img src={englishFlag} alt="English" className="flag-icon" />{" "}
                English
              </>
            ) : (
              <>
                <img src={arabicFlag} alt="Arabic" className="flag-icon" />{" "}
                عربي
              </>
            )}
          </button>
          <div className="dropdown-menu">
            <span onClick={() => handleLanguageChange("EN")}>
              <img src={englishFlag} alt="English" className="flag-icon" /> English
            </span>
            <span onClick={() => handleLanguageChange("AR")}>
              <img src={arabicFlag} alt="Arabic" className="flag-icon" /> عربي
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
