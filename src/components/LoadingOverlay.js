import React from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#D22F26" />
      <Text style={styles.text}>Login...</Text>
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#CBCBCB",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#D22F26",
  },
});
