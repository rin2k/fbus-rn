import { Button, Header, Screen } from "@/components";
import { Images, SCREENS } from "@/constants";
import { removeTask, removeUser } from "@/redux";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Alert, View, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import ListItem from "./components/list-item";
import { FlatList } from "react-native-gesture-handler";
import { getCoordinationService } from "@/services";
import moment from "moment";
import SupportButton from "./components/support-button";

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

  const dataUser = useSelector((state) => state?.driver);
  


  const userInfo = useSelector((state) => state?.user);
  console.log(userInfo)
  const UserData = [
    {
      lable: "Name",
      value: userInfo.userInfor.name,
    },
    {
      lable: "Code",
      value: userInfo.userInfor.code,
    },

    {
      lable: "Role",
      value: userInfo.userInfor.role,
    },
  ];

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
      <Header backVisible={false} title={"PROFILE"} />
      <View style={{ alignContent: "center", alignItems: "center", paddingVertical : 30 }}>
        <Image
          style={styles.image}
          source={{ uri: userInfo.userInfor.picture }}
        />
      </View>

        <FlatList
          data={UserData}
          renderItem={({ item }) => {
            return <ListItem lable={item.lable} value={item.value} />;
          }}
        />


      <View style={{alignItems: "center", marginBottom: 20}}>
        <Button   title={"Logout"} onPress={handleLogout} />
      </View>

      <Screen>
        <SupportButton/>
      </Screen>
    </Screen>
  );
};

export default ProfileScreen;
