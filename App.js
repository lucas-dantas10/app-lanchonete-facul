import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Buffer } from 'buffer';

import LoginScreen from "./src/views/Login/LoginScreen.js";
import SignUpScreen from "./src/views/SignUp/SignUpScreen.js";
import HomeClientScreen from "./src/views/Home/Client/HomeClientScreen.js";
import HomeAdminScreen from "./src/views/Home/Admin/HomeAdminScreen.js";
import CartScreen from "./src/views/Cart/CartScreen.js";
import ProfileScreen from "./src/views/Profile/ProfileScreen.js";

import { AuthProvider, useAuth } from './src/components/Auth/AuthContext.js';

// Definindo o Buffer globalmente se não estiver definido (para compatibilidade)
if (typeof window !== 'undefined') {
    window.Buffer = window.Buffer || Buffer;
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={SignUpScreen} />
        </Stack.Navigator>
    );
}

function ClientTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false, activeTintColor: "#808080", inactiveTintColor: "#FFD700" }}
        >
            <Tab.Screen
                name="Client"
                component={HomeClientScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Carrinho"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="shopping-cart" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
}

function AdminTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false, activeTintColor: "#808080", inactiveTintColor: "#FFD700" }}
        >
            <Tab.Screen
                name="Admin"
                component={HomeAdminScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
}

function App() {
    const { isLoggedIn, isAdmin } = useAuth(); 

    return (
        <NavigationContainer>
            {isLoggedIn ? (
                isAdmin ? <AdminTabNavigator /> : <ClientTabNavigator />
            ) : (
                <AuthNavigator />
            )}
        </NavigationContainer>
    );
}

export default () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);
