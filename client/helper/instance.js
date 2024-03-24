import axios from "axios";
import { API_BASE_URL } from "../config/api";
import toast from "react-hot-toast";

const user = axios.create({ baseURL: API_BASE_URL });

export const userRequest = ({ ...options }) => {
  //the Authorization header
  user.defaults.headers.common.Authorization = JSON.parse(
    localStorage.getItem("UserToken")
  );
  const onSuccess = (response) => response;
  const onError = (error) => {
    console.log("axios interceptor", error);
    toast.error(error?.response?.data?.error);
    return error;
  };
  return user(options).then(onSuccess).catch(onError);
};  
