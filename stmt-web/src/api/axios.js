import axios from 'axios';
import { getAccessToken, setAccessToken ,removeTokens } from './auth'; // These functions handle getting/setting tokens
import { useAuth } from '../AuthProvider';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8089/stmmgmt/v1', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const { data } = await axios.post('http://localhost:8089/stmmgmt/api/auth/refresh-token', refreshToken);
        setAccessToken(data);
        originalRequest.headers.Authorization = `Bearer ${data}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error (e.g., log out the user)
        console.error('Refresh token error', refreshError);
        removeTokens();       
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;