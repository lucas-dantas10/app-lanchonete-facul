import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/views/Login/LoginScreen.js";
import HomeClientScreen from "./src/views/Home/Client/HomeClientScreen.js";
import HomeAdminScreen from "./src/views/Home/Admin/HomeAdminScreen.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import SignUpScreen from "./src/views/SignUp/SignUpScreen.js";
import CartScreen from "./src/views/Cart/CartScreen.js";
import ProfileScreen from "./src/views/Profile/ProfileScreen.js";
import { Buffer } from 'buffer'


window.Buffer = window.Buffer ?? Buffer

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    return isLogged ? (
        isAdmin ? (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{ headerShown: false, activeTintColor: "#808080", inactiveTintColor: "#FFD700" }}
                >
                    <Tab.Screen
                        initialParams={{isLogado: setIsLogged, isAdmin: setIsAdmin}}
                        name="Home"
                        component={ HomeAdminScreen}
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
            </NavigationContainer>
        ) :
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{ headerShown: false, activeTintColor: "#808080", inactiveTintColor: "#FFD700" }}
                >
                    <Tab.Screen
                        initialParams={{isLogado: setIsLogged, isAdmin: setIsAdmin}}
                        name="Home"
                        component={ HomeClientScreen }
                        options={{
                            tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
                        }}
                    />
                    
                    <Tab.Screen
                        name="Carrinho"
                        component={CartScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Feather name="shopping-cart" color={color} size={size} />
                            ),
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
            </NavigationContainer>
    ) : (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} initialParams={{isLogado: setIsLogged, isAdmin: setIsAdmin}} />
                <Stack.Screen name="Cadastro" component={SignUpScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
