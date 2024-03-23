import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { serverUrls } from "../../utils/serverUrls";
import { useSelector } from "react-redux";

const IsLoggedIn = () => {
  const { token } = useSelector((state) => state.auth);
  return token ? <Outlet /> : <Navigate to={serverUrls.login} />;
};

export default IsLoggedIn;
