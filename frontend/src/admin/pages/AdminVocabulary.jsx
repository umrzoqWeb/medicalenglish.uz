import { useState, useEffect } from 'react'
import adminApi from '../api'
export default function AdminVocabulary() {
  const [items, setItems] = useState([])
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ unit:'', word:'', translation:'', definition:'', example:'' })
  const load = () => Promise.all([adminApi.get('/vocabulary/'), adminApi.get('/units/')]).then(([v,u]) => { setItems(v.data); setUnits(u.data) }).catch(console.error).finally(() => setLoading(false))
  useEffect(() => { load() }, [])
  const openAdd = () => { setForm({ unit:'', word:'', translation:'', definition:'', example:'' }); setModal('add') }
  const openEdit = (v) => { setForm({ unit:v.unit||'', word:v.word, translation:v.translation, definition:v.definition||'', example:v.example||'' }); setModal(v) }
  const save = async () => { try { const p = { ...form, unit: form.unit || null }; if (modal === 'add') await adminApi.post('/vocabulary/', p); else await adminApi.put(`/vocabulary/${modal.id}/`, p); setModal(null); load() } catch (e) { alert(JSON.stringify(e.response?.data || 'Xatolik')) } }
  const del = async (id) => { if (!confirm("O'chirmoqchimisiz?")) return; await adminApi.delete(`/vocabulary/${id}/`); load() }
  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"/></div>
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Lug'at ({items.length})</h2>
        <button onClick={openAdd} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">+ Yangi so'z</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50"><tr className="text-left text-slate-600"><th className="px-4 py-3 font-medium">So'z</th><th className="px-4 py-3 font-medium">Tarjima</th><th className="px-4 py-3 font-medium">Unit</th><th className="px-4 py-3 font-medium text-right">Amallar</th></tr></thead>
          <tbody>{items.map(v => (<tr key={v.id} className="border-t border-slate-100 hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-800">{v.word}</td><td className="px-4 py-3 text-slate-600">{v.translation}</td><td className="px-4 py-3">{v.unit_title ? <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{v.unit_title}</span> : '-'}</td><td className="px-4 py-3 text-right"><button onClick={() => openEdit(v)} className="text-blue-500 hover:text-blue-700 mr-3 text-xs font-medium">Tahrirlash</button><button onClick={() => del(v.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">O'chirish</button></td></tr>))}</tbody>
        </table>
      </div>
      {modal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setModal(null)}><div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl" onClick={e => e.stopPropagation()}><h3 className="text-lg font-semibold mb-5">{modal === 'add' ? "Yangi so'z" : "Tahrirlash"}</h3><div className="space-y-4"><div><label className="block text-sm font-medium text-slate-700 mb-1">Unit</label><select value={form.unit} onChange={e => setForm({...form, unit:e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"><option value="">—</option>{units.map(u => <option key={u.id} value={u.id}>Unit {u.number}: {u.title}</option>)}</select></div><div><label className="block text-sm font-medium text-slate-700 mb-1">So'z</label><input value={form.word} onChange={e => setForm({...form, word:e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"/></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Tarjima</label><input value={form.translation} onChange={e => setForm({...form, translation:e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"/></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Ta'rif</label><textarea value={form.definition} onChange={e => setForm({...form, definition:e.target.value})} rows={2} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"/></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Misol</label><textarea value={form.example} onChange={e => setForm({...form, example:e.target.value})} rows={2} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"/></div></div><div className="flex justify-end gap-3 mt-6"><button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Bekor qilish</button><button onClick={save} className="px-4 py-2 text-sm bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg">Saqlash</button></div></div></div>)}
    </div>)
}
