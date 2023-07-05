import { Button, Header, Screen } from "@/components";
import { SCREENS } from "@/constants";
import { removeTask, removeUser } from "@/redux";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, View } from "react-native";
import { useDispatch } from "react-redux";
import styles from "./styles";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await GoogleSignin.signOut();

      // xoá user khỏi redux
      dispatch(removeUser());

      // remove task đang chạy nếu có
      dispatch(removeTask());

      // back về Login
      navigation.reset({
        index: 0,
        routes: [{ name: SCREENS.LOGIN }],
      });
    } catch (error) {}
  };

  const handleLogout = () => {
    Alert.alert("Alert", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          logout();
        },
        style: "cancel",
      },
    ]);
  };
  return (
    <Screen>
      <Header backVisible={false} title={"Profile"} />
      <View style={styles.container}>
        <Button title={"Logout"} block onPress={handleLogout} />
      </View>
    </Screen>
  );
};

export default ProfileScreen;
