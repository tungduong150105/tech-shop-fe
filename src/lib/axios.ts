import axios from 'axios'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: any) => void
  reject: (error?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

axiosClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    // If error is not 401 or request already retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    // Don't try to refresh if there's no refresh token cookie
    // This prevents infinite retry loops
    if (!document.cookie.includes('refreshToken')) {
      localStorage.removeItem('accessToken')
      return Promise.reject(error)
    }

    // If already refreshing, queue the request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return axiosClient(originalRequest)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      // Try to refresh token
      const { refreshAccessToken } = await import('../services/authService')
      const response = await refreshAccessToken()
      const newToken =
        (response as any)?.data?.accessToken ||
        localStorage.getItem('accessToken')

      if (newToken) {
        localStorage.setItem('accessToken', newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        processQueue(null, newToken)
        isRefreshing = false
        return axiosClient(originalRequest)
      } else {
        throw new Error('No access token received')
      }
    } catch (refreshError) {
      processQueue(refreshError, null)
      isRefreshing = false
      localStorage.removeItem('accessToken')
      return Promise.reject(refreshError)
    }
  }
)

export default axiosClient
