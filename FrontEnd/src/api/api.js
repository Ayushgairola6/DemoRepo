import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Your backend's base URL
});

// Automatically attach the token if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
