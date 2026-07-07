import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import adminApi from '../api'
export default function AdminQuestions() {
  const [sp, setSp] = useSearchParams()
  const [questions, setQuestions] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ task:'', question_text:'', correct_answer:'', options:'', order:0 })
  const tf = sp.get('task') || ''
  const load = () => { const p = tf ? `?task=${tf}` : ''; Promise.all([adminApi.get(`/questions/${p}`), adminApi.get('/tasks/')]).then(([q,t]) => { setQuestions(q.data); setTasks(t.data) }).catch(console.error).finally(() => setLoading(false)) }
  useEffect(() => { load() }, [tf])
  const openAdd = () => { setForm({ task:tf||'', question_text:'', correct_answer:'', options:'', order:0 }); setModal('add') }
  const openEdit = (q) => { setForm({ task:q.task, question_text:q.question_text, correct_answer:q.correct_answer, options:q.options?JSON.stringify(q.options):'', order:q.order }); setModal(q) }
  const save = async () => { try { const payload = { ...form, options: form.options ? JSON.parse(form.options) : null }; if (modal === 'add') await adminApi.post('/questions/', payload); else await adminApi.put(`/questions/${modal.id}/`, payload); setModal(null); load() } catch (e) { alert(JSON.stringify(e.response?.data || 'Xatolik')) } }
  const del = async (id) => { if (!confirm("O'chirmoqchimisiz?")) return; await adminApi.delete(`/questions/${id}/`); load() }
  const tLabel = (id) => { const t = tasks.find(x => x.id === id); return t ? `U${t.unit_number}-T${t.number}: ${t.title}` : id }
  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"/></div>
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Savollar ({questions.length})</h2>
        <div className="flex items-center gap-3">
          <select value={tf} onChange={e => setSp(e.target.value ? {task:e.target.value} : {})} className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 max-w-xs"><option value="">Barcha topshiriqlar</option>{tasks.map(t => <option key={t.id} value={t.id}>U{t.unit_number}-T{t.number}: {t.title}</option>)}</select>
          <button onClick={openAdd} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">+ Yangi</button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50"><tr className="text-left text-slate-600"><th className="px-4 py-3 font-medium w-8">#</th><th className="px-4 py-3 font-medium">Topshiriq</th><th className="px-4 py-3 font-medium">Savol</th><th className="px-4 py-3 font-medium">Javob</th><th className="px-4 py-3 font-medium text-right">Amallar</th></tr></thead>
          <tbody>{questions.map(q => (<tr key={q.id} className="border-t border-slate-100 hover:bg-slate-50"><td className="px-4 py-3 text-slate-400">{q.order}</td><td className="px-4 py-3"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">{tLabel(q.task)}</span></td><td className="px-4 py-3 max-w-xs truncate">{q.question_text}</td><td className="px-4 py-3 font-medium text-emerald-700 max-w-xs truncate">{q.correct_answer}</td><td className="px-4 py-3 text-right"><button onClick={() => openEdit(q)} className="text-blue-500 hover:text-blue-700 mr-3 text-xs font-medium">Tahrirlash</button><button onClick={() => del(q.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">O'chirish</button></td></tr>))}</tbody>
        </table>
        {!questions.length && <p className="text-center py-8 text-slate-400">Savollar topilmadi</p>}
      </div>
      {modal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setModal(null)}><div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl my-8" onClick={e => e.stopPropagation()}><h3 className="text-lg font-semibold mb-5">{modal === 'add' ? 'Yangi savol' : 'Tahrirlash'}</h3><div className="space-y-4"><div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-slate-700 mb-1">Topshiriq</label><select value={form.task} onChange={e => setForm({...form, task:e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"><option value="">Tanlang</option>{tasks.map(t => <option key={t.id} value={t.id}>U{t.unit_number}-T{t.number}: {t.title}</option>)}</select></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Tartib</label><input type="number" value={form.order} onChange={e => setForm({...form, order:+e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"/></div></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Savol matni</label><textarea value={form.question_text} onChange={e => setForm({...form, question_text:e.target.value})} rows={3} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"/></div><div><label className="block text-sm font-medium text-slate-700 mb-1">To'g'ri javob</label><input value={form.correct_answer} onChange={e => setForm({...form, correct_answer:e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"/></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Variantlar (JSON)</label><textarea value={form.options} onChange={e => setForm({...form, options:e.target.value})} rows={2} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-emerald-500"/></div></div><div className="flex justify-end gap-3 mt-6"><button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Bekor qilish</button><button onClick={save} className="px-4 py-2 text-sm bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg">Saqlash</button></div></div></div>)}
    </div>)
}
