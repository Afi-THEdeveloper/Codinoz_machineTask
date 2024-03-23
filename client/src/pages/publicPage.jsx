import React from "react";
import { Link } from "react-router-dom";
import { serverUrls } from "../utils/serverUrls";
import MyH1 from "../components/myH1";

const PublicPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="mb-6">
          <MyH1 title={"Welcome to Codinoz"} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Link
            to={serverUrls.login}
            className="bg-slate-500 p-12 hover:bg-green-600 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          >
            Login
          </Link>
          <Link
            to={serverUrls.register}
            className="bg-slate-500 p-8 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicPage;
