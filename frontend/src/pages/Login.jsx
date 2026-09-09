import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { LogIn, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../store'
import { useT } from '../i18n'
import toast from 'react-hot-toast'

export default function Login() {
  const { login, isAuthenticated, user, _hydrated } = useAuthStore()
  const navigate = useNavigate()
  const t = useT()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  if (_hydrated && isAuthenticated) {
    if (user?.is_staff) return <Navigate to="/admin-panel" />
    return <Navigate to="/" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const u = await login(form.username, form.password)
      toast.success(t('auth.welcome'))
      if (u.is_staff) navigate('/admin-panel'); else navigate('/')
    } catch (err) {
      toast.error(t('auth.badCreds'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto py-8 animate-fade-in">
      <div className="card">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">{t('auth.loginTitle')}</h1>
          <p className="text-gray-500 text-sm mt-1">{t('auth.loginSub')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.username')}</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="input"
              placeholder={t('auth.username')}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.password')}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input pr-10"
                placeholder={t('auth.password')}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full py-2.5">
            {loading ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                {t('common.loading')}
              </>
            ) : (
              t('auth.login')
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          {t('auth.noAccount')}{' '}
          <Link to="/register" className="text-teal-600 font-medium hover:underline">
            {t('auth.registerLink')}
          </Link>
        </p>
      </div>
    </div>
  )
}
