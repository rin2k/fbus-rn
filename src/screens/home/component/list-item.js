import { colors, fonts } from "@/styles";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ListItem = (props) => {
  const { data, onPress } = props;
  const backgroundColor = data?.status === "ACTIVE" ? "#0DB14B" : data?.status === "ONGOING" ?  "#0DB14B" : '#ec9054' ;

  return (
    
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.busCode}>{data?.bus?.code}</Text>
      <View style={styles.rowContainer}>
        <Icon name="arrow-circle-right" size={25} color='#E61A23' />
        <Text style={styles.beginning}>{data?.route?.beginning}</Text>
        
        
      </View>
      <View style={styles.rowContainer}>
        <Icon name="flag" size={25} color='#rgb(0,77,1)' />
        <Text style={styles.destination}>{data?.route?.destination}</Text>
      </View>
     
      <View style={{backgroundColor: backgroundColor, borderRadius: 4}}>
      <Text style={styles.status}>Status:  {data?.status}</Text>
      </View>
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderColor: '#ec9054',
    marginBottom: 10,
    borderRadius: 2,
    borderWidth: 2,
    borderRadius: 10,
  },
  status:{
    padding: 4,
    fontSize: 20,
    fontWeight: "bold",
    color: 'black',
    borderRadius: 4,

  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    padding: 5
  },
  beginning: {
    fontFamily: fonts.medium,
    fontSize: 20,
    marginLeft: 30,
    fontWeight: "bold",
    color: 'black'
  },
  destination: {
    fontFamily: fonts.medium,
    fontSize: 20,
    marginLeft: 30,
    fontWeight: "bold",
    color: 'black'
  },
  busCode: {
    fontFamily: fonts.medium,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    color: 'black',
    textAlign: "center"
  },
});

export default ListItem;
