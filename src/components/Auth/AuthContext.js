import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../api";
import { Alert } from "react-native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const login = async (email, password) => {
        try {
            const response = await api.post("/login", {
                email: email,
                password: password,
            });
            const { user, token } = response.data;

            await AsyncStorage.setItem("user", JSON.stringify(user));
            await AsyncStorage.setItem("token", token);

            setIsLoggedIn(true);

            if (user.is_admin) {
                setIsAdmin(true);
            }
        } catch (error) {
            Alert.alert("Erro", "Email ou Senha incorretos!", [
                {
                    text: "OK",
                    onPress: () => console.log("OK Pressed"),
                },
            ]);
        }
    };

    const logout = async () => {
        api.post("/logout")
            .then(async ({ data }) => {
                await AsyncStorage.removeItem("user");
                await AsyncStorage.removeItem("token");

                setIsLoggedIn(false);
                setIsAdmin(false);

                // await navigation.navigate("Login");
            })
            .catch(() => {
                Alert.alert("Erro", "Erro ao sair da conta!", [
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed"),
                    },
                ]);
            });
    };

    return <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
