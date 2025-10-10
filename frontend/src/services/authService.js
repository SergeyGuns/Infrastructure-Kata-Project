import { apiClient, authApiClient } from './api';

const authService = {
  // Check auth health
  getHealth: async () => {
    try {
      // Use apiClient to include auth token if available
      const response = await apiClient.get('/auth/health');
      return response.data;
    } catch (error) {
      console.error('Error checking auth health:', error);
      throw error;
    }
  },

  // Login
  login: async (credentials) => {
    try {
      // Use authApiClient since auth requests shouldn't include auth token
      const response = await authApiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      // Use authApiClient since auth requests shouldn't include auth token
      const response = await authApiClient.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
  },

  // Get current user
  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    // In a real app, you would decode the JWT or make an API call
    // to get user info. For now, we'll just return a placeholder.
    return { id: 1, name: 'User' };
  }
};

export default authService;