import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfor: {
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEwIiwiUm9sZSI6IkRSSVZFUiIsImV4cCI6MTY5MDUyODE2OSwiaXNzIjoiRkJ1c19TV1AiLCJhdWQiOiJGQnVzX1NXUCJ9.vAzRqigQSli0AIJnWqBJ92iImskbef7D0bPQsXeAa1s",
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
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
  },
});

const { reducer, actions } = userSlice;

export const { setUserInfo } = actions;

export default reducer;
