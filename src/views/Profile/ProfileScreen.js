import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native-web';

function ProfileScreen() {

    return (
        <View style={styles.container}>

           <View>
                <text>Nome:</text>
                <text style={styles.nome}>Colocar o nome aqui</text>
           </View>

           <View>
                <text>Email:</text>
                <text style={styles.email}>Colocar o email aqui</text>
           </View>

           <View>
                <text>Pedidos:</text>
                <text style={styles.pedido}>colocar os pedidos aqui</text>
           </View>

           <View style={styles.sair}>
                <text>Sair</text>
           </View>
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
    nome:{
        backgroundColor: "gray",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    email:{
        backgroundColor: "gray",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    pedido:{
        backgroundColor: "gray",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    sair:{
        backgroundColor: "red",
        borderRadius: 5,
        padding: 10,
        fontWeight: "bold",
        fontSize: 18,
        width: 200,
        textAlign: "center",
    },
});

export default ProfileScreen;
