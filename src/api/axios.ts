import axios, { AxiosInstance } from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4000/api/',
  withCredentials: true,
}) as AxiosInstance;
