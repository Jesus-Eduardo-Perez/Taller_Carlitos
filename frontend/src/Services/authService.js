import axios from 'axios';
const API_URL = 'http://localhost:3000'

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
export const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL + '/api/auth/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error en el servicio de autenticación:', error.response || error);
        throw error.response?.data?.error || 'Error al iniciar sesión. Verifica tus credenciales.';
    }
};
export const getUserProfile = async () => {
    try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token'); // Recupera el token
        if (!token) throw new Error("No hay token disponible");

        const response = await axios.get(API_URL + '/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error obteniendo perfil:', error);
        return null;
    }
};
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
};