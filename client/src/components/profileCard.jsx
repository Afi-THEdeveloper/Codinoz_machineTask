import React from "react";
import MyButton from "./myButton";
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const ProfileCard = ({ user, onlogout }) => {
  const dispatch = useDispatch()  
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="relative max-w-md mx-auto md:max-w-2xl mt-[200px] min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full flex justify-center">
            <div className="relative">
              <img
                src={`images/${user?.profile}`}
                className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                alt="Profile"
              />
            </div>
          </div>
          <div className="w-full text-center mt-20">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {user?.username}
            </h3>
            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              user
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-slate-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4">
              <p className="font-light leading-relaxed text-slate-600 mb-4">
                Email : {user?.email} <br />
                Address : {user?.address} <br />
                Phone : {user?.phone} <br />
              </p>
              <button
                onClick={handleLogout}
                className="bg-slate-500 p-8 hover:bg-red-700 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
