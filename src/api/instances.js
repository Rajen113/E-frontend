import axios from "axios";

export const authAPI = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL || "http://192.168.29.249:8000",
});

export const productAPI = axios.create({
  baseURL: import.meta.env.VITE_PRODUCT_URL || "http://192.168.29.249:8001",
});

export const cartAPI = axios.create({
  baseURL: import.meta.env.VITE_CART_URL || "http://192.168.29.249:8003",
});

export const orderAPI = axios.create({
  baseURL: import.meta.env.VITE_ORDER_URL || "http://192.168.29.249:8004",
});

export const paymentAPI = axios.create({
  baseURL: import.meta.env.VITE_PAYMENT_URL || "http://192.168.29.249:8000",
});

const services = [authAPI, productAPI, cartAPI, orderAPI, paymentAPI];

services.forEach((api) => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
});