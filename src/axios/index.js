import axios from 'axios';

const axiosInstance = axios.create({
    baseUrl: 'http://cb56b36a73ea.ngrok.io'
});

export default axiosInstance;