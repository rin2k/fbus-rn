import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import CustomModal from "./custom-modal";

const Loading = () => {
  return (
    <CustomModal>
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator />
          <Text style={styles.title}>{"loading"}</Text>
        </View>
      </View>
    </CustomModal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  title: {
    marginTop: 4,
  },
});
