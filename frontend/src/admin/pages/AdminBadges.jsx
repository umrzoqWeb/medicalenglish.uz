import { useState, useEffect } from 'react'
import adminApi from '../api'

export default function AdminBadges() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ name:'', description:'', icon:'', requirement:'' })

  const load = () => adminApi.get('/badges/').then(r => setItems(r.data)).catch(console.error).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openAdd = () => { setForm({ name:'', description:'', icon:'', requirement:'' }); setModal('add') }
  const openEdit = (b) => { setForm({ name:b.name, description:b.description, icon:b.icon, requirement:b.requirement }); setModal(b) }

  const save = async () => {
    try {
      if (modal === 'add') await adminApi.post('/badges/', form)
      else await adminApi.put(`/badges/${modal.id}/`, form)
      setModal(null); load()
    } catch (e) { alert(JSON.stringify(e.response?.data || 'Xatolik')) }
  }
  const del = async (id) => { if (!confirm("O'chirmoqchimisiz?")) return; await adminApi.delete(`/badges/${id}/`); load() }

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"/></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Nishonlar ({items.length})</h2>
        <button onClick={openAdd} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">+ Yangi nishon</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50"><tr className="text-left text-slate-600">
            <th className="px-4 py-3 font-medium">Icon</th><th className="px-4 py-3 font-medium">Nomi</th>
            <th className="px-4 py-3 font-medium">Tavsif</th><th className="px-4 py-3 font-medium">Talab</th>
            <th className="px-4 py-3 font-medium text-right">Amallar</th>
          </tr></thead>
          <tbody>{items.map(b => (
            <tr key={b.id} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="px-4 py-3 text-2xl">{b.icon}</td>
              <td className="px-4 py-3 font-medium text-slate-800">{b.name}</td>
              <td className="px-4 py-3 text-slate-600 max-w-xs truncate">{b.description}</td>
              <td className="px-4 py-3"><span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs">{b.requirement}</span></td>
              <td className="px-4 py-3 text-right">
                <button onClick={() => openEdit(b)} className="text-blue-500 hover:text-blue-700 mr-3 text-xs font-medium">Tahrirlash</button>
                <button onClick={() => del(b.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">O'chirish</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-5">{modal === 'add' ? 'Yangi nishon' : 'Tahrirlash'}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Nomi</label>
                  <input value={form.name} onChange={e => setForm({...form, name:e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"/></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Icon (emoji)</label>
                  <input value={form.icon} onChange={e => setForm({...form, icon:e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" placeholder="🏆"/></div>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Tavsif</label>
                <textarea value={form.description} onChange={e => setForm({...form, description:e.target.value})} rows={3} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"/></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Talab (requirement)</label>
                <input value={form.requirement} onChange={e => setForm({...form, requirement:e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" placeholder="complete_10_tasks"/></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Bekor qilish</button>
              <button onClick={save} className="px-4 py-2 text-sm bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg">Saqlash</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
