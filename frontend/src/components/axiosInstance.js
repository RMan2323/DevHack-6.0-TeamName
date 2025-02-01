import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Updated to match backend server URL
});

export default axiosInstance;
