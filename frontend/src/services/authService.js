import axios from 'axios';

const authService = {
  // Check auth status
  getStatus: async () => {
    try {
      const response = await axios.get('/auth/api/auth/status');
      return response.data;
    } catch (error) {
      console.error('Error checking auth status:', error);
      throw error;
    }
  },

  // Login
  login: async (credentials) => {
    try {
      const response = await axios.post('/auth/api/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
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