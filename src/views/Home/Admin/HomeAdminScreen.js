import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const HomeAdminScreen = () => {
  const cartItemsData = require('../../../../data/orders/orders.json');
  const [orders, setOrders] = useState(cartItemsData);

  const renderOrder = ({ item }) => (
    
    <View style={styles.orderContainer}>
      <Text style={styles.text}>Cliente: {item.client}</Text>
      <Text style={styles.text}>Produto: {item.products.map(product => product.name).join(', ')}</Text>
      <Text style={styles.text}>Valor: R$ {item.price}</Text>
      <Text style={styles.text}>Quantidade: {item.products.map(product => `${product.quantity} ${product.name}`).join(', ')}</Text>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default HomeAdminScreen;
