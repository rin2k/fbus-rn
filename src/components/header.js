import { STATUS_BAR_HEIGHT } from "@/constants";
import { colors, fontSizes, fonts } from "@/styles";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

const Header = (props) => {
  const { title, onBackPress, backVisible = true, rightComponent } = props;
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.canGoBack() && navigation.goBack();
    }
  };

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <View style={styles.linearGradient}>
        <TouchableOpacity
          onPress={handleBack}
          disabled={!backVisible}
          style={styles.rightLeftContainer}
        >
          {backVisible && (
            <Icon name="chevron-thin-left" size={24} color={colors.white} />
          )}
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View style={styles.rightLeftContainer}>{rightComponent}</View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: STATUS_BAR_HEIGHT + 40,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: STATUS_BAR_HEIGHT,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
  },
  title: {
    flex: 4,
    textAlign: "center",
    fontSize: fontSizes.h3,
    fontFamily: fonts.semiBold,
    color: colors.white,
    marginHorizontal: 10,
  },
  rightLeftContainer: {
    flex: 1,
  },
});

export default Header;
