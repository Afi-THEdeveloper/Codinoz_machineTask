import React from "react";
import MyH1 from "../components/myH1";
import Navbar from "../components/navbar";
import ProfileCard from "../components/profileCard";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <Navbar username={"afsal"} />
      <ProfileCard user={user} />
    </div>
  );
};

export default Home;
