import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle token expiration
    if (response && response.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Content API
export const contentAPI = {
  generate: (contentData) => api.post('/contents/generate', contentData),
  getAll: () => api.get('/contents'),
  getFavorites: () => api.get('/contents/favorites'),
  getById: (id) => api.get(`/contents/${id}`),
  update: (id, contentData) => api.put(`/contents/${id}`, contentData),
  toggleFavorite: (id) => api.put(`/contents/${id}/favorite`),
  delete: (id) => api.delete(`/contents/${id}`),
};

// Admin API
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getAllUsers: () => api.get('/admin/users'),
};

export default api;