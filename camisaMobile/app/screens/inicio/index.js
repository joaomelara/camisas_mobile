import { StyleSheet, Text, View, Image, TouchableOpacity} from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';

export function Inicio({ navigation }){
    return(
        <SafeAreaView style={styles.container} >
            <View style={styles.areaLogo} >
                <Image style={styles.Logo} source={require('../../assets/logocCamisa.png')}/>
            </View>
            <View style={styles.areaBotao} >
                <TouchableOpacity onPress={() =>  navigation.navigate("Cadastro")} style={styles.registrar} >
                    <Text style={styles.acao} >Registrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>  navigation.navigate("Login")} style={styles.login} >
                    <Text style={styles.acao} >Login</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    areaLogo:{

    },
    Logo:{
        width: 287.52,
        height: 107.04
    },
    areaBotao:{
        width: "100%",
        paddingStart: 20,
        paddingEnd: 20,
        alignItems: 'center'
    },

    registrar:{
        marginTop: 75,
        backgroundColor: "#1ba0d8",
        height: 60,
        width: "100%",
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "rgba(0,0,0,0.75)", 
        borderWidth: 3.5,
        borderBottomWidth: 6
    },
    login:{
        marginTop: 45,
        backgroundColor: "#083041",
        height: 60,
        width: "100%",
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "rgba(0,0,0,0.75)", 
        borderWidth: 3.5,
        borderBottomWidth: 6
    },
    acao:{
        color: "#FFF",
        fontSize: 20
    }
    
})