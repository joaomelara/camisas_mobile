
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from 'react-native-vector-icons';
import { useEffect, useState} from 'react'
import { app_auth, app_db } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, documentId} from 'firebase/firestore'
import Carousel from "../../components/carousel";

export function Home({ navigation }){
    const [Usuario, setUsuario] = useState({})
    const [search, setSearch] = useState("");
    const [carregado, setCarregado] = useState(false)
    const [nomeUsuario, setNomeUsuario] = useState("")

    useEffect(()=>{

        
    
        const userRef = collection(app_db, 'Usuarios')
    
        const q = query(
            userRef,
            where(documentId(), '==', app_auth.currentUser.uid)
        )
    
        
    
        const subscriver = onSnapshot(q, {
            next : (snapshot) => {
                const usuario = []
               
                snapshot.docs.forEach(doc =>{
                 
                    usuario.push({
                        key : doc.id,
                        ...doc.data(),
                       
                    })
                })
                setUsuario(usuario[0])
                setCarregado(true)
           
                if(carregado){
                    var nome = Usuario.Nome
                    var first = nome.split(' ')[0]
                    setNomeUsuario(first)
                   
                }
            
            }
        })

        return() => subscriver()
    
    },[carregado])

    return(
        <SafeAreaView style={styles.container} >

                
                <View style={styles.areaPesquisa} >
                    <TextInput placeholder="Pesquise sua pesquisa" style={styles.pesquisa} autoCapitalize="none" />
                    <FontAwesome style={styles.iconePesquisa} name="search" size={28} />
                </View>
                <View style={styles.areaFiltro}>
                    <Text style={styles.textoDestaques} >Destaques</Text>
                    <TouchableOpacity style={styles.botaoFiltro} >
                        <Text style={styles.textoFiltros} >Filtros</Text>
                        <FontAwesome style={styles.iconeFiltro} name="filter" size={28} />
                    </TouchableOpacity>
            </View>
                <View style={styles.carousel}>
                <Carousel/>
                </View>
            <View style={styles.areaUsuario}>
                <FontAwesome style={styles.iconeUsuario} name="user-circle" size={40} />
                <Text style={styles.nomeUsuario} > Seja bem-vindo, {Usuario.Nome}!</Text>
            </View>
           
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
    areaUsuario:{
        padding: 5,
        width: "90%",
        paddingHorizontal: 20,
        backgroundColor: "#1ba0d8",
        borderRadius: 25,
        marginTop: 25,
        justifyContent: 'center',
        
    },
    iconeUsuario:{
        color: "white",
        position: 'absolute',
        alignSelf: 'flex-start',
        paddingLeft: 10
    },
    nomeUsuario:{
        color: "#FFF",
        fontSize: 20,
        alignSelf: 'center',
        paddingVertical: 10

    },
    areaFiltro:{
        flexDirection: 'row',
        width: "100%",
        paddingStart: 20,
        paddingEnd: 20,
        justifyContent: 'space-between',
        marginTop: 25,
        alignItems: 'center',
        marginBottom: 25
    },
    textoDestaques:{
        fontSize: 25,
        fontWeight: 'bold',
        backgroundColor: "#106082",
        color:"#FFF",
        height: 40,
        textAlignVertical: 'center',
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    botaoFiltro:{
        flexDirection: 'row',
        backgroundColor: "#106082",
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        height: 40
    },
    textoFiltros:{
        fontSize: 20,
        marginRight: 10,
        color: "#FFF"
    },
    iconeFiltro:{
        color: "#FFF"

    },

    carousel:{
        
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 200,
        borderBottomWidth: 3,
        borderTopWidth: 3,
        borderColor: "#c9c9c9"
        
    }

})