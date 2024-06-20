import React, { useState, useEffect } from "react";
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
import * as Animatable from "react-native-animatable";
import { useAuth } from "../../components/Auth/AuthContext";

function LoginScreen({ navigation, route }) {
  const [inputUsuario, onChangeUsuario] = useState("");
  const [inputSenha, onChangeSenha] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const { login } = useAuth();

  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    
    const monthNames = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    
    const formattedDate = `${day} de ${monthNames[month]} de ${year}`;
    setCurrentDate(formattedDate);
  }, []);

  const handleLogin = async () => {
    await login(inputUsuario, inputSenha);
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Animatable.View animation="fadeInUp" style={styles.inner}>
        <Animatable.Image
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={styles.LoginPNG}
          source={LoginPNG}
          resizeMode="contain"
        />
        <Text style={styles.dateText}>{currentDate}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => onChangeUsuario(text)}
          value={inputUsuario}
          keyboardType="email-address"
          autoCapitalize="none"
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
            Não possui uma conta? <Text style={{ color: "#007BFF" }}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          style={[
            styles.buttonLogin,
            {
              backgroundColor:
                inputUsuario !== "" && inputSenha !== ""
                  ? "#ffbc0d"
                  : "#ddd",
            },
          ]}
          disabled={inputUsuario === "" || inputSenha === ""}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animatable.View>
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
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  LoginPNG: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: "#3a3a3a",
    marginBottom: 20,
  },
});

export default LoginScreen;
