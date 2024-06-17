import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, Animated, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../../../api";

const HomeClientScreen = () => {
    const [items, setItems] = useState("");
    const [loading, setLoading] = useState(true);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        // const products = [
        //     {
        //         id: 1,
        //         name: "Biscoito de Polvilho",
        //         description: "Biscoito de Polvilho Salgado",
        //         image_path: require("../../../../assets/products/sacole.png"),
        //         price: 3
        //     },
        //     {
        //         id: 2,
        //         name: "Biscoito de Polvilho",
        //         description: "Biscoito de Polvilho Salgado",
        //         image_path: require("../../../../assets/products/sacole.png"),
        //         price: 3
        //     },
        //     {
        //         id: 3,
        //         name: "Biscoito de Polvilho",
        //         description: "Biscoito de Polvilho Salgado",
        //         image_path: require("../../../../assets/products/sacole.png"),
        //         price: 3
        //     },
        //     // ... (outros produtos)
        // ];
        // setItems(products);
        // setLoading(false);
         api.get('/products')
             .then(({ data }) => {
                 setItems(data.products);
                 setLoading(false);
             })
             .catch((err) => setLoading(false));

         Animated.timing(fadeAnim, {
             toValue: 1,
             duration: 1000,
             useNativeDriver: true,
         }).start();
    }, []);

    function addItemInCart(product) {
        const quantity = quantities[product.id] || 1; 
        console.log(`id: ${product.id} | Adicionar ${quantity} de ${product.name} ao carrinho`);

         api.post('/cart/create', {
             product_id: product.id,
             quantity: quantity
         })
         .then(({data}) => {
            Alert.alert(
                "Sucesso!",
                "Item adicionado ao carrinho!",
                [{ text: "OK", onPress: () => console.log("Alerta de erro fechado") }],
                { cancelable: false }
            );
             setLoading(false);
         });
    }

    const handleChangeQuantity = (product, value) => {
        const newQuantities = {
            ...quantities,
            [product.id]: value,
        };
        setQuantities(newQuantities);
    };

    const renderProducts = ({ item }) => (
        <Animated.View style={[styles.itemContainer, { opacity: fadeAnim }]}>
            <Image source={item.image_path} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetails}>R$ {item.price.toFixed(2)}</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleChangeQuantity(item, (quantities[item.id] || 0) + 1)}>
                    <Feather name="plus" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantities[item.id] || 1}</Text>
                <TouchableOpacity onPress={() => handleChangeQuantity(item, Math.max((quantities[item.id] || 1) - 1, 1))}>
                    <Feather name="minus" size={24} color="#333" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => addItemInCart(item)} style={styles.addButton}>
            <Image style={styles.itemAddImage} source={require("../../../../assets/mais.png")} />
            </TouchableOpacity>
        </Animated.View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.scrollView}>
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
                            keyExtractor={item => item.id.toString()}
                            numColumns={2}
                            contentContainerStyle={styles.flatListContent}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "white",
    },
    container: {
        backgroundColor: "#f8f9fa",
        flex: 1,
    },
    textPromocao: {
        fontWeight: "bold",
        fontSize: 24,
        padding: 10,
        color: "#333",
    },
    promocao: {
        backgroundColor: "#DA291C",
        margin: 10,
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,
    },
    infoPromo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    ofertaContainer: {
        display: "flex",
        alignItems: "center",
        padding: 10,
    },
    oferta: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: "white",
    },
    ofertaPreco: {
        textAlign: "center",
        fontSize: 22,
        padding: 10,
        fontWeight: "bold",
        color: "white",
    },
    imageCombo: {
        width: 100,
        height: 100,
        aspectRatio: 1,
        borderRadius: 10,
    },
    textCardapio: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 10,
        color: "#333",
    },
    containerCardapio: {
        padding: 10,
    },
    itemContainer: {
        flex: 1,
        alignItems: "center",
        gap: 10,
        backgroundColor: "#ffffff",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,
    },
    itemImage: {
        width: "100%",
        height: 100,
        resizeMode: "contain",
    },
    itemName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    itemDetails: {
        fontWeight: "bold",
        color: "#c4a600",
    },
    addButton: {
        backgroundColor: "#28a745",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        alignItems: "center",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    quantityText: {
        marginHorizontal: 20,
        fontSize: 18,
        fontWeight: "bold",
    },
    flatListContent: {
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    itemAddImage: {
        width: 25,
        height: 25,
    },
});

export default HomeClientScreen;
