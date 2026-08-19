import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const BACKEND_SERVER_URL = API_BASE_URL.replace(/\/api\/?$/, "");

export const getFullImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("/uploads")) {
    return `${BACKEND_SERVER_URL}${url}`;
  }
  return url;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Request Interceptor — attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("aura_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor — normalize error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with a non-2xx status
      const message =
        error.response.data?.message ||
        `Server error (${error.response.status})`;
      return Promise.reject(new Error(message));
    }

    if (error.code === "ECONNABORTED") {
      return Promise.reject(
        new Error("Request timed out. Please check your connection and try again.")
      );
    }

    // Network error — backend is unreachable
    return Promise.reject(
      new Error(
        "Unable to connect to the server. Make sure the backend (port 5000) is running."
      )
    );
  }
);

export default api;

