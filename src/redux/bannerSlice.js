import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: [],
};

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    bannerRedux: (state, action) => {
      state.image = action.payload
    }
  },
});

export const { bannerRedux } = bannerSlice.actions;

export default bannerSlice.reducer;
