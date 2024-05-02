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
  const [inputName, setName] = useState("");
  const [inputSchool, setSchool] = useState("Selecione sua escola");
  const [inputUser, setUser] = useState("");
  const [inputPassword, setPassword] = useState("");
  const [inputPasswordTwo, setPasswordTwo] = useState("");

  return (
    <View style={styles.container}>
      <Image style={styles.LoginPNG} source={LoginPNG} />
      <Text style={styles.text}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={setName}
        value={inputName}
      />
     <Picker style={styles.input}
        inputEscola={setSchool}
        onValueChange={(itemValue, itemIndex) =>
            setSchool(itemValue)
        }>
        <Picker.Item label={inputSchool} value="" />
        <Picker.Item label="Escola 1" value="Escola 1" key={0}/>
        <Picker.Item label="Escola 2" value="Escola 2" key={1}/>
        <Picker.Item label="Escola 3" value="Escola 3" key={2}/>
      </Picker>
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
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme sua senha"
        onChangeText={setPasswordTwo}
        value={inputPasswordTwo}
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
