import { Images } from "@/constants";
import PropTypes from "prop-types";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

const Screen = (props) => {
  const { children, withImageBlur } = props;
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {withImageBlur ? (
        <ImageBackground
          source={Images.background}
          style={styles.imageBackground}
          imageStyle={styles.imageOpacity}
        >
          {children}
        </ImageBackground>
      ) : (
        children
      )}
    </View>
  );
};

Screen.propTypes = {
  children: PropTypes.node.isRequired,
  withImageBlur: PropTypes.bool,
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  imageOpacity: {
    opacity: 0.7,
  },
});

export default Screen;
