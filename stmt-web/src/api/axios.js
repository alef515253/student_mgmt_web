import axios from 'axios';
import { getAccessToken, setAccessToken ,removeTokens } from './auth'; // These functions handle getting/setting tokens
import { useAuth } from '../AuthProvider';
import { toast } from 'react-toastify';
import { toastOptions } from './toastConfig';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8089/stmmgmt/v1/api/stm', // Replace with your API base URL
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
    toast.error('Request error: ' + error.message, { ...toastOptions, type: 'error' });
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  
  (response) => {
    if (response.config.showToastOnResponse) {
      toast.success('API call succeeded! '+response.data.message, { ...toastOptions, type: 'success' });
    }
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
        window.location.href = '/login';   
        return Promise.reject(refreshError);
      }
    }
    else{
      toast.error(error.response.data.message?error.response.data.message:error.response.data.error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;