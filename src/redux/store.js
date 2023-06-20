import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import productSliceReducer from "./productSlice";
import bannerSliceReducer from "./bannerSlice"




export const store = configureStore({
  reducer: {
    user : userSliceReducer,
    product :  productSliceReducer ,
    banner : bannerSliceReducer
  }
})


