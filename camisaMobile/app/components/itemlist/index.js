import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { app_db } from "../../../firebaseConfig";
import { collection, onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from "react";

export function ItemList(){
    const [Produtos, setProdutos] = useState([]);

    useEffect(() => {
      const ProdutosRef = collection(app_db, 'Produtos')

      const subscriver = onSnapshot(ProdutosRef, {
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
          
          
        }
      })
      
     
      return() => subscriver()
    },[])

    
    return(
        <View style={{ flex: 1 }} >
            <FlatList
                data={Produtos}
                renderItem={({ item }) => {
                    <View style={{ flex: 1 }} >
                        <Text>Oi {item.Nome}</Text>
                    </View>
                }}
            />
        </View>
    )
    
}

const styles = StyleSheet.create({
    
})
