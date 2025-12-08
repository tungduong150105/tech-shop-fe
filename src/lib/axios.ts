import axios from 'axios'

const axiosClient = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
axiosClient.interceptors.response.use(
  response => response,
  async error => {
    // If error is 401 (Unauthorized), remove access token
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')
      // Optionally redirect to login page
      // window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosClient
