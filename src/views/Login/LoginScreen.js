import React, { useState } from "react";
import api from "../../../api";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert 
} from "react-native";
import LoginPNG from "../../../assets/LogoLogin.png";
import {AsyncStorage} from 'react-native';

function LoginScreen({navigation, route}) {
  const [inputUsuario, onChangeUsuario] = useState("");
  const [inputSenha, onChangeSenha] = useState("");
  const [showLoginPng, setShowLoginPng] = useState(true);
  const usersData = require('../../../data/users/users.json');
  
  async function login() {
    try {
        const response = await api.post('/login', { email: inputUsuario, password: inputSenha });
        console.log(response.data);
        const { user, token } = response.data;

  
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('token', token);
  
        return navigation.navigate("Home");
      } catch (error) {
        Alert.alert('Erro', 'Email ou Senha incorretos!', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
      }
  }

  function searchUser() {
    return usersData.filter(user => user.name == inputUsuario);
  }

  return (
    <View style={styles.container}>
    {showLoginPng && <Image style={styles.LoginPNG} source={LoginPNG} />}
    <TextInput
      style={styles.input}
      placeholder="Email"
      onChangeText={(text) => {
        onChangeUsuario(text);
        setShowLoginPng(false); 
      }}
      value={inputUsuario}
    />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={onChangeSenha}
        value={inputSenha}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Cadastro")}
        style={styles.buttonRegister}>
        <Text
        style={styles.textRegister}>
          Não Posui uma Conta? <Text style={{color: 'blue'}}>Cadastre-se</Text> 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        disabled={inputUsuario != '' && inputSenha != '' ? false : true}
        onPress={login}
        style={styles.buttonLogin}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  input: {
    width: "90%",
    margin: 12,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#e3e3e3",
  },
  buttonRegister:{
    margin: 4,
  },
  textRegister:{
    color:"#3a3a3a",
  },

  buttonLogin: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    margin: 12,
    borderRadius: 16,
    padding: 20,
    backgroundColor: "#ffbc0d",
  },

  LoginPNG: {
    width: "100%",
    height: "30%",
    marginBottom: "10%",
    marginTop: "20%",
    resizeMode: "contain",
  },
});

export default LoginScreen;
