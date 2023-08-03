import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "@/styles";

const ListItem = (props) => {
  const { label, value } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  label: {
    color: colors.black,
    fontWeight: "bold"
  },
  value: {
    color: colors.black,
    
  },
});

export default ListItem;
