// For Vite projects
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// For Create React App
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const api = {
  // Auth endpoints
  login: (credentials) => 
    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }),

  register: (userData) => 
    fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }),

  // Lost items endpoints
  getLostItems: (token) => 
    fetch(`${API_URL}/lost-items`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }),

  createLostItem: (token, itemData) => 
    fetch(`${API_URL}/lost-items`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemData)
    }),

  // Found items endpoints
  getFoundItems: (token) => 
    fetch(`${API_URL}/found-items`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }),

  createFoundItem: (token, itemData) => 
    fetch(`${API_URL}/found-items`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemData)
    }),

  // File upload
  uploadFile: (token, file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return fetch(`${API_URL}/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
  },

  // Notifications
  getNotifications: (token) => 
    fetch(`${API_URL}/notifications`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }),

  getUnreadCount: (token) => 
    fetch(`${API_URL}/notifications/unread/count`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }),

  // Locations
  getLocations: () => 
    fetch(`${API_URL}/locations/active`),

  // Analytics (Admin)
  getDashboard: (token) => 
    fetch(`${API_URL}/analytics/dashboard`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
};

export default api;
