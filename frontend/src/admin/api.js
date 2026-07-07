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
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)
export default adminApi
