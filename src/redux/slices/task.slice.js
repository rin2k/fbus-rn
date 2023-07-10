import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  busId: undefined,
  code: undefined,
  routeId: undefined,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, action) => {
      state = action.payload;
      return state;
    },
    removeTask: (state) => {
      state = { ...initialState };
      return state;
    },
  },
});

const { reducer, actions } = taskSlice;

export const { setTask, removeTask } = actions;

export default reducer;
