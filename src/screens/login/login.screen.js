import { Button, Screen, LoadingOverlay } from "@/components";
import { GOOGLE_WEB_CLIENT_ID, SCREENS } from "@/constants";
import { authService } from "@/services";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import styles from "./styles";
import { setUserInfo } from "@/redux";
import { removeTask, removeUser } from "@/redux";

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  offlineAccess: false,
  scopes: ["profile", "email"],
  forceCodeForRefreshToken: false,
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn({
        showPlayServicesUpdateDialog: true,
      });
      if (userInfo?.idToken) {
        console.log(userInfo?.idToken)
        authService(userInfo.idToken)
          .then(async (res) => {
            setIsLogin(true);
            console.log(res);
            if (res.statusCode === 200) {
              dispatch(setUserInfo(res));
              setIsLogin(false);
              setShowLoading(true);
              setTimeout(() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: SCREENS.MAIN_BOTTOM_TAB }],
                });
              }, 2000);
            } else { 
              await GoogleSignin.signOut();
              dispatch(removeUser());
              alert("Không được phép truy cập");
            }
          })
          .catch((error) => {});
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (showLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Screen withImageBlur>
      <View style={styles.container}>
        <Button title={"Đăng nhập"} block onPress={handleLogin} />
      </View>
    </Screen>
  );
};

export default LoginScreen;
