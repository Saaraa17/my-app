import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { login } from "../../../features/authSlice";
import "./Login.css";
import Logo from "../../assets/kwait-removebg 1.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { loginUser } from "../../Api/config";

const Login = () => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formattedPhoneNumber = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+${phoneNumber}`;

    try {
      const response = await loginUser(formattedPhoneNumber, password);
      dispatch(login(response.user));
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/home");
    } catch (err) {
      console.error("Login Failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || t("error_invalid_credentials"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={Logo} alt={t("logo_alt")} className="logo" />
        <h2>{t("welcome_back")}</h2>
        <p className="login-text">{t("welcome_message")}</p>
        <form onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}
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
              placeholder={t("placeholder_password")}
              required
            />
            <p className="forgot-password">
              <Link to="/forgot-password">{t("forgot_password")}</Link>
            </p>
          </div>
          <button type="submit" className="login2-btn" disabled={loading}>
            {loading ? t("logging_in") : t("login")}
          </button>
          <p className="signup">
            {t("no_account")} <a href="/signup">{t("sign_up")}</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
