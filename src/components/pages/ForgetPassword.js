import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./ForgetPassword.css";
import Logo from "../assets/kwait-removebg 1.png";

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
   // eslint-disable-next-line
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false); // للتحكم في إظهار النافذة
  const [modalMessage, setModalMessage] = useState(""); // رسالة النافذة

  const navigate = useNavigate();

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setModalMessage("Passwords do not match!");
      setShowModal(true);
      return;
    }

    if (
      newPassword.length < 8 ||
      newPassword.length > 20 ||
      !/[A-Z]/.test(newPassword) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
    ) {
      setModalMessage(
        "Password must be between 8 and 20 characters, contain at least one uppercase letter, and include a special character."
      );
      setShowModal(true);
      return;
    }

    setModalMessage("Password reset successfully!");
    setShowModal(true);

    // الانتقال إلى صفحة تسجيل الدخول بعد التأكيد
    setTimeout(() => {
      navigate("/login");
    }, 4000); // بعد 2 ثانية
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-box">
        <img src={Logo} alt="Logo" className="logo" />
        {step === 1 && (
          <>
            <h2>Forget Password</h2>
            <p className="forget-password-text">
              If you forget your password, enter your phone number to receive a verification code.
            </p>
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
              <button type="submit" className="login2-btn">
                Next
              </button>
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <h2>Enter Code</h2>
            <p className="forget-password-text">
              We have sent a 6-digit code to your phone number. Please enter it here.
            </p>
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
              <button type="submit" className="login2-btn">
                Next
              </button>
            </form>
          </>
        )}
        {step === 3 && (
          <>
            <h2>New Password</h2>
            <p className="forget-password-text">
              Enter a new password for your account.
            </p>
            <form onSubmit={handlePasswordSubmit}>
              <div className="input-Newpassword">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  required
                />
              </div>
              <div className="input-Newpassword">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <ul className="password-requirements">
                <li style={{ color: newPassword.length >= 8 && newPassword.length <= 20 ? "#EE2957" : "" }}>
                  Between 8 and 20 characters
                </li>
                <li style={{ color: /[A-Z]/.test(newPassword) ? "#EE2957" : "" }}>
                  1 Uppercase letter
                </li>
                <li style={{ color: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? "#EE2957" : "" }}>
                  1 or more special characters
                </li>
              </ul>
              <button type="submit" className="Confirm">
                Confirm
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
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
