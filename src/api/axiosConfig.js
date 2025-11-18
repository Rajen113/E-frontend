import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://192.168.29.249:8000'

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default axiosInstance
