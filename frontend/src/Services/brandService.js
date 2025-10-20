import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Interceptor para agregar token si lo usas
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Obtener todas las marcas
export const getBrands = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/brands`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    throw error.response?.data || 'Error al obtener marcas';
  }
};

// Crear marca
export const createBrand = async (name, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', imageFile);

    const response = await axios.post(`${API_URL}/api/brands`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error('Error al crear marca:', error);
    throw error.response?.data || 'Error al crear marca';
  }
};

// Actualizar marca
export const updateBrand = async (id, name, imageFile = null) => {
  try {
    const formData = new FormData();
    formData.append('name', name);
    if (imageFile) formData.append('image', imageFile);

    const response = await axios.put(`${API_URL}/api/brands/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error('Error al actualizar marca:', error);
    throw error.response?.data || 'Error al actualizar marca';
  }
};

// Eliminar marca
export const deleteBrand = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/brands/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar marca:', error);
    throw error.response?.data || 'Error al eliminar marca';
  }
};
