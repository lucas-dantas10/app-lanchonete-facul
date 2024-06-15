import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import * as Animatable from "react-native-animatable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import api from '../../../api';

function SignUpScreen() {
  const [inputSchool, setSchool] = useState(null);
  const [inputName, setName] = useState("");
  const [inputUser, setUser] = useState("");
  const [inputPassword, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPerfect, setShowPerfect] = useState(false);

  useEffect(() => {
    validateForm();
  }, [inputSchool, inputName, inputUser, inputPassword]);

  const validateForm = () => {
    let newErrors = {};

    if (inputSchool === null) {
      newErrors.inputSchool = "Escolha a sua escola para seu cadastro";
    }

    if (!inputName) {
      newErrors.inputName = "Insira seu Nome";
    }

    if (!inputUser) {
      newErrors.inputUser = "Insira um E-mail";
    }

    if (!inputPassword) {
      newErrors.inputPassword = "Insira uma senha para cadastro";
    } else if (inputPassword.length < 6) {
      newErrors.inputPassword = "A senha precisa conter no mínimo 6 caracteres";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setShowPerfect(true);
    } else {
      setShowPerfect(false);
    }
  };

  const handleSubmit = () => {
    validateForm();
    if (Object.keys(errors).length > 0) {
      console.log("Erros no formulário:", errors);
      Alert.alert(
        "Atenção!",
        "Verifique se todos os campos estão preenchidos corretamente.",
        [{ text: "OK", onPress: () => console.log("Alerta de erro fechado") }],
        { cancelable: false }
      );
      return;
    }

    const data = {
      name: inputName,
      email: inputUser,
      school: inputSchool,
      password: inputPassword,
    };

    api.post('/create/user', data)
      .then(({ data }) => {
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
      })
      .catch((error) => {
        console.log("Erro ao cadastrar usuário:", error);
        Alert.alert(
          "Atenção!",
          "Erro ao cadastrar usuário! Verifique se está preenchido corretamente.",
          [{ text: "OK", onPress: () => console.log("Alerta de erro fechado") }],
          { cancelable: false }
        );
      });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Animatable.Text animation="fadeInDown" style={styles.text}>Cadastro</Animatable.Text>
          
          <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
            <View style={styles.input}>
              <RNPickerSelect
                onValueChange={(value) => setSchool(value)}
                items={[
                    { label: "Colégio Silva Abreu", value: "Colégio Silva Abreu" },
                    { label: "Colégio Campinho Filial", value: "Colégio Campinho Filial" },
                    { label: "Colégio Campinho Matriz", value: "Colégio Campinho Matriz" },
                  ]}
                placeholder={{ label: "Selecione Sua Escola", value: null }}
                style={pickerSelectStyles}
              />
            </View>
            {errors.inputSchool && (
              <Text style={styles.error}>{errors.inputSchool}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Nome"
              onChangeText={setName}
              value={inputName}
            />
            {errors.inputName && (
              <Text style={styles.error}>{errors.inputName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={setUser}
              value={inputUser}
            />
            {errors.inputUser && <Text style={styles.error}>{errors.inputUser}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Senha"
              onChangeText={setPassword}
              value={inputPassword}
              secureTextEntry
            />
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
              <Text style={styles.buttonText}>Cadastre-se</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 32,
    color: "#ffbc0d",
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "90%",
    marginVertical: 10,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonLogin: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginVertical: 20,
    borderRadius: 8,
    padding: 15,
    backgroundColor: "#ffbc0d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 5,
    textAlign: "left",
    width: "90%",
  },
  success: {
    textAlign: "center",
    color: "green",
    fontSize: 16,
    marginBottom: 20,
  },
  check: {
    textAlign: "center",
    fontWeight: "bold",
    color: "green",
    fontSize: 24,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
    width: '100%',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
    width: '100%',
  },
};

export default SignUpScreen;
