import {STATUS_BAR_HEIGHT} from '@/constants';
import {colors, fontSizes, fonts} from '@/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Header = props => {
  const {title} = props;
  return (
    <>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.linearGradient}>
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: STATUS_BAR_HEIGHT + 60,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: STATUS_BAR_HEIGHT,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSizes.h3,
    fontFamily: fonts.semiBold,
  },
});

export default Header;
