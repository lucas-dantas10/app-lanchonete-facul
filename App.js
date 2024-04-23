import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/views/Login/LoginScreen.js";
import HomeClientScreen from "./src/views/Home/Client/HomeClientScreen.js";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
    const [isLogged, setIsLogged] = useState(false);

    return isLogged ? (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Início" component={HomeClientScreen} />
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
