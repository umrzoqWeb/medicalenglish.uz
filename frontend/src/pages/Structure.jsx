import { useState, useEffect } from 'react'
import { Building2, Users, GraduationCap } from 'lucide-react'
import api from '../services/api'

export default function Structure() {
  const [unis, setUnis] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/universities/').then(res => {
      setUnis(Array.isArray(res.data) ? res.data : res.data.results || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const totalStudents = unis.reduce((sum, u) => sum + u.student_count, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="rounded-2xl shadow-lg p-6 mb-6 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Building2 className="w-7 h-7" />
          <h1 className="text-2xl font-bold">Structure</h1>
        </div>
        <p className="text-white/80 text-sm">Tajriba sinovida ishtirok etayotgan OTMlar</p>
        <div className="flex gap-6 mt-4">
          <div className="flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-semibold">{unis.length} ta OTM</span>
          </div>
          <div className="flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2">
            <Users className="w-4 h-4" />
            <span className="text-sm font-semibold">{totalStudents} ta talaba</span>
          </div>
        </div>
      </div>

      {/* University cards */}
      <div className="grid gap-4">
        {unis.map((uni, i) => (
          <div key={uni.id} className="card hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl flex items-center justify-center text-2xl border border-teal-100">
                  {uni.logo || '🏥'}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{uni.name}</h3>
                  {uni.short_name && (
                    <span className="text-xs text-teal-600 font-semibold bg-teal-50 px-2 py-0.5 rounded-full">{uni.short_name}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-xl border border-teal-100">
                <GraduationCap className="w-4 h-4 text-teal-600" />
                <span className="font-bold text-teal-700">{uni.student_count}</span>
                <span className="text-xs text-teal-500">students</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
