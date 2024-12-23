import "./SignUp.css";
import Logo from "../assets/kwait-removebg 1.png";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";  // استيراد useNavigate بدلاً من useHistory

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
  });
  const [message, setMessage] = useState("");  // إضافة حالة لعرض رسالة التأكيد بعد التسجيل
  const [loading, setLoading] = useState(false); // حالة التحميل أثناء إرسال الطلب
  const [error, setError] = useState(""); // حالة لعرض أخطاء التسجيل
  const navigate = useNavigate();  // استخدام useNavigate للتنقل بين الصفحات

  const handlePhoneChange = (value) => {
    setPhoneNumber(value); // هنا يتم تحديث رقم الهاتف عند تغييره
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // تحقق من الشروط
    setPasswordValid({
      length: value.length >= 8 && value.length <= 20,
      uppercase: /[A-Z]/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");  // إعادة تعيين الأخطاء في بداية عملية التسجيل

    // محاكاة الاتصال بـ API لتسجيل المستخدم
    try {
      const response = await fetch("https://api.example.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          password,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // إظهار رسالة التأكيد
        setMessage("Registration successful! You will be redirected to the login page.");
        
        // هيتنقل لصفحه اللوجن
        setTimeout(() => {
          navigate("/login");  // التنقل إلى صفحة تسجيل الدخول
        }, 3000);
      } else {
        // عرض رسائل الخطأ في حالة فشل التسجيل
        setError(data.message || "An error occurred while registering ...");
      }
    } catch (error) {
      setError("An error occurred while connecting to the server. Try again.");
    } finally {
      setLoading(false); // إنهاء حالة التحميل
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img src={Logo} alt="Logo" className="logo" />
        <h2>Hello, Let’s get started</h2>
        <p>
          Create an account today to unlock exclusive benefits and enhance your
          shopping experience on our e-commerce website!
        </p>
        <form onSubmit={handleSignUp}>
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
                  paddingLeft: "50px"
                }}
              />
            </div>
          </div>
          <div className="input-group">
            <input type="text" id="name" placeholder="Your Name" required />
          </div>
          <div className="input-group">
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <ul className="password-requirements">
              <li style={{ color: passwordValid.length ? "#EE2957" : "" }}>
                Between 8 and 20 characters
              </li>
              <li style={{ color: passwordValid.uppercase ? "#EE2957" : "" }}>
                1 Uppercase letter
              </li>
              <li style={{ color: passwordValid.specialChar ? "#EE2957" : "" }}>
                1 or more special characters
              </li>
            </ul>
          </div>
          <button
            type="submit"
            className="signup2-btn"
            disabled={!passwordValid.length || !passwordValid.uppercase || !passwordValid.specialChar || loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          {message && <p className="success-message">{message}</p>} {/* عرض رسالة التأكيد */}
          {error && <p className="error-message">{error}</p>} {/* عرض رسالة الخطأ */}
          <p className="p-login">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
