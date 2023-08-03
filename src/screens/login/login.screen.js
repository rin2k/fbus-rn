import { Button, LoadingOverlay, Screen } from "@/components";
import { GOOGLE_WEB_CLIENT_ID, Images, SCREENS } from "@/constants";
import { removeUser, setUserInfo } from "@/redux";
import { authService } from "@/services";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import styles from "./styles";
import { useLoading } from "@/hooks";

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  offlineAccess: false,
  scopes: ["profile", "email"],
  forceCodeForRefreshToken: false,
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { showLoading, hideLoading } = useLoading();

  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn({
        showPlayServicesUpdateDialog: true,
      });
      console.log("ID Token")
      console.log(userInfo.idToken)
      if (userInfo?.idToken) {
        authService(userInfo.idToken)
          .then(async (res) => {
            
            console.log(res);
            showLoading()
            if (res.statusCode === 200) {
              dispatch(setUserInfo(res));
              
              hideLoading();
              setTimeout(() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: SCREENS.MAIN_BOTTOM_TAB }],
                });
              }, 2000);
            } else {
              await GoogleSignin.signOut();
              dispatch(removeUser());
              hideLoading();
              alert("Không được phép truy cập");
            }
          })
          .catch((error) => {
          
          });
      }
    } catch (error) {
      // alert("Internal server error");
      console.log(error);
    }
  };

  

  return (
    <Screen>
      <View style={styles.container}>
        <Image source={Images.location} style={styles.logo} />
        <Text style={styles.welcome}>Welcome to F-Bus</Text>
        <Button
          iconLeft={
            <Image
              source={Images.ic_google}
              resizeMode={"center"}
              style={{
                width: 24,
                height: 24,
              }}
            />
          }
          title={"Login"}
          block
          size={"large"}
          onPress={handleLogin}
        />
      </View>
    </Screen>
  );
};

export default LoginScreen;
