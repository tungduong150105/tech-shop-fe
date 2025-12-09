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
    // Do not auto-remove token on 401 to avoid logging out during protected flows
    return Promise.reject(error)
  }
)

export default axiosClient
