import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from './slices';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
