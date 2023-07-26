import { colors, fonts } from "@/styles";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Button = (props) => {
  const {
    title,
    onPress,
    disabled,
    block,
    uppercase,
    size = "medium",
    style,
    iconLeft,
  } = props;

  const backgroundColor = colors.primary;
  const buttonSizes = {
    small: {
      height: 30,
      paddingHorizontal: 8,
    },
    medium: {
      height: 34,
      paddingHorizontal: 12,
    },
    large: {
      height: 44,
      paddingHorizontal: 16,
    },
  };
  const colorText = colors.white;

  const handleOnPress = () => {
    if (!disabled) {
      onPress?.();
    }
  };

  return (
    <>
      <View style={[!block && styles.block]}>
        <TouchableOpacity
          onPress={handleOnPress}
          style={[
            styles.container,
            buttonSizes[size],
            { backgroundColor },
            style,
          ]}
        >
          {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
          <Text
            style={[
              styles.title,
              uppercase && { textTransform: "uppercase" },
              {
                color: colorText,
              },
            ]}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  title: {
    textAlign: "center",
    fontFamily: fonts.medium,
  },
  iconLeft: {
    marginRight: 12,
  },
});

export default Button;
