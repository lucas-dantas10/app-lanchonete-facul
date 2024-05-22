import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const Menu = () => {
    const [pesquisa, setPesquisa] = useState("");

    const products = require('../../../../data/products/products.json');

    const [items, setItems] = useState(products);

    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(pesquisa.toLowerCase()));

    const renderProducts = ({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={item.image} style={{ width: 50, height: 50, marginRight: 10 }} />
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDetails}>Preço: R${item.price.toFixed(2)}</Text>
        </View>
      );

    return (
        <View style={styles.container}>
            <View style={styles.pesquisa}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquisar"
                    onChangeText={setPesquisa}
                    value={pesquisa}
                />
            </View>

            <View>
                <Text style={styles.textPromo}>Promoções</Text>
                <TouchableOpacity>
                    <View style={styles.promocao}>
                        <View style={styles.infoPromo}>
                            <Text>Combo:</Text>
                            <Text style={styles.oferta}>Salgado + suco {"\n"}R$9,00</Text>
                        </View>
                        <Image style={styles.imageCombo} source={require("../../../../assets/products/combo.jpg")} />
                    </View>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.textCardapio}>Cardápio</Text>
                <View style={{ alignItems: "center", width: '100%' }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Menu</Text>
                    <View style={styles.container}>
                        <FlatList
                            data={items}
                            renderItem={renderProducts}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      itemName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      itemDetails: {
        fontSize: 16,
        marginTop: 4,
      },
    container: {
        paddingHorizontal: 10,
        width: '100%'
    },

    pesquisa: {
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },

    textPromo: {
        fontSize: 20,
        paddingLeft: 10,
    },

    promocao: {
        backgroundColor: "#FFD700",
        borderRadius: 10,
        paddingLeft: 12,
        margin: 10,
        display: "flex",
        flexDirection: "row",
    },

    infoPromo: {
        marginTop: 10,
        marginBottom: 30,
    },

    oferta: {
        fontSize: 16,
        paddingTop: 10,
        fontWeight: "bold",
        color: "white",
    },

    imageCombo: {
        width: 80,
        height: 80,
        borderRadius: 10,
        position: "absolute",
        left: 270,
        top: 8,
    },

    textCardapio: {
        fontSize: 20,
        textAlign: "center",
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

    teste: {
        alignItems: "center",
    },
});

export default Menu;
