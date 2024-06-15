import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import api from "../../../../api";

const HomeAdminScreen = () => {
  const [orders, setOrders] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orders = [
        {
            id: 1,
            user_id: 1,
            token_order: "XGIAO",
            total_price: 3.5,
            status_order: "NP",
            created_at: "2024-06-15T18:50:28.000000Z",
            updated_at: "2024-06-15T18:50:28.000000Z",
            user: {
                id: 1,
                email: "test@example.com",
                email_verified_at: "2024-06-14T18:22:19.000000Z",
                school: "Escola teste",
                is_admin: 1,
                created_at: "2024-06-14T18:22:19.000000Z",
                updated_at: "2024-06-14T18:22:19.000000Z"
            },
            item_order: [
                {
                    id: 1,
                    product_id: 1,
                    order_id: 1,
                    quantity: 1,
                    price_unit: 3.5,
                    created_at: "2024-06-15T18:50:28.000000Z",
                    updated_at: "2024-06-15T18:50:28.000000Z",
                    product: {
                        id: 1,
                        name: "Agua Com Gás",
                        description: "Aguá Gaseficada",
                        image_path: "http://localhost:8000/storage/products/aguaC.png",
                        price: 3.5,
                        created_at: "2024-06-14T18:22:19.000000Z",
                        updated_at: "2024-06-14T18:22:19.000000Z"
                    }
                }
            ]
        },
        {
            id: 1,
            user_id: 1,
            token_order: "XGIAO",
            total_price: 3.5,
            status_order: "NP",
            created_at: "2024-06-15T18:50:28.000000Z",
            updated_at: "2024-06-15T18:50:28.000000Z",
            user: {
                id: 1,
                email: "test@example.com",
                email_verified_at: "2024-06-14T18:22:19.000000Z",
                school: "Escola teste",
                is_admin: 1,
                created_at: "2024-06-14T18:22:19.000000Z",
                updated_at: "2024-06-14T18:22:19.000000Z"
            },
            item_order: [
                {
                    id: 1,
                    product_id: 1,
                    order_id: 1,
                    quantity: 1,
                    price_unit: 3.5,
                    created_at: "2024-06-15T18:50:28.000000Z",
                    updated_at: "2024-06-15T18:50:28.000000Z",
                    product: {
                        id: 1,
                        name: "Agua Com Gás",
                        description: "Aguá Gaseficada",
                        image_path: "http://localhost:8000/storage/products/aguaC.png",
                        price: 3.5,
                        created_at: "2024-06-14T18:22:19.000000Z",
                        updated_at: "2024-06-14T18:22:19.000000Z"
                    }
                }
            ]
        }
    ];

    setOrders(orders);
    setLoading(false);
    
    // api.get('/orders')
    //     .then(({ data }) => {
    //         console.log(data);
    //         setOrders(data.orders);
    //         setLoading(false);
    //     })
    //     .catch((err) => setLoading(false));
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
    backgroundColor: "#f5f5f5",
    marginTop: 20
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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
    borderLeftColor: '#4caf50',
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
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
    backgroundColor: '#4caf50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});

export default HomeAdminScreen;
