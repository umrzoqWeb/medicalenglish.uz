import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import adminApi from '../api'
export default function AdminUnits() {
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ number: '', title: '', description: '' })
  const load = () => adminApi.get('/units/').then(r => setUnits(r.data)).catch(console.error).finally(() => setLoading(false))
  useEffect(() => { load() }, [])
  const openAdd = () => { setForm({ number: '', title: '', description: '' }); setModal('add') }
  const openEdit = (u) => { setForm({ number: u.number, title: u.title, description: u.description || '' }); setModal(u) }
  const save = async () => {
    try {
      if (modal === 'add') await adminApi.post('/units/', form)
      else await adminApi.put(`/units/${modal.id}/`, form)
      setModal(null); load()
    } catch (e) { alert(JSON.stringify(e.response?.data || 'Xatolik')) }
  }
  const del = async (id) => { if (!confirm("O'chirmoqchimisiz?")) return; await adminApi.delete(`/units/${id}/`); load() }
  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"/></div>
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Mavzular ({units.length})</h2>
        <button onClick={openAdd} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">+ Yangi mavzu</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50"><tr className="text-left text-slate-600">
            <th className="px-4 py-3 font-medium">#</th><th className="px-4 py-3 font-medium">Mavzu nomi</th>
            <th className="px-4 py-3 font-medium text-center">Topshiriqlar</th><th className="px-4 py-3 font-medium text-center">Savollar</th>
            <th className="px-4 py-3 font-medium text-right">Amallar</th>
          </tr></thead>
          <tbody>{units.map(u => (
            <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="px-4 py-3 font-semibold text-slate-600">{u.number}</td>
              <td className="px-4 py-3"><Link to={`/admin-panel/tasks?unit=${u.id}`} className="text-emerald-600 hover:underline font-medium">{u.title}</Link>
                {u.description && <p className="text-xs text-slate-400 mt-0.5 truncate max-w-md">{u.description}</p>}</td>
              <td className="px-4 py-3 text-center"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">{u.tasks_count}</span></td>
              <td className="px-4 py-3 text-center"><span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-medium">{u.questions_count}</span></td>
              <td className="px-4 py-3 text-right">
                <button onClick={() => openEdit(u)} className="text-blue-500 hover:text-blue-700 mr-3 text-xs font-medium">Tahrirlash</button>
                <button onClick={() => del(u.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">O'chirish</button></td>
            </tr>))}</tbody>
        </table>
      </div>
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-5">{modal === 'add' ? 'Yangi mavzu' : 'Tahrirlash'}</h3>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Raqam</label><input type="number" value={form.number} onChange={e => setForm({...form, number: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"/></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Mavzu nomi</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"/></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Tavsif</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"/></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Bekor qilish</button>
              <button onClick={save} className="px-4 py-2 text-sm bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg">Saqlash</button>
            </div></div></div>)}
    </div>)
}
