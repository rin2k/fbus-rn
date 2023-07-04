import { SCREENS } from "@/constants";
import { CoordinationDetailScreen, HomeScreen, LoginScreen } from "@/screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const RootNavigator = () => {
  const user = useSelector((state) => state?.user);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        // initialRouteName={
        //   user?.userInfor?.accessToken ? SCREENS.HOME : SCREENS.LOGIN
        // }
      >
        <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
        <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
        <Stack.Screen
          name={SCREENS.COORDINATION_DETAIL}
          component={CoordinationDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
