import { SCREENS } from "@/constants";
import {
  CoordinationDetailScreen,
  LoginScreen,
  TripStatusesScreen,
} from "@/screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useSelector } from "react-redux";
import MainBottomTab from "./main-bottom-tab";

const Stack = createStackNavigator();

const RootNavigator = () => {
  const user = useSelector((state) => state?.user);
  return (
    <NavigationContainer>
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
