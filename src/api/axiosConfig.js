import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://homi.chat/api'
});

const refreshToken = async () => {
  try {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    const response = await axios.post(`https://homi.chat/api/auth/refresh/`, {
      "access_token": access_token,
      "refresh_token": refresh_token
    });
    const new_token = response.data.access_token;
    localStorage.setItem('access_token', new_token);
    return new_token
  } catch (error) {
    console.error('Error refreshing token', error);
    throw new Error('Failed to refresh token');
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      try {
        const newToken = await refreshToken();
        error.config.headers['Authorization']=`Bearer ${newToken}`;
        return axiosInstance.request(error.config);
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);
        window.location.href = '/auth/signin';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;