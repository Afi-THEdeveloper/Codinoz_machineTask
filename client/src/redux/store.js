import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./slices/loadingSlice";
import AuthSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    loadings: loadingSlice,
    auth: AuthSlice,
  },
});

export default store;
