import "./SignUp.css";
import Logo from "../../assets/kwait-removebg 1.png";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../Api/config";

const SignUp = () => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    setPasswordValid({
      length: value.length >= 8 && value.length <= 20,
      uppercase: /[A-Z]/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !phoneNumber || !password) {
      setError(t("error_fill_all_fields"));
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError(t("error_valid_email"));
      return;
    }

    if (phoneNumber.length < 10) {
      setError(t("error_phone_digits"));
      return;
    }

    if (!passwordValid.length || !passwordValid.uppercase || !passwordValid.specialChar) {
      setError(t("error_password_criteria"));
      return;
    }

    const formattedPhoneNumber = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;

    setLoading(true);
    setError("");

    try {
      const response = await signUpUser({
        phoneNumber: formattedPhoneNumber,
        name,
        email,
        password,
      });

      console.log("Registration Successful:", response);
      setMessage(t("success_registration"));

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error("SignUp Failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || t("error_registration"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img src={Logo} alt={t("logo_alt")} className="logo" />
        <h2>{t("signup_title")}</h2>
        <p>{t("signup_description")}</p>
        <form onSubmit={handleSignUp}>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <div className="input-group">
            <div className="phone-input-container">
              <PhoneInput
                country={"kw"}
                value={phoneNumber}
                onChange={handlePhoneChange}
                inputStyle={{
                  width: "100%",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  padding: "19px",
                  paddingLeft: "50px",
                }}
              />
            </div>
          </div>

          <div className="input-group">
            <input
              type="text"
              id="name"
              placeholder={t("username")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              id="email"
              placeholder={t("placeholder_email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              id="password"
              placeholder={t("placeholder_password")}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <ul className="password-requirements">
              <li style={{ color: passwordValid.length ? "#EE2957" : "" }}>
                {t("password_length")}
              </li>
              <li style={{ color: passwordValid.uppercase ? "#EE2957" : "" }}>
                {t("password_uppercase")}
              </li>
              <li style={{ color: passwordValid.specialChar ? "#EE2957" : "" }}>
                {t("password_special")}
              </li>
            </ul>
          </div>

          <button
            type="submit"
            className="signup2-btn"
            disabled={!passwordValid.length || !passwordValid.uppercase || !passwordValid.specialChar || loading}
          >
            {loading ? t("loading") : t("sign_up")}
          </button>

          <p className="p-login">
            {t("already_have_account")} <a href="/login">{t("login")}</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
