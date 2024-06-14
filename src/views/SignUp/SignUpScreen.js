import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import * as Animatable from "react-native-animatable";
import check from "../../../assets/check.png";
function SignUpScreen() {
  const [inputSchool, setSchool] = useState(null);
  const [inputUser, setUser] = useState("");
  const [inputPassword, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPerfect, setShowPerfect] = useState(false);

  useEffect(() => {
    validateForm();
  }, [inputSchool, inputUser, inputPassword]);

  const validateForm = () => {
    let newErrors = {};

    if (inputSchool === null) {
      newErrors.inputSchool = "Ecolha a Sua Escola Para seu Cadastro";
    }

    if (!inputUser) {
      newErrors.inputUser = "Insira Um Nome De Usuário";
    }

    if (!inputPassword) {
      newErrors.inputPassword = "Insira Uma Senha Para Cadastro";
    } else if (inputPassword.length < 6) {
      newErrors.inputPassword = "A Senha Precisa Conter No Mínimo 6 Caracteres";
    }

    setErrors(newErrors);
    if (inputSchool !== null && inputUser && inputPassword.length >= 6) {
      setShowPerfect(true);
    } else {
      setShowPerfect(false);
    }
  };

  const handleSubmit = () => {
    validateForm();
    if (Object.keys(errors).length === 0) {
      Alert.alert(
        "Sucesso!",
        "Cadastro Realizado Com Sucesso!",
        [
          {
            text: "OK",
            onPress: () => console.log("Alerta de sucesso fechado"),
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Atenção!",
        "Cadastro Incompleto. Verifique se está preenchido corretamente.",
        [{ text: "OK", onPress: () => console.log("Alerta de erro fechado") }],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cadastro</Text>
      <View style={styles.input}>
        <RNPickerSelect
          onValueChange={(value) => setSchool(value)}
          items={[
            { label: "Escola 1", value: "Escola 1" },
            { label: "Escola 2", value: "Escola 2" },
            { label: "Escola 3", value: "Escola 3" },
          ]}
          placeholder={{ label: "Selecione Sua Escola", value: null }}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        onChangeText={setUser}
        value={inputUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={setPassword}
        value={inputPassword}
        secureTextEntry
      />

      {errors.inputSchool && (
        <Text style={styles.error}>{errors.inputSchool}</Text>
      )}
      {errors.inputUser && <Text style={styles.error}>{errors.inputUser}</Text>}
      {errors.inputPassword && (
        <Text style={styles.error}>{errors.inputPassword}</Text>
      )}

      {showPerfect && (
        <Animatable.Text
          animation="fadeIn"
          duration={500}
          style={styles.success}
        >
          Clique em Cadastre-se para Prosseguir
          <Text style={styles.check}> ✓</Text>
        </Animatable.Text>
      )}

      <TouchableOpacity style={styles.buttonLogin} onPress={handleSubmit}>
        <Text>Cadastre-se</Text>
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
  text: {
    fontSize: 30,
    color: "#ffbc0d",
    fontWeight: "bold",
    marginBottom: "5%",
  },
  input: {
    width: "90%",
    margin: 12,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#e3e3e3",
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
  error: {
    color: "red",
    fontSize: 15,
    marginBottom: 12,
  },
  success: {
    textAlign: "center",
    color: "green",
    fontSize: 16,
  },
  check: {
    textAlign: "center",
    fontWeight: "bold",
    color: "green",
    fontSize: 24,
  },
});

export default SignUpScreen;
