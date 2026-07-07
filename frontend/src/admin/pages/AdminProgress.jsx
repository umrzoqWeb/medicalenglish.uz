import { useState, useEffect } from 'react'
import adminApi from '../api'

export default function AdminProgress() {
  const [data, setData] = useState({ progress: [], summary: [] })
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const [userFilter, setUserFilter] = useState('')
  const [unitFilter, setUnitFilter] = useState('')

  const load = () => {
    const params = new URLSearchParams()
    if (userFilter) params.set('user', userFilter)
    if (unitFilter) params.set('unit', unitFilter)
    Promise.all([
      adminApi.get(`/progress/?${params}`),
      adminApi.get('/units/')
    ]).then(([p, u]) => { setData(p.data); setUnits(u.data) })
      .catch(console.error).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [userFilter, unitFilter])

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"/></div>

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Talabalar natijalari</h2>

      {data.summary.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Umumiy ko'rsatkichlar</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50"><tr className="text-left text-slate-600">
                <th className="px-4 py-3 font-medium">Talaba</th>
                <th className="px-4 py-3 font-medium text-center">Bajarilgan</th>
                <th className="px-4 py-3 font-medium text-center">O'rtacha ball</th>
                <th className="px-4 py-3 font-medium text-center">Umumiy ball</th>
                <th className="px-4 py-3 font-medium text-center">Batafsil</th>
              </tr></thead>
              <tbody>{data.summary.map(s => (
                <tr key={s.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{s.name}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">{s.completed}/{s.total}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-semibold ${s.avg_score >= 80 ? 'text-emerald-600' : s.avg_score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{s.avg_score}%</span>
                  </td>
                  <td className="px-4 py-3 text-center font-semibold text-blue-600">{s.points}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => setUserFilter(s.id)} className="text-blue-500 hover:text-blue-700 text-xs font-medium">Ko'rish →</button>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-800">Batafsil natijalar ({data.progress.length})</h3>
          <div className="flex items-center gap-3">
            {userFilter && (
              <button onClick={() => setUserFilter('')} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200">
                ✕ Filtrni olib tashlash
              </button>
            )}
            <select value={unitFilter} onChange={e => setUnitFilter(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-emerald-500">
              <option value="">Barcha mavzular</option>
              {units.map(u => <option key={u.id} value={u.id}>Unit {u.number}: {u.title}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr className="text-left text-slate-600">
              <th className="px-4 py-3 font-medium">Talaba</th>
              <th className="px-4 py-3 font-medium">Mavzu</th>
              <th className="px-4 py-3 font-medium">Topshiriq</th>
              <th className="px-4 py-3 font-medium text-center">Ball</th>
              <th className="px-4 py-3 font-medium text-center">Holat</th>
              <th className="px-4 py-3 font-medium text-center">Urinishlar</th>
              <th className="px-4 py-3 font-medium">Sana</th>
            </tr></thead>
            <tbody>{data.progress.map(p => (
              <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">{p.first_name || p.username}</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">U{p.unit_number}</span>
                  <span className="text-slate-500 ml-1 text-xs">{p.unit_title}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-slate-700 text-xs">T{p.task_number}: {p.task_title}</span>
                  <span className="text-slate-400 ml-1 text-xs">({p.task_type})</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`font-semibold ${p.score >= 80 ? 'text-emerald-600' : p.score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{p.score}%</span>
                </td>
                <td className="px-4 py-3 text-center">
                  {p.completed
                    ? <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">✓ Bajarildi</span>
                    : <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-medium">✗ Bajarilmadi</span>
                  }
                </td>
                <td className="px-4 py-3 text-center text-slate-500">{p.attempts}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{p.completed_at ? new Date(p.completed_at).toLocaleString('uz') : '—'}</td>
              </tr>
            ))}</tbody>
          </table>
          {!data.progress.length && <p className="text-center py-8 text-slate-400">Natijalar topilmadi</p>}
        </div>
      </div>
    </div>
  )
}
