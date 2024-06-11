import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const HomeAdminScreen = () => {
  const cartItemsData = require("../../../../data/orders/orders.json");
  const [orders, setOrders] = useState(cartItemsData);

  const renderOrder = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.text}>Cliente: {item.client}</Text>
      <Text style={styles.text}>
        Produto: {item.products.map((product) => product.name).join(", ")}
      </Text>
      <Text style={styles.text}>Valor: R$ {item.price}</Text>
      <Text style={styles.text}>
        Quantidade:{" "}
        {item.products
          .map((product) => `${product.quantity} ${product.name}`)
          .join(", ")}
      </Text>
      <Text style={styles.text}>Quantidade Total: {item.quantity} item(s)</Text>
      <Text style={styles.text}>Token: {item.token_order}</Text>
    </View>
  );

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
    lineHeight: "25px",
    letterSpacing:".5px",
  },
});

export default HomeAdminScreen;
