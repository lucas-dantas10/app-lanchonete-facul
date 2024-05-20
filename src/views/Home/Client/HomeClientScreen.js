import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const Menu = () => {
    const [pesquisa, setPesquisa] = useState("");

    const [items, setItems] = useState([
        { name: "Hambúrguer", price: 8, image: require("../../../../assets/products/burger.jpg") },
        { name: "Pizza", price: 8, image: require("../../../../assets/products/pizza.jpg") },
        { name: "Sacolé", price: 5, image: require("../../../../assets/products/sacole.webp") },
        { name: "Pipoca", price: 4, image: require("../../../../assets/products/pipoca.jpeg") },
        { name: "Polvilho", price: 3, image: require("../../../../assets/products/polvilho.jpeg") },
        { name: "Refrigerante", price: 6, image: require("../../../../assets/products/refrig.jpg") },
        { name: "Refresco", price: 3, image: require("../../../../assets/products/refrig.jpg") },
        { name: "Água", price: 3, image: require("../../../../assets/products/aguaS.jpeg") },
        { name: "Água c/ gás", price: 3.5, image: require("../../../../assets/products/aguaC.jpg") },
    ]);

    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(pesquisa.toLowerCase()));

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
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Menu</Text>
                    <View 
                        style={{ 
                            flexDirection: "column", 
                            alignItems: "center",
                            width: '100%', 
                        }}
                    >
                        {items.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                    borderBottomWidth: 1,
                                    padding: '1rem',
                                    borderBottomColor: 'ccc'
                                }}
                            >
                                <Image source={item.image} style={{ width: 50, height: 50, marginRight: 10 }} />
                                <Text>
                                    {item.name} - R${item.price.toFixed(2)}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
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
