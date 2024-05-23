import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import LoginPNG from "../../../assets/LogoLogin.png";
import { Button } from "react-native-web";

function LoginScreen({navigation, route}) {
  const [inputUsuario, onChangeUsuario] = useState("");
  const [inputSenha, onChangeSenha] = useState("");
  const [showLoginPng, setShowLoginPng] = useState(true);
  const usersData = require('../../../data/users/users.json');
  

  function login() {
    const user = searchUser();

    if (user.length == 0) {
        return;
    }

    route.params.isLogado(true);
    route.params.isAdmin(false);

    if (user[0].is_admin == true) {
        route.params.isLogado(true);
        route.params.isAdmin(true);
    }
    
    return navigation.navigate("Inicio");
  }

  function searchUser() {
    return usersData.filter(user => user.name == inputUsuario);
  }

  return (
    <View style={styles.container}>
    {showLoginPng && <Image style={styles.LoginPNG} source={LoginPNG} />}
    <TextInput
      style={styles.input}
      placeholder="Usuário"
      onChangeText={(text) => {
        onChangeUsuario(text);
        setShowLoginPng(false); 
      }}
      value={inputUsuario}
    />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={onChangeSenha}
        value={inputSenha}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Cadastro")}
        style={styles.buttonRegister}>
        <Text
        style={styles.textRegister}>
          Não Posui uma Conta? Cadastre-se! 
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
