import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Platform, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../components/Auth/AuthContext';

const ProfileScreen = ({navigation}) => {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const { logout } = useAuth();

  const selectImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos de permissões de câmera para fazer isso funcionar!');
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: profileImage }}
        style={styles.profileImage}
      />
      <Button title="Selecionar Imagem" onPress={selectImage} />

      <Text style={styles.username}>Juvenal</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Escola</Text>
          <Text style={styles.detailValue}>Santa Barbara</Text>
        </View>
      </View>

      <View style={styles.orderContainer}>
        <Text style={styles.orderLabel}>Pedido Atual</Text>
        <Text style={styles.orderContent}>Nenhum pedido no momento</Text>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  detailItem: {
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    color: '#555',
  },
  orderContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  orderLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderContent: {
    fontSize: 16,
    color: '#555',
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f00', // Cor de fundo do botão
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#fff', // Cor do texto do botão
    textAlign: 'center',
  },
});

export default ProfileScreen;
