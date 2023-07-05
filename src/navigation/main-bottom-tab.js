import { CustomTabBar } from "@/components";
import { SCREENS } from "@/constants";
import { HomeScreen, ProfileScreen } from "@/screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

const Tab = createBottomTabNavigator();
const MainBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => {
        return <CustomTabBar {...props} />;
      }}
    >
      <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainBottomTab;
