import axios from 'axios'
const adminApi = axios.create({
  baseURL: '/api/admin-panel',
  headers: { 'Content-Type': 'application/json' }
})
adminApi.interceptors.request.use((config) => {
  const stored = JSON.parse(localStorage.getItem('auth-storage') || '{}')
  const token = stored?.state?.token
  if (token) config.headers.Authorization = 'Bearer ' + token
  return config
})
adminApi.interceptors.response.use(
  (r) => r,
  async (err) => {
    const original = err.config
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true
      const refresh = localStorage.getItem('refresh_token')
      if (refresh) {
        try {
          const res = await axios.post('/api/auth/refresh/', { refresh })
          const newToken = res.data.access
          try {
            const stored = JSON.parse(localStorage.getItem('auth-storage') || '{}')
            stored.state = stored.state || {}
            stored.state.token = newToken
            localStorage.setItem('auth-storage', JSON.stringify(stored))
          } catch(e) {}
          original.headers['Authorization'] = 'Bearer ' + newToken
          return adminApi(original)
        } catch {
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('auth-storage')
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(err)
  }
)
export default adminApi
