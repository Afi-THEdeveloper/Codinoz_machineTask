import React from "react";
import { useSelector } from "react-redux";
import { serverUrls } from "../../utils/serverUrls";
import { Navigate, Outlet } from "react-router-dom";

const IsLoggedOut = () => {
  const { token } = useSelector((state) => state.auth);
  return token === null ? <Outlet /> : <Navigate to={serverUrls.home} />;
};

export default IsLoggedOut;
