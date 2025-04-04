import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// Add auth token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerAgency = async (userData) => {
  try {
    const response = await API.post('/auth/register', {
      ...userData,
      role: 'agency' // Set role as agency
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginAgency = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCurrentAgency = async () => {
  try {
    const response = await API.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};