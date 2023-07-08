import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 storeLocation :"",
 deliveryLocation:{}
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    locationRedux: (state, action) => {
      state.storeLocation = action.payload;
    },
    deliveryLocationRedux:(state,action)=>{
      state.deliveryLocation = action.payload
    }
  },
});

export const { locationRedux,deliveryLocationRedux } = locationSlice.actions;

export default locationSlice.reducer;
