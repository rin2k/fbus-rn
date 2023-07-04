import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: undefined,
  code: undefined,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.id = action.payload.id;
      state.code = action.payload.code;
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
