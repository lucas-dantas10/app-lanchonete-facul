import React from 'react';
import {useState} from 'react'
import LoginPNG from '../../../assets/LogoLogin.png'
import { StyleSheet, Text, View,SafeAreaView,TextInput,TouchableOpacity,Image} from 'react-native';
 
function LoginScreen() {
  const [inputLogin,onChangeUsuario] = useState('');
  const [inputSenha,onChangeSenha] = useState('');
  
  return (
    
    <View style={styles.container}>
      <Image style={styles.LoginPNG} source={LoginPNG} />
        <TextInput style={styles.input} placeholder='Usuário' onChangeText={onChangeUsuario} value={inputLogin}/>
        <TextInput style={styles.input} placeholder='Senha'   onChangeText={onChangeSenha} value={inputSenha}/>
        <TouchableOpacity style={styles.buttonLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,padding:24,backgroundColor:'#fff',alignItems: 'center', 
  },
  
  input:{
    width:'90%',margin:12,borderRadius:16,padding: 14,backgroundColor:'#e3e3e3'
  },
  buttonLogin:{
    alignItems: 'center', justifyContent: 'center',
    width:'90%',margin:12,borderRadius:16,padding:20 ,backgroundColor:'#ffbc0d'
  },
  LoginPNG:{
    width:'100%',
    height:'30%',
    marginBottom:'10%',
    marginTop:'20%',
    resizeMode: 'contain',
  }

})

export default LoginScreen;
