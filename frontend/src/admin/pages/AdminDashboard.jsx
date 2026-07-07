import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import adminApi from '../api'
export default function AdminDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { adminApi.get('/dashboard/').then(r => setData(r.data)).catch(console.error).finally(() => setLoading(false)) }, [])
  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"/></div>
  const stats = [
    { label: 'Mavzular', val: data?.total_units, color: 'bg-blue-500', to: '/admin-panel/units' },
    { label: 'Topshiriqlar', val: data?.total_tasks, color: 'bg-purple-500', to: '/admin-panel/tasks' },
    { label: 'Savollar', val: data?.total_questions, color: 'bg-orange-500', to: '/admin-panel/questions' },
    { label: 'Foydalanuvchilar', val: data?.total_users, color: 'bg-emerald-500', to: '/admin-panel/users' },
    { label: "Lug'at", val: data?.total_vocabulary, color: 'bg-cyan-500', to: '/admin-panel/vocabulary' },
    { label: 'Idiomalar', val: data?.total_idioms, color: 'bg-pink-500', to: '/admin-panel/idioms' },
    { label: 'Phrasal Verbs', val: data?.total_phrasal_verbs, color: 'bg-amber-500', to: '/admin-panel/phrasal-verbs' },
    { label: 'Bugun faol', val: data?.active_today, color: 'bg-green-500', to: '/admin-panel/users' },
  ]
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <Link key={i} to={s.to} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center text-white mb-3`}>
              <span className="text-lg font-bold">{String(s.val||0).charAt(0)}</span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{s.val || 0}</p>
            <p className="text-sm text-slate-500 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Mavzular statistikasi</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="pb-3 font-medium">#</th><th className="pb-3 font-medium">Mavzu</th>
              <th className="pb-3 font-medium text-center">Topshiriqlar</th><th className="pb-3 font-medium text-center">Savollar</th>
            </tr></thead>
            <tbody>{data?.units_stats?.map(u => (
              <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 font-medium text-slate-600">{u.number}</td>
                <td className="py-3"><Link to={`/admin-panel/tasks?unit=${u.id}`} className="text-emerald-600 hover:underline">{u.title}</Link></td>
                <td className="py-3 text-center"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">{u.task_count}</span></td>
                <td className="py-3 text-center"><span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-medium">{u.question_count}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
