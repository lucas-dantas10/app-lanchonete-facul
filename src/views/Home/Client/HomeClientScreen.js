import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet } from 'react-native';

const Menu = () => {
    const [items, setItems] = useState([
      { name: "Hambúrguer", price: 8, image: require("../imagens/burger.jpg") },
      { name: "Pizza", price: 8, image: require("../imagens/pizza.jpg") },
      { name: "Sacolé", price: 5, image: require("../imagens/sacole.webp")},
      { name: "Pipoca", price: 4, image: require("../imagens/pipoca.jpeg")},
      { name: "Polvilho", price: 3, image: require("../imagens/polvilho.jpeg")},
      { name: "Refrigerante", price: 6, image: require("../imagens/refrig.jpg")}
    ]);
  
    const [busca,setBusca] = useState("");
  
    return (
      <View style={styles.container}>
        <View style={styles.pesquisa}>
          <TextInput style={styles.input}
            placeholder="Pesquisar"
          />
        </View>
  
      
        <Text style={styles.titulo}>Cardápio</Text>
      <View/>
      <View>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image style={styles.image} source={item.image}/>
              <View style={styles.info}>
                <Text>{item.name}</Text>
                <Text style={styles.preco}>R${item.price.toFixed(2)}</Text>
              </View>
            </View>
            )}
          keyExtractor={(item) => item.name}
          />
      </View>
      </View>
  
    );
  };
  
  const styles = StyleSheet.create({
    container:{
      paddingHorizontal: 10,
    },
  
    pesquisa:{
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
  
    titulo:{
      fontSize: 20,
      textAlign:"center",
    },
  
    item:{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
      paddingLeft: 10,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "ccc",
      width:"50%",
    },
  
    info:{
      fontSize: 18,
    },
  
    preco:{
      fontWeight: "bold",
    },
  
    image :{
      width:80,
      height:80,
      borderRadius: 10,
    },
    });
    
export default Menu;
  