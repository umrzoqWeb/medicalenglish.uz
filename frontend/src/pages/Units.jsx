import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, CheckCircle, BookOpen, Lock } from 'lucide-react'
import api from '../services/api'
import { useAuthStore } from '../store'
import { useT } from '../i18n'

export default function Units() {
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const t = useT()

  useEffect(() => {
    api.get('/units/').then(res => {
      setUnits(res.data)
      setLoading(false)
    })
  }, [])

  const handleUnitClick = (e, unitId) => {
    if (!isAuthenticated) {
      e.preventDefault()
      navigate('/login', { state: { from: `/units/${unitId}` } })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-teal-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold">{t('units.title')}</h1>
          <p className="text-sm text-gray-500">{t('units.subtitle')}</p>
        </div>
      </div>

      {!isAuthenticated && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <Lock className="w-5 h-5 text-amber-600" />
          <p className="text-sm text-amber-800">
            {t('units.lockText')} <Link to="/login" className="font-semibold text-amber-900 underline">{t('auth.loginLink')}</Link>
          </p>
        </div>
      )}

      <div className="space-y-3">
        {units.map(unit => {
          const progress = unit.tasks_count ? (unit.completed_count / unit.tasks_count) * 100 : 0
          const isCompleted = progress === 100

          return (
            <Link
              key={unit.id}
              to={`/units/${unit.id}`}
              onClick={(e) => handleUnitClick(e, unit.id)}
              className="card flex items-center gap-4 hover:border-teal-300"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg ${
                isCompleted
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white'
              }`}>
                {isCompleted ? <CheckCircle className="w-6 h-6" /> : unit.number}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{unit.title}</h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex-1 max-w-[200px]">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {unit.completed_count}/{unit.tasks_count} {t('common.tasks')}
                  </span>
                </div>
              </div>

              {!isAuthenticated && <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />}
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
