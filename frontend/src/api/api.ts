import axios from 'axios';
import { store } from '../app/store';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const { token } = store.getState().auth;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors (e.g., logout user)
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default api;
