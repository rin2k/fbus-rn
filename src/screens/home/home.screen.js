import { Header, Screen } from "@/components";
import { SCREENS } from "@/constants";
import { getCoordinationsService } from "@/services";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import ListItem from "./component/list-item";
import styles from "./styles";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [coordinations, setCoordinations] = useState([]);

  useEffect(() => {
    getCoordinationsService()
      .then((res) => {
        console.log(res);
        if (res.statusCode === 200) {
          setCoordinations(res.data);
        }
      })
      .catch((error) => {
        console.log("Err:", JSON.stringify(error));
      });
  }, []);

  const onPressItem = (item) => {
    navigation.navigate(SCREENS.COORDINATION_DETAIL, {
      id: item.id,
      routeId: item.routeId,
      //mang theo ID qua màn hình detail
    });
  };

  return (
    <Screen>
      <Header title={"Home"} backVisible={false} />
      <View style={styles.container}>
        <FlatList
          data={coordinations}
          renderItem={({ item }) => {
            return (
              <ListItem
                data={item}
                onPress={() => {
                  onPressItem(item);
                }}
              />
            );
          }}
          style={styles.list}
        />
      </View>
    </Screen>
  );
};

export default HomeScreen;
