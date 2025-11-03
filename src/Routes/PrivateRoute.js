import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const isAuthenticated = !!token;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;