import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons'
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { app_db } from '../../../firebaseConfig'
import { collection, documentId, onSnapshot, query, where, updateDoc, doc } from 'firebase/firestore'

export function Parabens({navigation}){
    
    return(
        <SafeAreaView style={styles.itemlist} >
                <View style={styles.thankyou} >
                    <FontAwesome name="thumbs-up" size={175} color={"#1ba0d8"} />
                    <Text style={styles.thankyoutxt} >Parabéns, você nos deu dinheiro!</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.gobackbutton} >
                        <Text style={styles.gobacktxt} >MENU PRINCIPAL</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    itemlist:{
        backgroundColor: "#FFF", 
        borderRadius: 25, 
        width: "100%", 
        flex: 1,
        paddingTop: 15
    },
    thankyou:{
        backgroundColor: "#FFF", 
        borderRadius: 25, 
        width: "100%", 
        flex: 1,
        paddingTop: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    thankyoutxt:{
        fontWeight: "bold",
        width: "90%",
        textAlign: "center",
        fontSize: 25,
        marginTop: 35
    },
    gobackbutton:{
        marginTop: "25%",
        alignItems: "center",
        justifyContent: "center",
        width: "85%",
    },
    gobacktxt:{
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
        fontSize: 19,
        backgroundColor: "#1ba0d8",
        color: "#FFF",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 15
    }

})