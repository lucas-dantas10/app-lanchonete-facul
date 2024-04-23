import React, { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image, } from 'react-native';
  import LoginPNG from "./assets/LogoLogin.png";

  function SingUpscreen() {
  const [inputNome, onChangeNome] = useState("");
  const [inputEscola, onChangeEscola] = useState("Selecione sua escola");
  const [inputUsuario, onChangeUsuario] = useState("");
  const [inputSenha, onChangeSenha] = useState("");
  const [inputSenha2, onChangeSenha2] = useState("");

  return (
    <View style={styles.container}>
      <Image style={styles.LoginPNG} source={LoginPNG} />
      <Text style={styles.text}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={onChangeNome}
        value={inputNome}
      />
     <Picker style={styles.input}
        inputEscola={onChangeEscola}
        onValueChange={(itemValue, itemIndex) =>
            onChangeEscola(itemValue)
        }>
        <Picker.Item label={inputEscola} value="" />
        <Picker.Item label="Escola 1" value="Escola 1" key={0}/>
        <Picker.Item label="Escola 2" value="Escola 2" key={1}/>
        <Picker.Item label="Escola 3" value="Escola 3" key={2}/>
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        onChangeText={onChangeUsuario}
        value={inputUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={onChangeSenha}
        value={inputSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme sua senha"
        onChangeText={onChangeSenha2}
        value={inputSenha2}
      />
      <TouchableOpacity style={styles.buttonLogin}>
        <Text>Cadastre-se</Text>
      </TouchableOpacity>
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text:{
    fontSize:30,
    color:"#ffbc0d",
    fontWeight:"bold",
    marginBottom:"5%"
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
  LoginPNG: {
    width: "100%",
    height: "10%",
    marginBottom: "5%",
    marginTop: "10%",
    resizeMode: "contain",
  },
});

export default SingUpscreen;
