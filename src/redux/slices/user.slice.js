import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfor: {
    accessToken: undefined,
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIiLCJSb2xlIjoiQWRtaW4iLCJleHAiOjE2OTEzMDM0ODEsImlzcyI6IkZCdXNfU1dQIiwiYXVkIjoiRkJ1c19TV1AifQ.vXkop_kEtzEEx3BD-3gT5E4EEVivpMSHNLJ3VChOYGs",
    refreshToken: undefined,
    role: undefined,
    code: undefined,
    name: undefined,
    picture: undefined,
  },
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfor = action.payload;
      state.isLoggedIn = true;
    },
    removeUser: (state) => {
      state = { ...initialState };
      return state;
    },
  },
});

const { reducer, actions } = userSlice;

export const { setUserInfo, removeUser } = actions;

export default reducer;
