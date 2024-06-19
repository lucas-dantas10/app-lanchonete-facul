import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import api from "../../../api";
import { useCart } from "../../components/Cart/CartContext";
import Icon from "react-native-vector-icons/MaterialIcons";

const CartScreen = () => {
  const { cartItems, loading, cleanCart, removeFromCart } = useCart();

  const handleSubmit = async () => {
    api
      .post("/orders/create")
      .then(({ data }) => {
        cleanCart();
        Alert.alert(
          "Pedido Criado!",
          "Agora é só chegar e pegar ;)",
          [
            {
              text: "OK",
              onPress: () => console.log("Alerta de erro fechado"),
            },
          ],
          { cancelable: false }
        );
      })
      .catch(() => {
        Alert.alert(
          "Erro!",
          "Ocorreu um erro ao gerar o pedido :(",
          [
            {
              text: "OK",
              onPress: () => console.log("Alerta de erro fechado"),
            },
          ],
          { cancelable: false }
        );
      });
  };

  const calculateTotal = () => {
    if (!cartItems) {
      return 0;
    }

    return cartItems
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.product.image_path }}
        style={styles.itemImage}
      />
      <View style={styles.itemDetailsContainer}>
        <Text style={styles.itemName}>{item.product.name}</Text>
        <Text style={styles.itemDetails}>Quantidade: {item.quantity}</Text>
        <Text style={styles.itemDetails}>
          Preço: R${item.product.price.toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
        <Icon name="delete" size={30} color="red" />
      </TouchableOpacity>
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
      <Text style={styles.title}>Carrinho</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: R${calculateTotal()}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleSubmit}>
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    marginTop:30,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
  },
  itemDetailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemDetails: {
    fontSize: 16,
    marginTop: 4,
    textAlign: "center",
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartScreen;
