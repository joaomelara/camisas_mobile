import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { app_auth } from '../../../firebaseConfig';

export function Login({ navigation }){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false);

    const Login = async () => {
        setLoading(true);
        if(email == "") {
            alert("Preencha o seu email!")
            setLoading(false)
        } else if(senha == "") {
            alert("Preencha a sua senha!")
            setLoading(false)
        } else {
            try {
                await signInWithEmailAndPassword(app_auth, email, senha);
                navigation.navigate("Home");
            } catch (error) {
                console.log(error);
                if(error == "FirebaseError: Firebase: Error (auth/invalid-email)."){
                    alert("Email inválido!")
                } else if(error == "FirebaseError: Firebase: Error (auth/invalid-login-credentials)."){
                    alert("Email ou senha errada!")
                } else{
                    alert("Ocorreu um erro com seu login: " + error)
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return(
        <SafeAreaView style={styles.container} >
            <View style={styles.areaLogo} >
                <Image style={styles.Logo} source={require('../../assets/logocCamisa.png')}/>
            </View>
            <View style={styles.areaEscreve} >
                <TextInput placeholder="Insira a porcaria do seu email" style={styles.input} value={email} onChangeText={(text) => setEmail(text)} autoCapitalize="none" />
                <TextInput placeholder="Insira a porcaria da sua senha" style={styles.input} value={senha} onChangeText={(text) => setSenha(text)} secureTextEntry={true} autoCapitalize="none" />
            </View>
            <View style={styles.areaBotao} >
                {loading ? (
                <ActivityIndicator size={40} color="#0000ff" />
                ) : (
                    <TouchableOpacity onPress={Login} style={styles.login} >
                        <Text style={styles.acao} >Entrar</Text>
                    </TouchableOpacity>
                
                )}
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
        marginBottom: 40
    },
    Logo:{
        width: 215.64,
        height: 80.28
    },
    areaEscreve:{
        width: "100%",
        paddingStart: 20,
        paddingEnd: 20,
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#FFFFFF',
          margin: 10,
          borderWidth: 2,
          borderRadius: 10,
          borderColor: "#ADD8E6",
          width: "100%",
          alignSelf: 'center',
          height: 60,
          textAlign:'center',
          fontSize: 18
    },
    areaBotao:{
        width: "100%",
        paddingStart: 20,
        paddingEnd: 20,
        alignItems: 'center'

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