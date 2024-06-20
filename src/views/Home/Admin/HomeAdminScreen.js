import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import api from "../../../../api";
import LoginPNG from "../../../../assets/LogoLogin.png";
import * as Animatable from "react-native-animatable";

const HomeAdminScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    function handleStatus(order, status) {
        api.put(`/orders/status/${order.id}`, {
            status_type: status,
        })
            .then(() => {
                fetchOrders();
                Alert.alert("Sucesso", "Status do pedido alterado!", [
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
    }

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 2000);

        return () => clearInterval(interval);
    }, []);

    function fetchOrders() {
        api.get("/orders")
            .then(({ data }) => {
                setOrders(data.orders);
                setLoading(false);
            })
            .catch((err) => setLoading(false));
    }

    const dateFormated = (dateString) => {
        const date = new Date(dateString);

        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        const formattedDate = date.toLocaleDateString('pt-BR', options);

        return formattedDate;
    }

    const renderOrder = ({ item }) => {
        const totalQuantity = item.item_order.reduce((sum, current) => sum + current.quantity, 0);
        const productsWithQuantities = item.item_order
            .map((item) => `${item.product.name} (${item.quantity})`)
            .join(", ");
        const totalValue = item.item_order.reduce(
            (sum, current) => sum + current.quantity * current.price_unit,
            0
        );

        const getStatusText = (status) => {
            switch (status) {
                case 'D':
                    return 'Pronto';
                case 'C':
                    return 'Cancelado';
                case 'E':
                    return 'Encerrado';
                default:
                    return 'Em andamento';
            }
        };

        const getStatusTextStyle = (status) => {
            switch (status) {
                case 'D':
                    return styles.doneText;
                case 'C':
                    return styles.cancelledText;
                case 'E':
                    return styles.encerredText;
                default:
                    return styles.inProgressText;
            }
        };

        return (
            <View
                style={[
                    styles.orderContainer,
                    item.status_order === 'C' && styles.cancelledOrderContainer,
                    item.status_order === 'E' && styles.closedOrderContainer,
                ]}
            >
                <Text style={styles.text}>Cliente: {item.user.name}</Text>
                <Text style={styles.text}>Lanche(s): {productsWithQuantities}</Text>
                <Text style={styles.text}>Valor: R$ {totalValue}</Text>
                <Text style={styles.text}>Quantidade Total: {totalQuantity} item(s)</Text>
                <Text style={styles.text}>Token: {item.token_order}</Text>
                <Text style={styles.text}>Data do Pedido: {dateFormated(item.created_at)}</Text>
                <Text style={[styles.text, getStatusTextStyle(item.status_order)]}>
                    Status Pedido: {getStatusText(item.status_order)}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.finalizeButton]}
                        onPress={() => handleStatus(item, "D")}
                        disabled={item.status_order === "D"}
                    >
                        <Text style={styles.buttonText}>Pronto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => handleStatus(item, "C")}
                        disabled={item.status_order === "C"}
                    >
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.closeButton]}
                        onPress={() => handleStatus(item, "E")}
                        disabled={item.status_order === "E"}
                    >
                        <Text style={styles.buttonText}>Encerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pedidos</Text>
            <FlatList data={orders} renderItem={renderOrder} keyExtractor={(item) => item.token_order} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
        marginTop: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    orderContainer: {
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        borderLeftWidth: 5,
        borderLeftColor: "#4caf50",
    },
    cancelledOrderContainer: {
        borderLeftColor: "#f44336",
    },
    closedOrderContainer: {
        borderLeftColor: "grey",
    },
    text: {
        fontSize: 18,
        color: "#333",
        marginBottom: 5,
    },
    doneText: {
        color: "green",
    },
    encerredText: {
        color: "grey",
    },
    cancelledText: {
        color: "red",
    },
    inProgressText: {
        color: "#c4a600",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 5,
    },
    finalizeButton: {
        backgroundColor: "#4caf50",
    },
    cancelButton: {
        backgroundColor: "#f44336",
    },
    closeButton: {
        backgroundColor: "grey",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
});

export default HomeAdminScreen;
