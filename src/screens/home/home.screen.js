import { Header, Screen } from "@/components";
import { SCREENS } from "@/constants";
import { getCoordinationsService } from "@/services";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import ListItem from "./component/list-item";
import styles from "./styles";
import { all } from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [coordinations, setCoordinations] = useState([]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getCoordinationsService()
        .then((res) => {
          console.log(JSON.stringify(res));
          if (res.statusCode === 200) {
            let newArr = [];
            if (res.data.length != 0) {
              res.data.forEach((element) => {
                if (element.status === "FINISHED") {
                  newArr.push(element);
                } else {
                  newArr.unshift(element);
                }
              });
            }

            setCoordinations(newArr);
          } else {
            alert("Internal server error");
          }
        })
        .catch((error) => {
          alert("Internal server error");
          console.log("Err:", JSON.stringify(error));
        });
    });

    return unsubscribe;
  }, [navigation]);

  const onPressItem = (item) => {
    const fitlerOngoingArr = coordinations.filter(
      (e) => e?.status == "ONGOING"
    );

    const enableToogle = () => {
      if (item.status == "ONGOING") {
        return true;
      } else if (fitlerOngoingArr.length !== 0) {
        return false;
      } else {
        return true;
      }
    };

    navigation.navigate(SCREENS.COORDINATION_DETAIL, {
      id: item.id,
      routeId: item.routeId,

      hideToggle: enableToogle(),
    });
  };

  return (
    <Screen>
      <Header title={"HOME"} backVisible={false} />
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
