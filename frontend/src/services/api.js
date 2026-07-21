import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      const refresh = localStorage.getItem('refresh_token')
      if (refresh) {
        try {
          const res = await axios.post('/api/auth/refresh/', { refresh })
          const newToken = res.data.access
          api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
          original.headers['Authorization'] = `Bearer ${newToken}`
          // Update persisted store token
          try {
            const stored = JSON.parse(localStorage.getItem('auth-storage') || '{}')
            stored.state = stored.state || {}
            stored.state.token = newToken
            localStorage.setItem('auth-storage', JSON.stringify(stored))
          } catch(e) {}
          return api(original)
        } catch {
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('auth-storage')
          delete api.defaults.headers.common['Authorization']
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api
