import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const rawTokenType = localStorage.getItem("tokenType") || "Bearer";
    const trimmedType = rawTokenType.trim();
    const effectiveType = trimmedType || "Bearer";
    const normalizedType =
      effectiveType.toLowerCase() === "bearer" ? "Bearer" : effectiveType;

    if (token) {
      config.headers = config.headers || {};
      if (!config.headers.Authorization) {
        config.headers.Authorization = `${normalizedType} ${token}`;
      }
    }

    if (config.data instanceof FormData && config.headers) {
      if (typeof config.headers.delete === "function") {
        config.headers.delete("Content-Type");
      } else {
        delete config.headers["Content-Type"];
        delete config.headers["content-type"];
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;