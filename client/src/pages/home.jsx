import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import ProfileCard from "../components/profileCard";
import { useDispatch, useSelector } from "react-redux";
import {userRequest} from "../../helper/instance";
import { apiEndpoints } from "../utils/api";
import { hideLoading, showLoading } from "../redux/slices/loadingSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // fetch user from redux store

  useEffect(() => {
    dispatch(showLoading());
    userRequest({ url: apiEndpoints.fetchUserDetails, method: "get" })
      .then((res) => {
        if (res?.data?.success) {
          setUserDetails(res?.data?.user);
        }
      })
      .catch((err) => {
        toast.error("Error fetching user", err.message);
        console.error(err);
      })
      .finally(() => {
        dispatch(hideLoading());
      });
  }, []);
  return (
    <div>
      <Navbar username={user?.username} />
      <ProfileCard user={userDetails} />
    </div>
  );
};

export default Home;
