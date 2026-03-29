import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use(
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

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export const lostItemService = {
  reportLostItem: async (itemData: any) => {
    const response = await api.post('/lost-items', itemData);
    return response.data;
  },
  getMyLostItems: async () => {
    const response = await api.get('/lost-items/my-items');
    return response.data;
  },
  getLostItemById: async (id: number) => {
    const response = await api.get(`/lost-items/${id}`);
    return response.data;
  },
};

export const foundItemService = {
  reportFoundItem: async (formData: FormData) => {
    const response = await api.post('/found-items', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  getAllFoundItems: async () => {
    const response = await api.get('/found-items');
    return response.data;
  },
  getMyFoundItems: async () => {
    const response = await api.get('/found-items/my-items');
    return response.data;
  },
  submitToSecurity: async (itemId: number, securityDeskId: number) => {
    const response = await api.post(`/found-items/${itemId}/submit-to-security`, null, {
      params: { securityDeskLocationId: securityDeskId },
    });
    return response.data;
  },
};

export const matchService = {
  getMatchesForUser: async () => {
    const response = await api.get('/matches/my-matches');
    return response.data;
  },
  confirmMatch: async (matchId: number) => {
    const response = await api.post(`/matches/${matchId}/confirm`);
    return response.data;
  },
};

export const analyticsService = {
  getStats: async () => {
    const response = await api.get('/analytics/stats');
    return response.data;
  },
  getHotspots: async () => {
    const response = await api.get('/analytics/hotspots');
    return response.data;
  },
};

export default api;
