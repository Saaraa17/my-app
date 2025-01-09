import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./ForgetPassword.css";
import Logo from "../../assets/kwait-removebg 1.png";
import { sendVerificationCode, verifyCode, resetPassword } from "../../Api/config";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!phoneNumber) {
      setError(t("error_valid_phone"));
      setLoading(false);
      return;
    }

    const formattedPhoneNumber = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;

    try {
      await sendVerificationCode(formattedPhoneNumber);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || t("error_send_code"));
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!verificationCode || verificationCode.length !== 6) {
      setError(t("error_valid_code"));
      setLoading(false);
      return;
    }

    try {
      await verifyCode(phoneNumber, verificationCode);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || t("error_invalid_code"));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setModalMessage(t("error_password_match"));
      setShowModal(true);
      return;
    }

    if (
      newPassword.length < 8 ||
      newPassword.length > 20 ||
      !/[A-Z]/.test(newPassword) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
    ) {
      setModalMessage(t("error_password_requirements"));
      setShowModal(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await resetPassword(phoneNumber, newPassword);
      setModalMessage(t("success_password_reset"));
      setShowModal(true);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || t("error_reset_password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-box">
        <img src={Logo} alt={t("logo_alt")} className="logo" />
        {error && <p className="error-message">{error}</p>}
        {step === 1 && (
          <>
            <h2>{t("forget_password")}</h2>
            <p className="forget-password-text">{t("forget_password_text")}</p>
            <form onSubmit={handlePhoneSubmit}>
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
              <button type="submit" className="login2-btn" disabled={loading}>
                {loading ? t("sending") : t("next")}
              </button>
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <h2>{t("enter_code")}</h2>
            <p className="forget-password-text">{t("enter_code_text")}</p>
            <form onSubmit={handleCodeSubmit}>
              <div className="verification-code-container">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    id={`code-input-${index}`}
                    autoFocus={index === 0}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/[^0-9]/.test(value)) return;

                      const newCode = [...verificationCode];
                      newCode[index] = value;
                      setVerificationCode(newCode.join(""));

                      if (value && index < 5) {
                        document.getElementById(`code-input-${index + 1}`).focus();
                      }
                    }}
                  />
                ))}
              </div>
              <button type="submit" className="login2-btn" disabled={loading}>
                {loading ? t("verifying") : t("next")}
              </button>
            </form>
          </>
        )}
        {step === 3 && (
          <>
            <h2>{t("new_password")}</h2>
            <p className="forget-password-text">{t("new_password_text")}</p>
            <form onSubmit={handlePasswordSubmit}>
              <div className="input-Newpassword">
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t("placeholder_new_password")}
                  required
                />
              </div>
              <div className="input-Newpassword">
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t("placeholder_confirm_password")}
                  required
                />
              </div>
              <ul className="password-requirements">
                <li style={{ color: newPassword.length >= 8 && newPassword.length <= 20 ? "#EE2957" : "" }}>
                  {t("password_length")}
                </li>
                <li style={{ color: /[A-Z]/.test(newPassword) ? "#EE2957" : "" }}>
                  {t("password_uppercase")}
                </li>
                <li style={{ color: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? "#EE2957" : "" }}>
                  {t("password_special")}
                </li>
              </ul>
              <button type="submit" className="Confirm" disabled={loading}>
                {loading ? t("resetting") : t("confirm")}
              </button>
            </form>
          </>
        )}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)} className="modal-close-btn">
              {t("ok")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
