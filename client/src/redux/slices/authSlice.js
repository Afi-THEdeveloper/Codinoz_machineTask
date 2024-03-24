import { createSlice } from "@reduxjs/toolkit";
import { apiEndpoints } from "../../utils/api";
import { toast } from "react-hot-toast";
import { hideLoading, showLoading } from "./loadingSlice";
import { userRequest } from "../../../helper/instance";

const initialState = {
  isError: false,
  isSuccess: false,
  errorMsg: "",
  message: "",
  user: JSON.parse(localStorage.getItem("userInfo")) || {},
  token: JSON.parse(localStorage.getItem("UserToken")) || null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isSuccess = true;
      state.isError = false;
      state.user = action.payload.user;
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("UserToken", JSON.stringify(action.payload.token));
      state.token = action.payload.token;
      state.message = action.payload.success;
    },
    loginReject: (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.errorMsg = action.payload.error;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("UserToken");
      state.token = null;
      state.user = {};
    },
  },
});

export const loginThunk = (data) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const res = await userRequest({
      url: apiEndpoints.postLogin,
      method: "post",
      data,
    });
    if (res.data?.success) {
      toast.success(res.data.success);
      dispatch(loginSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(loginReject({ error: error.response?.data.error }));
  } finally {
    dispatch(hideLoading());
  }
};

export const { loginSuccess, loginReject, updateUser, logout } =
  AuthSlice.actions;
export default AuthSlice.reducer;
