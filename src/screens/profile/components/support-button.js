import { colors } from '@/styles';
import React from 'react';
import { View, Text, TouchableOpacity, Linking, Platform, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

const SupportButton = () => {
  const phoneNumber = '0348464213'; // Số điện thoại hỗ trợ của bạn

  const handleSupportPress = () => {
    // Kiểm tra nếu thiết bị hỗ trợ tính năng gọi điện thoại
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      // Sử dụng thư viện Linking để mở ứng dụng điện thoại và hiển thị số gọi trực tiếp
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      console.log('Không hỗ trợ tính năng gọi điện thoại trên thiết bị này.');
    }
  };

  return (
    <TouchableOpacity onPress={handleSupportPress} style={styles.supportButton}>
    <View style={styles.container}>
    <Icon name="bell" size={25} color={'red'}/>
      <Text style={styles.supportButtonText}>Call Rescue</Text>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
    flexDirection: 'row'
    },
  supportButton: {
    backgroundColor: 'grey',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  supportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20
  },
});

export default SupportButton;
