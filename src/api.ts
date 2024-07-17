import axios from 'axios';

const API = "https://669640560312447373c1c116.mockapi.io"

// Create axios instance
const service = axios.create({
  timeout: 20000, // Request timeout
  withCredentials: false,
});

// Request intercepter
service.interceptors.request.use(
  async(config) => {
    config.timeout = 120_000;
    config.baseURL = API;

    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

// Response pre-processing
service.interceptors.response.use(
  response => {
    return response;
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
);

export default service;
