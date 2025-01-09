import axios from "axios";

const api = axios.create({
  baseURL: "https://kwtmarkets.net", 
  headers: {
    "Content-Type": "application/json",
  },
});



export const loginUser = async (phoneNumber, password) => {
  const response = await api.post("/back/login", { phoneNumber, password });
  return response.data;
};

export const signUpUser = async ({ phoneNumber, password, name, email }) => {
  const response = await api.post("/back/register", { phoneNumber, password, name, email });
  return response.data;
};

export const sendVerificationCode = async (phoneNumber) => {
  const response = await api.post("/back/reset-password", { phoneNumber });
  return response.data;
};

export const verifyCode = async (phoneNumber, code) => {
  const response = await api.post("/back/verify", { phoneNumber, verificationCode: code });
  return response.data;
};

export const resetPassword = async (phoneNumber, newPassword) => {
  const response = await api.post("/back/update-password", { phoneNumber, newPassword });
  return response.data;
};


export const checkPhoneExistence = async (phoneNumber) => {
  const response = await api.post("/back/reset-password", { phoneNumber });
  return response.data;  // يجب أن يكون الرد يحتوي على { exists: true/false }
};

export default api;
