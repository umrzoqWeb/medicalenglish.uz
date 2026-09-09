import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../store'
import { useT } from '../i18n'
import toast from 'react-hot-toast'

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirm: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuthStore()
  const navigate = useNavigate()
  const t = useT()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password !== form.password_confirm) {
      toast.error(t('auth.pwMismatch'))
      return
    }

    if (form.password.length < 6) {
      toast.error(t('auth.pwShort'))
      return
    }

    setLoading(true)
    try {
      await register(form)
      toast.success(t('auth.regSuccess'))
      navigate('/login')
    } catch (err) {
      const msg = err.response?.data?.username?.[0] || t('common.error')
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto py-8 animate-fade-in">
      <div className="card">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">{t('auth.registerTitle')}</h1>
          <p className="text-gray-500 text-sm mt-1">{t('auth.registerSub')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.firstName')}</label>
              <input
                type="text"
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                className="input"
                placeholder={t('auth.firstName')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.lastName')}</label>
              <input
                type="text"
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                className="input"
                placeholder={t('auth.lastName')}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.username')} *</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.password')} *</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input pr-10"
                placeholder={t('auth.pwHint')}
                required
                minLength={6}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.pwConfirm')} *</label>
            <input
              type="password"
              value={form.password_confirm}
              onChange={(e) => setForm({ ...form, password_confirm: e.target.value })}
              className="input"
              placeholder={t('auth.pwRetype')}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full py-2.5">
            {loading ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                {t('common.loading')}
              </>
            ) : (
              t('auth.registerTitle')
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          {t('auth.haveAccount')}{' '}
          <Link to="/login" className="text-teal-600 font-medium hover:underline">
            {t('auth.login')}
          </Link>
        </p>
      </div>
    </div>
  )
}
