import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setDriverInfo: (state, action) => {
      return action.payload;
    },
  },
});

const { reducer, actions } = driverSlice;
export const { setDriverInfo } = actions;
export default reducer;
