import { Button, Screen } from "@/components";
import { GOOGLE_WEB_CLIENT_ID, SCREENS } from "@/constants";
import { authService } from "@/services";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import styles from "./styles";
import { setUserInfo } from "@/redux";

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
          .then(async (res) => {
            if (res.statusCode === 200) {
              dispatch(setUserInfo(res));
              navigation.reset({
                index: 0,
                routes: [{ name: SCREENS.MAIN_BOTTOM_TAB }],
              });
            } else {
              await GoogleSignin.signOut();
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
