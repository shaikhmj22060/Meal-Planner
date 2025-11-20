import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children }) => {
  const { isAuthenticated, Loading } = useAuth();
  const location = useLocation();

  if (Loading) {
    return <div> Loading</div>;
  }

  if (isAuthenticated == null || isAuthenticated == false) {
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }
  return children;
};

export default Protected;
