import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import "./Login.css";
import Logo from "../assets/kwait-removebg 1.png"; 
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();

   
    if (phoneNumber === "1234567890" && password === "password") {
      // إذا كانت البيانات صحيحة، سجل المستخدم في localStorage
      localStorage.setItem("isLoggedIn", true); 
      navigate("/home"); 
    } else {
      alert("Invalid phone number or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={Logo} alt="Logo" className="logo" />
        <h2>Welcome Back</h2>
        <p className="login-text">
          Hi again in our platform as you can continue using our features
        </p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <PhoneInput
              country={"kw"}
              value={phoneNumber}
              onChange={(value) => setPhoneNumber(value)}
              inputStyle={{
                width: "100%",
                borderRadius: "4px",
                border: "1px solid #ddd",
                padding: "19px",
                paddingLeft: "50px",
              }}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <p className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
          </div>
          <button type="submit" className="login2-btn">
            Login
          </button>
          <p className="signup">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
