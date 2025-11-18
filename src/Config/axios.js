import axios from "axios";
import BASE_API_URL from "./Config";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});
      axiosInstance.defaults.headers.common["X-Company-ID"] = 2;
      axiosInstance.defaults.headers.common["X-Login-Role"] = "PARENT";

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (
      config.data &&
      !(config.data instanceof FormData) &&
      !config.headers["Content-Type"]
    ) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return Promise.reject({ ...error, redirectToLogin: true });
      }

      try {
        const response = await axios.post(`${BASE_API_URL}/token/refresh/`, {
          refresh: refreshToken,
        });
        const { access } = response.data;
        localStorage.setItem("accessToken", access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        return Promise.reject({ ...refreshError, redirectToLogin: true });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
