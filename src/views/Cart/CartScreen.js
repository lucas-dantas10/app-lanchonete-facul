import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CartScreen = () => {
  // Estado inicial do carrinho com alguns itens
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Item 1', quantity: 1, price: 10.00 },
    { id: '2', name: 'Item 2', quantity: 2, price: 15.00 },
    { id: '3', name: 'Item 3', quantity: 1, price: 20.00 },
  ]);

  // Função para calcular o total
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  // Renderiza cada item do carrinho
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetails}>Quantidade: {item.quantity}</Text>
      <Text style={styles.itemDetails}>Preço: R${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: R${calculateTotal()}</Text>
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
