import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";


const Menu = () => {
    const [pesquisa, setPesquisa] = useState("");

    const products = require('../../../../data/products/products.json');

    const [items, setItems] = useState(products);

    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(pesquisa.toLowerCase()));

    const renderProducts = ({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={item.image} style={{ width: 50, height: 50}} />
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDetails}>R${item.price.toFixed(2)}</Text>
          <View style={styles.itemAdd}>
            <TouchableOpacity><Image style={styles.itemAddImage} source={require("../../../../assets/mais.png")}/></TouchableOpacity>
          
          </View>
        </View>
      );

    return (
        <View style={styles.container}>
            
            <SafeAreaView>
                <Text style={styles.textMenu}>Menu</Text>
                <TouchableOpacity>
                    <View style={styles.promocao}>
                        <View style={styles.infoPromo}>
                            <Text style={styles.oferta}>O Mais Pedido! Salgado + Suco R$9,00</Text>
                            <Image style={styles.imageCombo} source={require("../../../../assets/products/combo.jpg")} />
                            
                        </View>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>

            <View>
                <Text style={styles.textCardapio}>Cardápio</Text>
                    <View style={styles.containerCardapio}>
                        <FlatList
                            data={items}
                            renderItem={renderProducts}
                            keyExtractor={item => item.id}
                            numColumns={2}
                        />
                    </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:
    {
        backgroundColor:"white",
    },
      itemContainer: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#e9e9e7",
        margin:14,
        padding: 5,
        borderRadius:10,
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,
         },
      itemName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      itemDetails: {

      },
      itemAddImage:
      {
        padding:5,
        width:20,
        height:20,

      },

    textMenu: {
        fontSize: 24,
        padding:10,
        fontWeight:"bold",

    },

    promocao: {
        backgroundColor: "#DA291C",
        flex:1,
        margin:10,
        padding:10,
        borderRadius:10,
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,
    },

    infoPromo: {
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },

    oferta: {
        textAlign:"center",
        fontSize: 20,
        padding: 10,
        fontWeight: "bold",
        color:"white",
    },

    imageCombo: {
        width:100,
        height:100,
        borderRadius: 10,
    },

    textCardapio: {
        fontSize: 20,
        fontWeight:"bold",
        padding:10,
        
    },

    item: {
        flexDirection: "row",
        marginTop: 10,
        paddingLeft: 5,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "ccc",
        width: "100%",
    },

    infoCardapio: {
        fontSize: 18,
        paddingLeft: 15,
    },

    preco: {
        fontWeight: "bold",
    },

    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },

    plus: {
        marginLeft: "auto",
        marginTop: "auto",
        backgroundColor: "#808080",
        borderRadius: 10,
        padding: 2,
    },

});

export default Menu;
