import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const saveToken = (token) => {
  localStorage.setItem('management_token', token);
  setAuthToken(token);
};

export const getToken = () => localStorage.getItem('management_token');

export const saveProfile = (profile) => {
  localStorage.setItem('management_profile', JSON.stringify(profile));
};

export const getProfileFromStorage = () => {
  const raw = localStorage.getItem('management_profile');
  return raw ? JSON.parse(raw) : null;
};

export const logout = () => {
  localStorage.removeItem('management_token');
  localStorage.removeItem('management_profile');
  setAuthToken(null);
};

const existingToken = getToken();
if (existingToken) {
  setAuthToken(existingToken);
}

export const loginUser = (payload) => api.post('/api/auth/login', payload);
export const registerUser = (payload) => api.post('/api/auth/register', payload);
export const getCurrentUser = () => api.get('/api/me');
export const getAdminStats = () => api.get('/api/admin/stats');
