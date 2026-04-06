import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
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
  }
};

// Items Service
export const itemService = {
  getLostItems: async () => {
    const response = await api.get('/lost-items');
    return response.data;
  },
  getMyLostItems: async () => {
    const response = await api.get('/lost-items/my-items');
    return response.data;
  },
  createLostItem: async (itemData: any) => {
    const response = await api.post('/lost-items', itemData);
    return response.data;
  },
  getFoundItems: async () => {
    const response = await api.get('/found-items');
    return response.data;
  },
  createFoundItem: async (itemData: any) => {
    const response = await api.post('/found-items', itemData);
    return response.data;
  },
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

// Match Service
export const matchService = {
  getMatches: async () => {
    const response = await api.get('/matches/my-matches');
    return response.data;
  },
  confirmMatch: async (matchId: number | string) => {
    const response = await api.post(`/matches/${matchId}/confirm`);
    return response.data;
  }
};

// Notification Service
export const notificationService = {
  getNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },
  getUnreadCount: async () => {
    const response = await api.get('/notifications/unread/count');
    return response.data;
  },
  markAsRead: async (id: number | string) => {
    const response = await api.patch(`/notifications/${id}/read`);
    return response.data;
  }
};

// Location Service
export const locationService = {
  getLocations: async () => {
    const response = await api.get('/locations/active');
    return response.data;
  }
};

export default api;
