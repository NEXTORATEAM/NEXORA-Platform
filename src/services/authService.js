import api from "./api";

// تسجيل مستخدم جديد
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// تسجيل الدخول
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};