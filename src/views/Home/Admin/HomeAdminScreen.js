import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import api from "../../../../api";

const HomeAdminScreen = () => {
  const [orders, setOrders] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders')
        .then(({ data }) => {
            setOrders(data.orders);
            setLoading(false);
        })
        .catch((err) => setLoading(false));
  }, []);

  const renderOrder = ({ item }) => {
    const totalQuantity = item.item_order.reduce((sum, current) => sum + current.quantity, 0);
    const nameProducts = item.item_order.map((item) => item.product.name).join(", ");
    const totalValue = item.item_order.reduce((sum, current) => sum + (current.quantity * current.price_unit), 0);

    return (
        <View style={styles.orderContainer}>
          <Text style={styles.text}>Cliente: {item.user.name}</Text>
          <Text style={styles.text}>Lanche(s): {nameProducts}</Text>
          <Text style={styles.text}>Valor: R$ {totalValue}</Text>
          <Text style={styles.text}>Quantidade Total: {totalQuantity} item(s)</Text>
          <Text style={styles.text}>Token: {item.token_order}</Text>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.finalizeButton]}
          >
            <Text style={styles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
        </View>
      );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos</Text>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.token_order}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  orderContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#ffffdd",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 25,
    letterSpacing: 0.5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  finalizeButton: {
    backgroundColor: 'green',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeAdminScreen;