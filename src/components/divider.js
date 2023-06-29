import {colors} from '@/styles';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
});

export default Divider;
