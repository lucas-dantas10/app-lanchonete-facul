import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import api from '../../../api';

const CartScreen = () => {
  // const cartItemsData = require('../../../data/cart/cart.json');
  const [cartItems, setCartItems] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/cart/items')
        .then(({ data }) => {
            console.log(data);
            setCartItems(data.cartItems);
            setLoading(false);
        })
        .catch((err) => setLoading(false));
  }, []);

  // const calculateTotal = () => {
  //   return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  // };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.product.image_path} style={{ width: 50, height: 50, marginRight: 10 }} />
      <Text style={styles.itemName}>{item.product.name}</Text>
      <Text style={styles.itemDetails}>Quantidade: {item.quantity}</Text>
      <Text style={styles.itemDetails}>Preço: R${item.product.price.toFixed(2)}</Text>
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
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.totalContainer}>
        {/* <Text style={styles.totalText}>Total: R${calculateTotal()}</Text> */}
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CartScreen;
