import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../../../api";

const Menu = () => {
    const [pesquisa, setPesquisa] = useState("");
    const [items, setItems] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      api.get('/products')
          .then(({ data }) => {
              console.log(data);
              setItems(data.products);
              setLoading(false);
          })
          .catch((err) => setLoading(false));
    }, []);

    function addItemInCart(product) {
        console.log(product.id)
        // api.post('/cart/create', {
        //     product_id: product.id,
        //     quantity: 1
        // })
        // .then(({data}) => {
        //     console.log(data)
        //     setLoading(false);
        // });
    }

    const renderProducts = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={item.image_path} style={styles.itemImage} />
            <Text style={styles.itemName}>{ item.name }</Text>
            <Text style={styles.itemDetails}>R$ {item.price.toFixed(2) }</Text>
            <TouchableOpacity onPress={() => addItemInCart(item)}>
                <Image style={styles.itemAddImage} source={require("../../../../assets/mais.png")} />
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <Text>Carregando...</Text>
          </View>
        );
      }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text style={styles.textPromocao}>Promoção</Text>
                <TouchableOpacity>
                    <View style={styles.promocao}>
                        <View style={styles.infoPromo}>
                            <View style={styles.ofertaContainer}>
                            <Text style={styles.oferta}>Salgado + Suco</Text>
                            <Text style={styles.ofertaPreco}>Por Apenas R$9,00</Text>
                            </View>
                            
                            <Image style={styles.imageCombo} source={require("../../../../assets/products/combo.jpg")} />
                        </View>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>

            <View>
                
                <View style={styles.containerCardapio}>
                    <Text style={styles.textCardapio}>Cardápio</Text>
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
    container: {
        backgroundColor: "white",
    },
    textPromocao: {
      fontWeight: "bold",
        fontSize: 24,
        padding: 10,
    },
    promocao: {
        backgroundColor: "#DA291C",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,
    },
    infoPromo: {
        
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between"
    },
    ofertaContainer:
    {
        display:"flex",
        alignItems:"center",
        padding:10,
    },
    oferta: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: "white",
    },
    ofertaPreco:
    {
        textAlign: "center",
        fontSize: 22,
        padding: 10,
        fontWeight: "bold",
        color: "white",
    },
    imageCombo: {
        width: 100,
        height:100,
        aspectRatio: 1,
        borderRadius: 10,
    },
    textCardapio: {
        fontSize: 24,
        fontWeight: "bold",
        margin:10,

    },
    containerCardapio: {
        padding: 10,
    },
    itemContainer: {
        flex: 1,
        alignItems: "center",
        gap: 10,
        backgroundColor: "#e9e9e7",
        margin: 10,
        padding: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,
    },
    itemImage: {
        width: "100%",
        height: "50%",
        resizeMode: "contain",
        aspectRatio: 1,
    },
    itemName: {
        fontSize: 14,
        fontWeight: "bold",
    },
    itemDetails: {
        fontWeight: "bold",
        color: "#c4a600",
    },
    itemAddImage: {
        width: 25,
        height: 25,
    },
});

export default Menu;
