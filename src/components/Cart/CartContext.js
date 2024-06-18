import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import api from "../../../api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCartItems = async () => {
        setLoading(true);

        api.get("/cart/items")
            .then(({ data }) => {
                setCartItems(data.cartItems);
            })
            .finally(() => setLoading(false));
    };

    const addToCart = async (product, quantity) => {
        api.post("/cart/create", {
            product_id: product.id,
            quantity: quantity,
        }).then(({ data }) => {
            setCartItems(data.cart_item);
            Alert.alert(
                "Sucesso!",
                "Item adicionado ao carrinho!",
                [{ text: "OK", onPress: () => console.log("Alerta de erro fechado") }],
                { cancelable: false }
            );
        })
        .catch(() => {
            Alert.alert(
                "Erro!",
                "erro!",
                [{ text: "OK", onPress: () => console.log("Alerta de erro fechado") }],
                { cancelable: false }
            );
        })
        .finally(() => setLoading(false));
    };

    const cleanCart = async () => {
        setCartItems([]);
    }

    const removeFromCart = async (cartId) => {
        api.delete(`/cart/delete/${cartId}`)
            .then(() => {
                fetchCartItems();
            })
            .catch(() => {
                Alert.alert(
                    "Erro!",
                    "Erro ao remover item do carrinho!",
                    [{ text: "OK", onPress: () => console.log("Alerta de erro fechado") }],
                    { cancelable: false }
                );
            });
    }

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <CartContext.Provider value={{ cartItems, loading, fetchCartItems, addToCart, cleanCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
