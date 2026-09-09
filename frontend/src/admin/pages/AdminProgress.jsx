import { useState, useEffect } from 'react'
import adminApi from '../api'

export default function AdminProgress() {
  const [data, setData] = useState({ progress: [], summary: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.get('/progress/').then(res => {
      setData(res.data)
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"/></div>

  const gradeColor = (g) => g === 5 ? 'bg-emerald-100 text-emerald-700' : g === 4 ? 'bg-blue-100 text-blue-700' : g === 3 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
  const pctColor = (p) => p >= 90 ? 'text-emerald-600' : p >= 75 ? 'text-blue-600' : p >= 60 ? 'text-amber-600' : 'text-red-600'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Talabalar natijalari</h2>
        <span className="text-sm text-gray-500">{data.summary.length} ta talaba</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-slate-600">
                <th className="px-4 py-3 font-medium w-10">#</th>
                <th className="px-4 py-3 font-medium">Talaba</th>
                <th className="px-4 py-3 font-medium text-center">OTM</th>
                <th className="px-4 py-3 font-medium text-center">Bajarilgan</th>
                <th className="px-4 py-3 font-medium text-center">Mavzu bali</th>
                <th className="px-4 py-3 font-medium text-center">Test natijasi</th>
                <th className="px-4 py-3 font-medium text-center">Baho</th>
              </tr>
            </thead>
            <tbody>
              {data.summary.map((s, i) => (
                <tr key={s.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-2.5 text-xs text-gray-400">{i + 1}</td>
                  <td className="px-4 py-2.5">
                    <div className="font-medium text-slate-800">{s.name}</div>
                    <div className="text-xs text-slate-400">{s.username}</div>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{s.uni}</span>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">{s.completed}/{s.total}</span>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`font-semibold ${pctColor(s.avg_score)}`}>{s.avg_score}%</span>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`font-semibold ${pctColor(s.test_pct)}`}>{s.test_pct}%</span>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${gradeColor(s.grade)}`}>{s.grade}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
