import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import api from "../../../api";
import LoginPNG from "../../../assets/LogoLogin.png";

const UserOrderScreen = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderToken, setOrderToken] = useState("");

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 2000);

        return () => clearInterval(interval);
    }, []);

    function fetchOrders() {
        api.get('/orders/client')
            .then(({ data }) => {
                if (data.orders == null) {
                    setOrder(null);
                } else {
                    setOrder(data.orders[0]);
                    setOrderToken(data.orders[0].token_order);
                }
            })
            .finally(() => setLoading(false));
    }

    const cancelOrder = () => {
        api.put(`/orders/status/${order.id}`, {
            status_type: "C",
        })
            .then(() => {
                fetchOrders();
                Alert.alert("Poxa!", "Pedido cancelado :(", [
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed"),
                    },
                ]);
            })
            .catch((err) => {
                console.log(err);
                Alert.alert("Erro", "Erro ao alterar o status do pedido!", [
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed"),
                    },
                ]);
            });
    };

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

    if (!order) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Nenhum pedido encontrado.</Text>
            </View>
        );
    }

    const totalQuantity = order.item_order.reduce((sum, current) => sum + current.quantity, 0);
    const totalValue = order.item_order.reduce((sum, current) => sum + current.quantity * current.price_unit, 0);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.product.image_path }} style={styles.itemImage} />
            <View style={styles.itemDetailsContainer}>
                <Text style={styles.itemName}>{item.product.name}</Text>
                <Text style={styles.itemDetails}>Quantidade: {item.quantity}</Text>
                <Text style={styles.itemDetails}>Preço: R${item.price_unit.toFixed(2)}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seu Pedido</Text>
            <FlatList
                data={order.item_order}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Valor Total: R${totalValue.toFixed(2)}</Text>
                <Text style={styles.totalText}>Quantidade Total: {totalQuantity} item(s)</Text>
                <View style={styles.statusContainer}>
                    {order.status_order === "D" ? (
                        <Animatable.View animation="bounceIn">
                            <Icon name="check-circle" size={30} color="green" />
                        </Animatable.View>
                    ) : order.status_order === null ? (
                        <Animatable.View animation="rotate" iterationCount="infinite" duration={1000}>
                            <Icon name="hourglass-empty" size={30} color="#FFC72C" />
                        </Animatable.View>
                    ) : (
                        <Animatable.View animation="shake">
                            <Icon name="cancel" size={30} color="red" />
                        </Animatable.View>
                    )}
                    <Text style={[styles.statusText, { color: order.status_order === "D" ? "green" : order.status_order === null ? "#FFC72C" : "red" }]}>
                        {order.status_order == "C" ? "Cancelado" : order.status_order == "D" ? "Pronto" : "Preparando"}{order.status_order === "C" && ": Dirija-se à cantina"}
                    </Text>
                </View>
                <Text style={styles.tokenText}>Token do Pedido: {orderToken}</Text>
                {order.status !== "C" && (
                    <TouchableOpacity onPress={cancelOrder} style={styles.cancelButton} disabled={order.status_order == "D"}>
                        <Text style={styles.cancelButtonText}>Cancelar Pedido</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
        marginTop: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    listContainer: {
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: "row",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 10,
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
    },
    itemDetailsContainer: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    itemDetails: {
        fontSize: 16,
        marginTop: 4,
        color: "#555",
    },
    totalContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
    },
    totalText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    statusText: {
        fontSize: 18,
        marginLeft: 8,
    },
    tokenText: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: "bold",
        color: "#555",
    },
    cancelButton: {
        marginTop: 20,
        backgroundColor: "red",
        padding: 10,
        borderRadius: 8,
    },
    cancelButtonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    loadingText: {
        fontSize: 18,
        color: "#555",
    },
});

export default UserOrderScreen;
