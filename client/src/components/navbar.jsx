import React from "react";

const Navbar = ({ username }) => {
  return (
    <nav className="bg-gray-500 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold uppercase">Codinoz</div>
      <div className="flex items-center">
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
