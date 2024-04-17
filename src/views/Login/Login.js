import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,TextInput,TouchableOpacity } from 'react-native';
 
function LoginScreen() {
  const [inputLogin,onChangeText] =React.useState('');

  return (
    <View style={styles.container}>
        <TextInput style={styles.input} placeholder='Usuário' onChangeText={onChangeText} value={inputLogin}/>
        <TextInput style={styles.input} placeholder='Senha'   onChangeText={onChangeText} value={inputLogin}/>
        <TouchableOpacity style={styles.buttonLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,padding:24,backgroundColor:'#fff',alignItems: 'center', justifyContent: 'center',
  },
  
  input:{
    width:'100%',margin:12,borderRadius:16,padding: 16,backgroundColor:'#e3e3e3'
  },
  buttonLogin:{
    alignItems: 'center', justifyContent: 'center',
    width:'100%',margin:12,borderRadius:16,padding:12 ,backgroundColor:'#ffbc0d'
  }

})

export default LoginScreen;
