import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../Config/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../Components/Loader/Loader";

const LoginContext = createContext();
export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async ({ username_or_email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosInstance.post("/customer/login/", { username_or_email, password }

      );


      let loggedInUser = data.payload.user;
      if (loggedInUser?.user) {
        loggedInUser = { ...loggedInUser, ...loggedInUser.user };
      }

      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("accessToken", data.payload.access);
      localStorage.setItem("refreshToken", data.payload.refresh);
      setUser(loggedInUser);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${loggedInUser.first_name || "User"}!`,
      });
      return { success: true };



    } catch (err) {
      const message = err.response?.data?.detail || "Login failed";
      setError(message);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
      });

      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    Swal.fire({
      icon: "info",
      title: "Logged Out",
      text: "You have been logged out successfully.",
    });
    navigate("/login", { replace: true });
  };

  const changePasswordParentProfile = async (data) => {
    const token = localStorage.getItem("accessToken");

    if (!token || !user?.id) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "You must be logged in to update the profile.",
      });
      return { success: false };
    }

    try {
      setLoading(true);
      const response = await axiosInstance.patch("/customer/change-password/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.clear();
      setUser(null);
      Swal.fire({
        icon: "info",
        title: "Logged Out",
        text: "You have been logged out successfully.",
      });
      navigate("/login", { replace: true });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.detail || "Failed to update password.",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Auto-logout on expired token
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.redirectToLogin && user) logout();
        return Promise.reject(err);
      }
    );
    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, [user]);

  return (
    <LoginContext.Provider value={{ user, login, logout, loading, error, changePasswordParentProfile }}>
      {loading && (
        <Loader />
      )}
      {children}
    </LoginContext.Provider>
  );
};
