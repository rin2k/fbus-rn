import { combineReducers } from "@reduxjs/toolkit";
import { taskReducer, userReducer } from "./slices";

const rootReducer = combineReducers({
  user: userReducer,
  task: taskReducer,
});

export default rootReducer;
