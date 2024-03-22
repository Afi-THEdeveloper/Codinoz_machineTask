import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./slices/loadingSlice";

const store = configureStore({
    reducer:{
        loadings:loadingSlice,
    }
})

export default store;
