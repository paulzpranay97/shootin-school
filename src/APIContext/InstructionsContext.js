import React, { createContext, useContext, useState, useRef, useCallback } from "react";
import axiosInstance from "../Config/axios";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const InstructionsContext = createContext();
export const useInstructions = () => useContext(InstructionsContext);

export const InstructionsContextProvider = ({ children }) => {
  const [packages, setPackages] = useState([]);
  const [packageCategories, setPackageCategories] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toastRef = useRef(null);
  const navigate = useNavigate();

  const clearPackages = () => setPackages([]);

  const handleUnauthorized = () => {
    toastRef.current?.show({
      severity: "error",
      summary: "Unauthorized",
      detail: "Access token missing. Please log in again.",
      life: 4000,
    });
    clearPackages();
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  /** ✅ Fetch all packages */
  const fetchGroupInstructions = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return handleUnauthorized();

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/customer/packages/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPackages(response.data || []);
    } catch (err) {
      const errorDetail = err.response?.data?.detail || "Failed to fetch packages";
      setError(errorDetail);
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: errorDetail,
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const fetchInstructionCategories = useCallback(async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return handleUnauthorized();

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/customer/packages/category/${id}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPackageCategories(response.data || []);
    } catch (err) {
      const errorDetail = err.response?.data?.detail || "Failed to fetch packages";
      setError(errorDetail);
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: errorDetail,
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const fetchCartItems = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return handleUnauthorized();

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/customer/list-cart/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setCartItems(response.data || []);
    } catch (err) {
      const errorDetail = err.response?.data?.detail || "Failed to fetch packages";
      setError(errorDetail);
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: errorDetail,
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  const addToCart = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/customer/cart/add/", data);
      // setParentProfile(response.data);

      Swal.fire({
        icon: "success",
        title: "Added To Cart",
        text: "Added To Cart successfully!",
      });

      return { success: true, data: response.data };
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.detail || "Something went wrong.",
      });

      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // const deleteCart = async (id) => {
  //     const accessToken = localStorage.getItem("accessToken");
  //     if (!accessToken) return handleUnauthorized();
  
  //     setLoading(true);
  //     setError(null);
  
  //     const headers = { Authorization: `Bearer ${accessToken}` };
  
  //     try {
  //       const response = await axiosInstance.delete(
  //         `/customer/delete-cart/?id=${id}`,
  //         { headers }
  //       );
  //       await fetchCartItems();
  //       Swal.fire({
  //         icon: "success",
  //         title: "Success !",
  //         text: `${response.data?.message || "Cart Item deleted successfully."}`,
  //       });
  //       return { success: true, data: response.data };
  //     } catch (err) {
  //       const errorDetail = err.response?.data || { detail: "Failed to delete Item" };
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error !",
  //         text: `${errorDetail.detail || "An error occurred while deleting the Item."}`,
  //       });
  //       return { success: false, error: errorDetail };
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const applyCoupon = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/customer/apply-coupon/", data);
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const proceedToCheckout = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/payment/checkout/", data);
      // setParentProfile(response.data);

      // Swal.fire({
      //   icon: "success",
      //   title: "Account Created",
      //   text: "Parent account created successfully!",
      // });

      return { success: true, data: response.data };
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.detail || "Something went wrong.",
      });

      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const verifyPaymentStatus = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return handleUnauthorized();

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/payment/verify_payment/?session_id=${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return response.data

    } catch (err) {
      const errorDetail = err.response?.data?.detail || "Something went wrong";
      setError(errorDetail);
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: errorDetail,
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <InstructionsContext.Provider
      value={{
        packages,
        packageCategories,
        cartItems,
        fetchCartItems,
        addToCart,
        loading,
        error,
        fetchGroupInstructions,
        fetchInstructionCategories,
        applyCoupon,
        proceedToCheckout,
        verifyPaymentStatus
      }}
    >
      <Toast ref={toastRef} />
      {children}
    </InstructionsContext.Provider>
  );
};
