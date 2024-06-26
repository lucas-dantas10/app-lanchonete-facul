import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, Animated, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../../../api";
import { useCart } from "../../../components/Cart/CartContext";
import LoginPNG from "../../../../assets/LogoLogin.png";
import * as Animatable from "react-native-animatable";

const HomeClientScreen = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [quantities, setQuantities] = useState({});
    const { addToCart } = useCart(); 

    useEffect(() => {
         api.get('/products')
             .then(({ data }) => {
                 setItems(data.products);
                 setLoading(false);
             })
             .finally(() => setLoading(false));

         Animated.timing(fadeAnim, {
             toValue: 1,
             duration: 1000,
             useNativeDriver: true,
         }).start();
    }, []);

    function addItemInCart(product) {
        const quantity = quantities[product.id] || 1; 
        addToCart(product, quantity);
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
            <Image source={{uri: item.image_path}} style={styles.itemImage} />
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
                <Feather name="plus" size={24} color="#fff" />
            </TouchableOpacity>
        </Animated.View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Animatable.Image
                    animation="pulse"
                    easing="ease-out"
                    iterationCount="infinite"
                    style={{width: "50%",
                        height: 200,
                        marginBottom: 20}}
                    source={LoginPNG}
                    resizeMode="contain"
                />
            </View>
        );
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <SafeAreaView>
                    <Text style={styles.textPromocao}>Promoção</Text>
                    <View>
                        <View style={styles.promocao}>
                            <View style={styles.infoPromo}>
                                <View style={styles.ofertaContainer}>
                                    <Text style={styles.oferta}>Salgado + Suco</Text>
                                    <Text style={styles.ofertaPreco}>Por Apenas R$9,00</Text>
                                </View>
                                <Image style={styles.imageCombo} source={require("../../../../assets/products/combo.jpg")} />
                            </View>
                        </View>
                    </View>
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
        fontSize: 24,
        fontWeight: "bold",
        margin: 10,
        color: "#333",
    },
    promocao: {
        backgroundColor: "#DA291C",
        margin: 15,
        padding: 10,
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
        fontSize: 24,
        fontWeight: "bold",
        margin: 10,
        color: "#333",
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
        marginBottom:10,
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
});

export default HomeClientScreen;
