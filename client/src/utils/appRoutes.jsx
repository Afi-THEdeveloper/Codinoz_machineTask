import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { serverUrls } from "./serverUrls";
import PublicPage from "../pages/publicPage";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import Otp from "../pages/otp";
import IsLoggedIn from "../components/protectedComp/isloggedUser";

import IsLoggedOut from "../components/protectedComp/isloggedOutUser";
import Home from "../pages/Home";


const AppRoutes = () => {
  const { loading } = useSelector((state) => state.loadings);
  return (
    <div>
      {/* loading spinner ui */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black-100 bg-opacity-90">
          <div className="text-blue-500 flex justify-center items-center">
            <svg
              class="animate-spin h-16 w-16 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6.292-1.29-8.544-3.544l1.414-1.414z"
              ></path>
            </svg>
          </div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* public route */}
        <Route path={serverUrls.landing} element={<PublicPage />} />

        {/* for not logged users */}
        <Route element={<IsLoggedOut />}>
          <Route path={serverUrls.login} element={<LoginPage />} />
          <Route path={serverUrls.register} element={<RegisterPage />} />
          <Route path={serverUrls.otp} element={<Otp />} />
        </Route>

        {/* protected routes, for logged in users */}
        <Route element={<IsLoggedIn />}>
          <Route path={serverUrls.home} element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
