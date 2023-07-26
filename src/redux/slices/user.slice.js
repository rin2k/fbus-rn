import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfor: {
    accessToken: undefined,
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
