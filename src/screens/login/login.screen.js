import { Button, Screen } from "@/components";
import { GOOGLE_WEB_CLIENT_ID, SCREENS } from "@/constants";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import styles from "./styles";

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  offlineAccess: false,
  scopes: ["profile", "email"],
  forceCodeForRefreshToken: false,
});

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleLogin = async () => {
    navigation.navigate(SCREENS.COORDINATION_DETAIL);
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn({
    //     showPlayServicesUpdateDialog: true,
    //   });

    //   if (userInfo?.idToken) {
    //     console.log(userInfo?.idToken);
    //     // navigation.reset({
    //     //   index: 0,
    //     //   routes: [{ name: SCREENS.HOME }],
    //     // });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
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
