import axios from 'axios';

// Get the backend URL from environment variable or default to current host
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';
const AUTH_URL = import.meta.env.VITE_AUTH_URL || '';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Create a separate axios instance for auth requests
const authApiClient = axios.create({
  baseURL: AUTH_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { apiClient, authApiClient };