import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer from "./root-reducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["task", "driver", "user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // thac mac có cần dùng không.
});

export default store;
export const persistor = persistStore(store);
