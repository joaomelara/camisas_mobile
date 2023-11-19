import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert, TextInput, ActivityIndicator, KeyboardAvoidingView, ImageBackground } from 'react-native';
import React, {useState, useEffect} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { app_auth, app_db } from '../../../firebaseConfig';



export function Cadastro({ navigation }){

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const [loading, setLoading] = useState(false);
    
    const Registrar = async () => {
      setLoading(true)
      if(nome == ""){
          alert("Preencha o seu nome!")
          setLoading(false)
      } else if(email == "") {
          alert("Preencha o seu email!")
          setLoading(false)
      } else if(senha == "") {
          alert("Preencha a sua senha!")
          setLoading(false)
      } else {
          try{
          
              const response = await createUserWithEmailAndPassword(app_auth, email, senha)

              await setDoc(doc(app_db, "Usuarios", response.user.uid), {
                  Nome : nome,
                  Carrinho: [],


              })
              alert("Usuário Criado com sucesso!")
              navigation.navigate("Home")
          } catch (error) {
              console.log("erro: "+error)
              if(error == "FirebaseError: Firebase: Error (auth/invalid-email)."){
                  alert("Email inválido!")
              } else if(error == "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)."){
                  alert("Senha fraca, coloque uma com pelo menos 6 caracteres.")
              } else {
                  alert("Ocorreu um erro com seu cadastro: " + error)
              }
              
          } finally{
              setLoading(false)
          }
      }
  }

    return(
        <SafeAreaView style={styles.container}>
        
        <View style={styles.areaLogo} >
                <Image style={styles.Logo} source={require('../../assets/logocCamisa.png')}/>
         </View>
        <View style={styles.areaEscreve}>
          <TextInput value={nome} onChangeText={(text) => setNome(text)} style={styles.input} placeholder='Nome do Felizardo' autoCapitalize='none'></TextInput>
          <TextInput value={email} onChangeText={(text) => setEmail(text)} style = {styles.input} placeholder='Email do Felizardo' autoCapitalize='none'
        ></TextInput>
          <TextInput value={senha} onChangeText={(text) => setSenha(text)} style = {styles.input} placeholder='Senha do Felizardo' autoCapitalize='none' secureTextEntry={true}
          ></TextInput>
          <TextInput value={senha} onChangeText={(text) => setSenha(text)} style = {styles.input} placeholder='Confirmar Senha' autoCapitalize='none' secureTextEntry={true}
          ></TextInput>
        </View>
        

        
        <View style={styles.areaBotao}>
                {loading ? (
                  <ActivityIndicator size={40} color="#0000ff" />
                ) : (
                    <TouchableOpacity onPress={Registrar} style={styles.buttonRegistro} >
                        <Text style={styles.text} >Cadastrar</Text>
                    </TouchableOpacity>
                
                )}
        </View>

    </SafeAreaView  >
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    
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
   buttonRegistro:{
    marginTop: 50,
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
   text:{
    color: "#FFF",
    fontSize: 20
   },
   fundo:{
    backgroundColor: 'White'
   },
    areaBotao:{
    width: "100%",
    paddingStart: 20,
    paddingEnd: 20,
    alignItems: 'center'
},
Logo:{
    width: 215.64,
    height: 80.28,
    marginBottom: 20
},
areaLogo:{
  marginBottom: 30
}

  
   
  });