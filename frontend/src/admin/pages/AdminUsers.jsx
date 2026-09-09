import { useState, useEffect } from 'react'
import adminApi from '../api'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.get('/users/').then(r => setUsers(r.data)).catch(console.error).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"/></div>

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Foydalanuvchilar ({users.length})</h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50"><tr className="text-left text-slate-600">
            <th className="px-4 py-3 font-medium">FIO</th><th className="px-4 py-3 font-medium">Foydalanuvchi</th><th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium text-center">Ball</th><th className="px-4 py-3 font-medium text-center">Daraja</th>
            <th className="px-4 py-3 font-medium text-center">Streak</th><th className="px-4 py-3 font-medium text-center">Topshiriqlar</th>
            <th className="px-4 py-3 font-medium">Oxirgi faollik</th><th className="px-4 py-3 font-medium">Ro'yxatdan</th>
          </tr></thead>
          <tbody>{users.map(u => (
            <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="px-4 py-3 font-semibold text-slate-800">{u.first_name} {u.last_name}</td>
              <td className="px-4 py-3"><span className="font-medium text-slate-800">{u.username}</span></td>
              <td className="px-4 py-3 text-slate-600">{u.email || '-'}</td>
              <td className="px-4 py-3 text-center font-semibold text-amber-600">{u.points}</td>
              <td className="px-4 py-3 text-center"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">{u.level}</span></td>
              <td className="px-4 py-3 text-center"><span className="text-orange-500 font-medium">{u.streak}</span></td>
              <td className="px-4 py-3 text-center"><span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">{u.completed_tasks}</span></td>
              <td className="px-4 py-3 text-slate-500 text-xs">{u.last_activity ? new Date(u.last_activity).toLocaleDateString('uz') : '-'}</td>
              <td className="px-4 py-3 text-slate-500 text-xs">{new Date(u.date_joined).toLocaleDateString('uz')}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
