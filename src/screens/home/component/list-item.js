import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const ListItem = props => {
  const {data, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text>Bus code: {data.busCode}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'orange',
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: 'white',
  },
});

export default ListItem;
