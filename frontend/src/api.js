import axios from 'axios';

// On crée une instance axios avec l'URL de base de notre API
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

// Intercepteur : ajoute automatiquement le token JWT
// à chaque requête si l'utilisateur est connecté
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;