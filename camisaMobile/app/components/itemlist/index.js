import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { app_db } from "../../../firebaseConfig";
import { collection, onSnapshot, query } from 'firebase/firestore'
import { useState, useEffect } from "react";

export function ItemList({navigation}){
    const [Produtos, setProdutos] = useState([]);

    useEffect(() => {
      const ProdutosRef = collection(app_db, 'Produtos')


      const q = query(
        ProdutosRef
        
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
          setProdutos(produtos)
          console.log(Produtos)
          // console.log(ProdutosRef)
          
          
        }
      })
      
     
      return() => subscriver()
    },[])

    
    return(
      
        <View style={{ flex: 1 }} >
          
            <FlatList
                data={Produtos}
                scrollEnabled = {false}
                showsVerticalScrollIndicator ={false}
                numColumns={2}
                renderItem={({item}) => (
                  
                  <View style={styles.container} >
                    <TouchableOpacity
                    onPress={() =>  navigation.navigate("Produto", {Chave:[item.key]})}>
                    <View style={styles.row} >
                      
                        
                        <Image style={styles.icon} source={{uri : item.image}}/>
                        <Text style={styles.produto}>{item.Nome}</Text>
                        <Text style={styles.produto2}>R${item.Preco},00</Text>
                        
                    </View>
                    </TouchableOpacity>
                  </View>
                  
                )
                }
            />
            
        </View>
        
    )
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: "#FFF",
    // backgroundColor: "#EFEFEF",
    width:"100%"
  },
  icon:{
    width: 105, 
    height: 105,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#106082"
    
  },
  row:{

    alignContent: 'flex-end', 
    marginStart: 10,
    marginEnd: 10,
    backgroundColor: "#d7f0fa",
    borderRadius: 15,
    maxHeight: 200,
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 25,
    paddingTop: 10
  },
  produto:{
    paddingVertical: 6,
    textAlign: "center"
    
    
  },
  produto2:{
    paddingVertical: 6,
    textAlign: "center",
    fontWeight: 'bold',
    
    
  },
  

})
