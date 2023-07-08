import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import productSliceReducer from "./productSlice";
import bannerSliceReducer from "./bannerSlice"
import locationSliceReducer from "./locationSlice"
import orderSliceReducer from "./orderSlice"
import guestSliceReducer from "./guestSlice"



export const store = configureStore({
  reducer: {
    user : userSliceReducer,
    product :  productSliceReducer ,
    banner : bannerSliceReducer,
    location : locationSliceReducer,
    order: orderSliceReducer,
    guest: guestSliceReducer,
  }
})


