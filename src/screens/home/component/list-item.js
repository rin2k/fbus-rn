import { colors, fonts } from "@/styles";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const ListItem = (props) => {
  const { data, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.busCode}>{data?.bus?.code}</Text>
      <Text style={styles.destination}>
        <Icon name="arrow-circle-right" size={25} color={colors.black} />
        {data?.route?.destination}
      </Text>
      <Text style={styles.beginning}>
        <Icon name="flag" size={25} color={colors.black} />
        {data?.route?.beginning}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
    borderRadius: 4,
  },
  beginning: {
    fontFamily: fonts.medium,
    fontSize: 20,
  },
  destination: {
    fontFamily: fonts.medium,
    fontSize: 20,
  },
  busCode: {
    fontFamily: fonts.medium,
  },
});

export default ListItem;
