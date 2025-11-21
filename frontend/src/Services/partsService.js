import axios from 'axios';
import { API_URL } from '../utils';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));


export const getParts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/parts`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener piezas:', error);
    throw error.response?.data || 'Error al obtener piezas';
  }
};

export const getPartById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/parts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener pieza:', error);
    throw error.response?.data || 'Error al obtener pieza';
  }
};
export const getPartsByBrand = async (brandId) => {
  try {
    const response = await axios.get(`${API_URL}/api/parts/brand/${brandId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener piezas por marca:", error);
    throw error;
  }
};


export const createPart = async (data, imageFile = null) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('brand_id', data.brand_id);
    formData.append('model', data.model || '');
    formData.append('car_make', data.car_make || '');
    formData.append('car_model', data.car_model || '');
    formData.append('year_range', data.year_range || '');
    formData.append('price', data.price);
    formData.append('stock', data.stock || 1);
    formData.append('description', data.description || '');
    if (imageFile) formData.append('image', imageFile);

    const response = await axios.post(`${API_URL}/api/parts`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error('Error al crear pieza:', error);
    throw error.response?.data || 'Error al crear pieza';
  }
};

export const updatePart = async (id, data, imageFile = null) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('brand_id', data.brand_id);
    formData.append('model', data.model || '');
    formData.append('car_make', data.car_make || '');
    formData.append('car_model', data.car_model || '');
    formData.append('year_range', data.year_range || '');
    formData.append('price', data.price);
    formData.append('stock', data.stock || 1);
    formData.append('description', data.description || '');
    if (imageFile) formData.append('image', imageFile);

    const response = await axios.put(`${API_URL}/api/parts/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error('Error al actualizar pieza:', error);
    throw error.response?.data || 'Error al actualizar pieza';
  }
};

export const deletePart = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/parts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar pieza:', error);
    throw error.response?.data || 'Error al eliminar pieza';
  }
};
