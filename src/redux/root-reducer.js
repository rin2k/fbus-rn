import { combineReducers } from "@reduxjs/toolkit";
import { appReducer, driverReducer, taskReducer, userReducer } from "./slices";

const rootReducer = combineReducers({
  user: userReducer,
  task: taskReducer,
  driver: driverReducer,
  app: appReducer,
});

export default rootReducer;
