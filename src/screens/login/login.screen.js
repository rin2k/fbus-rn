import { Button, Screen } from "@/components";
import { GOOGLE_WEB_CLIENT_ID, SCREENS } from "@/constants";
import { setUserInfo } from "@/redux";
import { authService } from "@/services";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import styles from "./styles";

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  offlineAccess: false,
  scopes: ["profile", "email"],
  forceCodeForRefreshToken: false,
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn({
        showPlayServicesUpdateDialog: true,
      });
      if (userInfo?.idToken) {
        authService(userInfo.idToken)
          .then((res) => {
            if (res.statusCode === 200) {
              // dispatch(setUserInfo(res.data));
              navigation.reset({
                index: 0,
                routes: [{ name: SCREENS.HOME }],
              });
            } else {
              alert("Unauthorized");
            }
          })
          .catch((error) => {});
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen withImageBlur>
      <View style={styles.container}>
        <Button title={"Login"} block onPress={handleLogin} />
      </View>
    </Screen>
  );
};

export default LoginScreen;
