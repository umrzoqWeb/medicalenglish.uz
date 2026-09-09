import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Users, TrendingUp, Award } from 'lucide-react'
import api from '../../services/api'

export default function AdminStructure() {
  const [unis, setUnis] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/universities/').then(async (res) => {
      const list = Array.isArray(res.data) ? res.data : res.data.results || []
      setUnis(list)
      const s = {}
      for (const u of list) {
        try {
          const r = await api.get(`/universities/${u.id}/stats/`)
          s[u.id] = r.data
        } catch(e) {}
      }
      setStats(s)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const total = unis.reduce((s, u) => s + u.student_count, 0)
  const colors = [
    {bg: 'from-blue-500 to-blue-600', light: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-200'},
    {bg: 'from-emerald-500 to-teal-600', light: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-200'},
    {bg: 'from-orange-500 to-amber-600', light: 'bg-orange-50', text: 'text-orange-600', ring: 'ring-orange-200'},
    {bg: 'from-purple-500 to-indigo-600', light: 'bg-purple-50', text: 'text-purple-600', ring: 'ring-purple-200'},
    {bg: 'from-rose-500 to-pink-600', light: 'bg-rose-50', text: 'text-rose-600', ring: 'ring-rose-200'},
  ]

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"/></div>

  const allG = Object.values(stats).reduce((a, s) => ({g5: a.g5+(s.grades?.g5||0), g4: a.g4+(s.grades?.g4||0), g3: a.g3+(s.grades?.g3||0), g2: a.g2+(s.grades?.g2||0)}), {g5:0,g4:0,g3:0,g2:0})
  const allAvg = Object.values(stats).length ? Math.round(Object.values(stats).reduce((a,s) => a + (s.avg_percentage||0), 0) / Object.values(stats).length) : 0

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Tuzilma</h1>
          <p className="text-gray-500 text-sm">OTM ni tanlang — talabalar analitikasini ko'ring</p>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 border shadow-sm text-center">
          <Building2 className="w-5 h-5 text-teal-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-gray-800">{unis.length}</div>
          <div className="text-xs text-gray-400">OTMlar</div>
        </div>
        <div className="bg-white rounded-xl p-4 border shadow-sm text-center">
          <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-gray-800">{total}</div>
          <div className="text-xs text-gray-400">Jami talabalar</div>
        </div>
        <div className="bg-white rounded-xl p-4 border shadow-sm text-center">
          <TrendingUp className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-emerald-600">{allAvg}%</div>
          <div className="text-xs text-gray-400">O'rtacha ball</div>
        </div>
        <div className="bg-white rounded-xl p-4 border shadow-sm text-center">
          <Award className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-amber-600">{allG.g5}</div>
          <div className="text-xs text-gray-400">A'lochilar</div>
        </div>
        <div className="bg-white rounded-xl p-4 border shadow-sm text-center">
          <div className="text-xs mb-1 text-gray-400">Baholar</div>
          <div className="flex items-center justify-center gap-1 text-xs font-bold">
            <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">5:{allG.g5}</span>
            <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">4:{allG.g4}</span>
            <span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">3:{allG.g3}</span>
            <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded">2:{allG.g2}</span>
          </div>
        </div>
      </div>

      {/* University cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {unis.map((uni, i) => {
          const c = colors[i % colors.length]
          const s = stats[uni.id]
          const g = s?.grades || {g5:0,g4:0,g3:0,g2:0}
          const gTotal = g.g5+g.g4+g.g3+g.g2 || 1
          return (
            <Link key={uni.id} to={`/admin-panel/structure/${uni.id}`}
              className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group">
              <div className={`h-1.5 bg-gradient-to-r ${c.bg}`} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-teal-600 transition-colors">{uni.name}</h3>
                    <span className="inline-block mt-1 text-xs font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{uni.short_name}</span>
                  </div>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${c.bg} flex flex-col items-center justify-center text-white shadow-lg`}>
                    <span className="text-lg font-bold leading-none">{uni.student_count}</span>
                    <span className="text-[9px] opacity-80">talaba</span>
                  </div>
                </div>

                {/* Grade distribution bar */}
                <div className="mb-3">
                  <div className="flex items-center gap-1 h-3 rounded-full overflow-hidden bg-gray-100">
                    {g.g5 > 0 && <div className="h-full bg-emerald-500 rounded-l-full" style={{width: `${g.g5/gTotal*100}%`}} />}
                    {g.g4 > 0 && <div className="h-full bg-blue-500" style={{width: `${g.g4/gTotal*100}%`}} />}
                    {g.g3 > 0 && <div className="h-full bg-amber-500" style={{width: `${g.g3/gTotal*100}%`}} />}
                    {g.g2 > 0 && <div className="h-full bg-red-500 rounded-r-full" style={{width: `${g.g2/gTotal*100}%`}} />}
                  </div>
                  <div className="flex justify-between mt-1.5 text-[10px] font-semibold text-gray-500">
                    <span className="text-emerald-600">5: {g.g5}</span>
                    <span className="text-blue-600">4: {g.g4}</span>
                    <span className="text-amber-600">3: {g.g3}</span>
                    <span className="text-red-600">2: {g.g2}</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${c.text}`}>{s?.avg_percentage || 0}%</div>
                    <div className="text-[10px] text-gray-400">O'rtacha</div>
                  </div>
                  <div className="text-xs text-teal-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Batafsil →
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
