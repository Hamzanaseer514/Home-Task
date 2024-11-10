import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
  const isLoggedIn = localStorage.getItem("token");

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
