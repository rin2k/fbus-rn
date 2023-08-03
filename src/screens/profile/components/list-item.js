import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

function ListItem({lable, value}){
    return (
        <View style ={styles.container}>
            <Text style={styles.text}>{lable}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>

    )
} 
export default ListItem
 const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        margin: 16,
    },
    text: {
        fontSize:18,
        color: 'blue',
        fontWeight: 'bold',
    },
    value: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    }

 })
