import { View, Text, StyleSheet, Image,TextInput, ScrollView, TouchableOpacity} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { app_auth, app_db } from '../../../firebaseConfig';
import { doc , collection, query, where, onSnapshot, documentId} from 'firebase/firestore';
import { useEffect, useState} from 'react'
import { FontAwesome } from 'react-native-vector-icons';




export function Produto({ navigation, route }){
    const [Produtos, setProdutos] = useState({});
    useEffect(() => {
        const ProdutosRef = collection(app_db, 'Produtos')
  
  
        const q = query(
          ProdutosRef,

          where 
          (documentId(),'==', route.params.Chave[0])
          
        )
        const subscriver = onSnapshot(q, {
          next : (snapshot) => {
            const produtos = []
            snapshot.docs.forEach(doc =>{
              produtos.push({
                key : doc.id,
                ...doc.data(),
                
              })
            })
            setProdutos(produtos[0])
            console.log(Produtos)
            console.log(route.params.Chave[0])
            // console.log(ProdutosRef)
            
            
          }
        })
        
       
        return() => subscriver()
      },[])

    return(
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.areaPesquisa} >
                <TextInput placeholder="Pesquise sua pesquisa" style={styles.pesquisa} autoCapitalize="none" />
                <FontAwesome style={styles.iconePesquisa} name="search" size={28} />
            </View>

    {Produtos ? (
                    <View style={{ flex: 1, display: 'flex', alignItems: 'center' }} >
                        <View style={styles.areaTitulo} >
                        
                          <Image style={styles.Imagem} source={{uri : Produtos.image}} /> 
                          <Text style={styles.titProduto} >{Produtos.Nome}</Text>
                          </View>

                          <View style ={styles.areaDesc}>
                          <Text style={styles.preco}>R$ {Produtos.Preco},00</Text>
                          <Text style={styles.juros}>ou em {Produtos.Preco}X sem juros de R$1</Text>
                          <Text style={styles.pagamentos}>Meios de pagamento: tudo que você tem</Text>
                          <Text style={styles.cor}>COR: {Produtos.Cor}</Text>
                          
                          </View>
                          <View style ={styles.areaDesc2}>
                          <Text style={styles.descricao}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                          </View>

                    </View>
                ) : (

                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <ActivityIndicator size={110} color="#38BA9B" />
                    </View>
                )}
                <View style={styles.areaBotao}>
                <TouchableOpacity  style={styles.buttonRegistro}
                onPress={() =>  navigation.navigate("Carrinho")} >
                        <Text style={styles.text} >Adicionar ao Carrinho</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
      imagearea:{
        alignItems: 'center'
      },
      Imagem:{
        height: 250,
        width: 250,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#106082",
        marginTop: 30,
        marginBottom: 10
      },
      areaTitulo:{
        fontWeight: 'bold',
        fontSize: 20,
        alignItems: 'center'
      },
      titProduto:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#106082'
        
      },
      areaPesquisa:{
        paddingStart: 20,
        paddingEnd: 20,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: 75,
        marginTop: 15,
        borderBottomWidth: 3,
        borderColor: "#c9c9c9"
    },
    pesquisa: {
        backgroundColor: '#FFFFFF',
          margin: 10,
          borderWidth: 2,
          borderRadius: 10,
          borderColor: "#ADD8E6",
          width: "100%",
          alignSelf: 'center',
          height: "100%",
          fontSize: 18,
          paddingRight: 50,
          paddingLeft: 20
    },
    iconePesquisa:{
        position: 'absolute',
        alignSelf: 'flex-end',
        paddingRight: 40,
        paddingBottom: 2,
        color: "#1ba0d8"
    },
    preco:{
        alignSelf: "flex-start",
        fontSize: 28,
        marginTop: 15,
        marginLeft: -20,
        color: "#000"
        
    },
    juros:{
        alignSelf: "flex-start",
        fontSize: 18,
        marginTop: 3,
        marginLeft: -20,
        color: "#7a7a7a"
    },
    pagamentos:{
        alignSelf: "flex-start",
        fontSize: 14,
        marginTop: 20,
        marginLeft: -20,
        color: "#24b268"
    },
    areaDesc:{
        
    },
    cor:{
      alignSelf: "flex-start",
        fontSize: 14,
        marginTop: 20,
        marginLeft: -20,
        color: "#000",
        fontWeight: "bold"
    },
    areaDesc2:{
        paddingHorizontal: 50,
        opacity: 0.5,
        textAlign: 'center',
        marginTop: 5
        
    },
    buttonRegistro:{
      marginTop: 30,
      marginBottom: 30,
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
    descricao:{
      justifyContent: "center",
      textAlign: 'justify'
    },
    areaBotao:{
      width: "100%",
      paddingStart: 20,
      paddingEnd: 20,
      alignItems: 'center'
  },
  text:{
    color: "#FFF",
    fontSize: 20
   },
})