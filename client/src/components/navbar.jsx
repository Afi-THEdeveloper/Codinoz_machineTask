import React from "react";
import { useNavigate } from "react-router-dom";
import { serverUrls } from "../utils/serverUrls";

const Navbar = ({ username }) => {
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-500 p-4 flex justify-between items-center">
      <div
        onClick={() => navigate(serverUrls.landing)}
        className="text-white text-lg font-bold uppercase cursor-pointer"
      >
        Codinoz
      </div>
      <div className="flex items-center">
        <div className="text-white text-lg font-bold">Welcome {username} </div>
        <img
          src="/images/avatar.png"
          alt="Profile"
          className="rounded-full w-8 h-8"
        />
      </div>
    </nav>
  );
};

export default Navbar;
