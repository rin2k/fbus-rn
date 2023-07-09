import { combineReducers } from "@reduxjs/toolkit";
import { driverReducer, taskReducer, userReducer } from "./slices";

const rootReducer = combineReducers({
  user: userReducer,
  task: taskReducer,
  driver: driverReducer,

  // thac mac
});
  
export default rootReducer;
