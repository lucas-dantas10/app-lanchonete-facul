import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/views/Login/LoginScreen.js";
import HomeClientScreen from "./src/views/Home/Client/HomeClientScreen.js";
import HomeAdminScreen from "./src/views/Home/Admin/HomeAdminScreen.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
    const [isLogged, setIsLogged] = useState(true);
    const [isAdmin, setIsAdmin] = useState(true);

    return isLogged ? (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{ headerShown: false }}
                tabBarOptions={{ activeTintColor: "#808080", inactiveTintColor: "#FFD700" }}
            >
                <Tab.Screen
                    name="Início"
                    component={ isAdmin ? HomeAdminScreen : HomeClientScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
                    }}
                />

                <Tab.Screen
                    name="Carrinho"
                    component={HomeClientScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="shopping-cart" color={color} size={size} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Perfil"
                    component={HomeClientScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    ) : (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                {/* <Stack.Screen name="Cadastro" component={CadastroScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
