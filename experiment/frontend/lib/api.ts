import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
          const response = await apiClient.post('/v1/auth/refresh', {
            refresh_token: refreshToken,
          })

          const { access_token, refresh_token: newRefreshToken } = response.data
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('refresh_token', newRefreshToken)
          
          // Update Zustand store if available
          if (typeof window !== 'undefined') {
            const { useAuthStore } = await import('@/store/authStore')
            useAuthStore.getState().setTokens(access_token, newRefreshToken)
          }

          originalRequest.headers.Authorization = `Bearer ${access_token}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        if (typeof window !== 'undefined') {
          window.location.href = '/account/login'
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient

export const leadsApi = {
  create: (data: {
    name: string
    phone: string
    style?: string
    preferred_time?: string
    comment?: string
  }) => apiClient.post('/v1/leads', data),
}

export const slotsApi = {
  get: (params?: { start_date?: string; end_date?: string; style?: string }) =>
    apiClient.get('/v1/slots', { params }),
}

export const blogApi = {
  getPosts: (page = 1, pageSize = 10) =>
    apiClient.get('/v1/blog', { params: { page, page_size: pageSize } }),
  getPost: (slug: string) => apiClient.get(`/v1/blog/${slug}`),
}

export const authApi = {
  register: (data: { email: string; phone: string; name: string; password: string }) =>
    apiClient.post('/v1/auth/register', data),
  login: (email: string, password: string) =>
    apiClient.post('/v1/auth/login', new URLSearchParams({ username: email, password }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }),
  getMe: () => apiClient.get('/v1/auth/me'),
}

export const subscriptionsApi = {
  getMy: () => apiClient.get('/v1/subscriptions/me'),
  getBalance: () => apiClient.get('/v1/lessons/subscription/balance'),
}

export const lessonsApi = {
  getMy: (is_attended?: boolean) =>
    apiClient.get('/v1/lessons/me', { params: { is_attended } }),
}

