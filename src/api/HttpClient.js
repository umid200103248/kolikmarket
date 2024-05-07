import axios from 'axios';
import { useUserStore } from '@/stores/useUserStore.js';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL
});

instance.interceptors.request.use(
  function (config) {
    const userStore = useUserStore();

    if (userStore.isAuthenticated) {
      config.headers['Authorization'] = `Bearer ${userStore.authToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
