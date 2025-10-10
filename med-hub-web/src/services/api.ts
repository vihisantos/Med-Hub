import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    // colocar token aqui quando implementar auth global
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;