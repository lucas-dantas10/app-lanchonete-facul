import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.1.175:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem('token');

    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.request.status === 401 ) {
        AsyncStorage.removeItem('token');
    }

    throw error;
});

export default api;
