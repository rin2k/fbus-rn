import { RootNavigator } from "@/navigation";
import { persistor, store } from "@/redux";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useLocation } from "@/hooks";
import "./config/ignore-warnings";
import { Loading } from "./components";

const RootApp = () => {
  useLocation();
  const isLoading = useSelector((state) => state.app.loading);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={"transparent"}
        translucent
        barStyle={"dark-content"}
      />
      <SafeAreaProvider>
        <RootNavigator />
        {isLoading && <Loading />}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
