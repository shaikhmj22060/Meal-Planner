import React from "react";
import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  onclick = async () => {
    const res = await logout();
    if (res.success) {
      navigate("/login")
    }
  };
  return (
    <></>
  );
};

export default Logout;
