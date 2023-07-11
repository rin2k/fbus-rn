import { colors, fonts } from "@/styles";
import { TabActions } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomTabBar = (props) => {
  const { state, descriptors, navigation } = props;

  const insets = useSafeAreaInsets();
  const bottomInsets = insets.bottom;
  const bottomBarHeight = 50 + (bottomInsets > 0 ? bottomInsets - 10 : 5);

  const tabs = [
    {
      label: "Home",
    },
    {
      label: "Profile",
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          height: bottomBarHeight,
        },
      ]}
    >
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPressTab = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.dispatch({
                ...TabActions.jumpTo(route.name),
                target: state.key,
              });
            }
          };

          const colorText = isFocused ? colors.black : "grey";

          return (
            <Pressable onPress={onPressTab} key={index} style={styles.tab}>
              <Text style={[styles.title, { color: colorText }]}>
                {tabs[index].label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: fonts.medium,
  },
});

export default CustomTabBar;
