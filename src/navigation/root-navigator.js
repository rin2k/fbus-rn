import { SCREENS } from "@/constants";
import {
  CoordinationDetailScreen,
  LoginScreen,
  TripStatusesScreen,
} from "@/screens";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useSelector } from "react-redux";
import MainBottomTab from "./main-bottom-tab";

const Stack = createStackNavigator();


export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    // Perform navigation if the react navigation is ready to handle actions
    navigationRef.navigate(name, params);
  } else {
    // You can decide what to do if react navigation is not ready
    // You can ignore this, or add these actions to a queue you can call later
  }
}

const RootNavigator = () => {
  const user = useSelector((state) => state?.user);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={
          user?.userInfor?.accessToken ? SCREENS.MAIN_BOTTOM_TAB : SCREENS.LOGIN
        }
      >
        <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
        <Stack.Screen
          name={SCREENS.MAIN_BOTTOM_TAB}
          component={MainBottomTab}
        />
        <Stack.Screen
          name={SCREENS.COORDINATION_DETAIL}
          component={CoordinationDetailScreen}
        />
        <Stack.Screen
          name={SCREENS.TRIP_STATUSES}
          component={TripStatusesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
