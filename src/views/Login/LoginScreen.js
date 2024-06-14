import React, { useState } from "react";
import api from "../../../api";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import LoginPNG from "../../../assets/LogoLogin.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function LoginScreen({ navigation, route }) {
  const [inputUsuario, onChangeUsuario] = useState("");
  const [inputSenha, onChangeSenha] = useState("");

  async function login() {
    try {
      const response = await api.post("/login", {
        email: inputUsuario,
        password: inputSenha,
      });
      const { user, token } = response.data;

      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);

      route.params.isLogado(true);
      route.params.isAdmin(false);

      if (user.is_admin) {
        route.params.isAdmin(true);
      }
    } catch (error) {
      Alert.alert("Erro", "Email ou Senha incorretos!", [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ]);
    } finally {
      navigation.navigate("Home");
    }
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.inner}>
        <Image style={styles.LoginPNG} source={LoginPNG} resizeMode="fill" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => onChangeUsuario(text)}
          value={inputUsuario}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={(text) => onChangeSenha(text)}
          value={inputSenha}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Cadastro")}
          style={styles.buttonRegister}
        >
          <Text style={styles.textRegister}>
            Não Possui uma Conta?{" "}
            <Text style={{ color: "blue" }}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={inputUsuario !== "" && inputSenha !== ""}
          onPress={login}
          style={styles.buttonLogin}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "90%",
    marginVertical: 10,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#e3e3e3",
  },
  buttonRegister: {
    marginVertical: 4,
  },
  textRegister: {
    color: "#3a3a3a",
  },
  buttonLogin: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginVertical: 10,
    borderRadius: 16,
    padding: 20,
    backgroundColor: "#ffbc0d",
  },
  LoginPNG: {
    width: "60%",
    height: 240,
    position: "relative", // Altura fixa da imagem (ajuste conforme necessário para preencher a tela inicialmente)
  },
});

export default LoginScreen;
