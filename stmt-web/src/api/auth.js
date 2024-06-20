export const getAccessToken = () => localStorage.getItem('token');
export const setAccessToken = (token) => localStorage.setItem('token', token);
export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const setRefreshToken = (token) => localStorage.setItem('refreshToken', token);
export const removeTokens = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };