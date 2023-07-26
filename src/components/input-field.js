import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

const InputField = (props) => {
  const { label, errorText, ...rest } = props;
  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...rest} />
      {errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    // marginBottom: 10,
    paddingHorizontal: 12,
  },
  error: {
    color: "red",
  },
});

export default InputField;
