import React, { createContext, useEffect, useContext, useState } from "react";
import axiosInstance from "../Config/axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../Components/Loader/Loader";

export const ParentContext = createContext();


export const useParent = () => useContext(ParentContext);


export const ParentProvider = ({ children, user }) => {
  const [parentProfile, setParentProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchLSParentDetails = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || !user?.id) {
      return;
    }
    try {
      const response = await axiosInstance.get("/customer/parent-user-info/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.detail || "Failed to fetch parent details.",
      });
      setParentProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentParent = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token || !user?.id) {
      setParentProfile(null);
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.get("/customer/parent-account/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && typeof response.data === "object") {
        setParentProfile(response.data);
      } else {
        setParentProfile(null);
        navigate("/login");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.detail || "Failed to fetch parent",
      });
      setParentProfile(null);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const addParent = async (newData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/customer/parent-account/", newData);
      setParentProfile(response.data);

      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "Parent account created successfully!",
      });

      return { success: true, data: response.data };
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.detail || "Failed to create account.",
      });

      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const updateParentProfile = async (updatedData) => {
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
      const response = await axiosInstance.patch("/customer/parent-account/", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": updatedData instanceof FormData ? "multipart/form-data" : "application/json",
        },
      });

      setParentProfile(response.data);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Profile updated successfully.",
      });

      return { success: true, data: response.data };
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.detail || "Failed to update profile.",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
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

     

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: response.data?.message || "Profile updated successfully.",
      });

      return { success: true, data: response.data };
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

  const forgotPassword = async (data) => {
    localStorage.clear();

    try {
      setLoading(true);

      const response = await axiosInstance.post(
        "/customer/forgot-password/send-otp/",
        data
      );

      Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: "A password reset OTP has been sent to your email.",
      });

      return { success: true, data: response.data };
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.detail || "Failed to send OTP.",
      });

      return { success: false };
    } finally {
      setLoading(false);
    }
  };

const VerifyOTP = async (data) => {
  try {
    setLoading(true);
    

    const response = await axiosInstance.post(
      "/customer/forgot-password/verify-otp/",
      data
    );

    const message = response.data?.message || "OTP verified successfully.";
    const token = response.data?.token || null;
    if (token) {
      localStorage.setItem("resetToken", token);
    }

    Swal.fire({
      icon: "success",
      title: "OTP verified.",
      text: message,
    });

    return { success: true, data: response.data };
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: err.response?.data?.detail || "Failed to verify OTP.",
    });

    return { success: false };
  } finally {
    setLoading(false);
  }
};

const resetPassword = async (data) => {
  try {
    setLoading(true);
    const token = localStorage.getItem("resetToken");
    

    const response = await axiosInstance.post(
      "/customer/forgot-password/reset/",
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const message = response.data?.message || "Password reset successfully.";
    localStorage.removeItem("resetToken");
    localStorage.removeItem("resetEmail");


    Swal.fire({
      icon: "success",
      title: "Password Reset",
      text: message,
    });

    return { success: true, data: response.data };
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: err.response?.data?.detail || "Failed to reset password.",
    });

    return { success: false };
  } finally {
    setLoading(false);
  }
};

const fetchParentPackages = async () => {
    const accessToken = localStorage.getItem("accessToken");
    setLoading(true);

    try {
      const response = await axiosInstance.get(`/customer/my-packages/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data || [];
    } catch (err) {
      const errorDetail = err.response?.data?.detail || "Failed to fetch players";
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.detail || "Failed to fetch packages.",
      });
    } finally {
      setLoading(false);
    }
  };


  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (user?.id && token) {
  //     fetchCurrentParent();
  //   } else {
  //     setParentProfile(null);
  //   }
  // }, [user?.id, location.pathname]);

  return (
    <ParentContext.Provider
      value={{
        parentProfile,
        loading,
        fetchLSParentDetails,
        fetchCurrentParent,
        updateParentProfile,
        forgotPassword,
        addParent,
        VerifyOTP,
        resetPassword,
        changePasswordParentProfile,
        fetchParentPackages
      }}
    >
      {loading && (
       <Loader/>
      )}
      {children}
    </ParentContext.Provider>
  );
};
