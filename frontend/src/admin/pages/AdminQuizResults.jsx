import { useState, useEffect } from 'react'
import adminApi from '../api'

export default function AdminQuizResults() {
  const [results, setResults] = useState([])
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ questions_count: 30, time_limit: 0, max_attempts: 0 })

  useEffect(() => {
    Promise.all([
      adminApi.get('/quiz-results/'),
      adminApi.get('/quiz-settings/')
    ]).then(([r, s]) => {
      setResults(r.data)
      setSettings(s.data)
      setForm({ questions_count: s.data.questions_count, time_limit: s.data.time_limit, max_attempts: s.data.max_attempts })
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  const saveSettings = async () => {
    setSaving(true)
    try {
      await adminApi.put('/quiz-settings/', form)
      setSettings({ ...settings, ...form })
      alert('Sozlamalar saqlandi!')
    } catch { alert('Xatolik') }
    finally { setSaving(false) }
  }

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"/></div>

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Test sozlamalari va natijalar</h2>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Test sozlamalari</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Jami savollar bazada</label>
            <div className="px-3 py-2 bg-slate-100 rounded-lg text-slate-600 font-semibold">{settings?.total_questions || 0}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Har testda savollar soni</label>
            <input type="number" value={form.questions_count} onChange={e => setForm({...form, questions_count: +e.target.value})}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" min={1} max={settings?.total_questions || 300}/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Vaqt limiti (daqiqa)</label>
            <input type="number" value={form.time_limit} onChange={e => setForm({...form, time_limit: +e.target.value})}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" min={0}/>
            <p className="text-xs text-slate-400 mt-1">0 = cheksiz</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Urinishlar soni</label>
            <input type="number" value={form.max_attempts} onChange={e => setForm({...form, max_attempts: +e.target.value})}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" min={0}/>
            <p className="text-xs text-slate-400 mt-1">0 = cheksiz</p>
          </div>
        </div>
        <button onClick={saveSettings} disabled={saving}
          className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
          {saving ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Natijalar ({results.length})</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50"><tr className="text-left text-slate-600">
            <th className="px-4 py-3 font-medium">Foydalanuvchi</th>
            <th className="px-4 py-3 font-medium text-center">Natija</th>
            <th className="px-4 py-3 font-medium text-center">Foiz</th>
            <th className="px-4 py-3 font-medium">Sana</th>
            <th className="px-4 py-3 font-medium text-center">Sertifikat</th>
          </tr></thead>
          <tbody>{results.map(r => (
            <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-800">{r.username}</td>
              <td className="px-4 py-3 text-center">
                <span className="font-semibold text-emerald-600">{r.score}</span>
                <span className="text-slate-400">/{r.total}</span>
              </td>
              <td className="px-4 py-3 text-center">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.percentage >= 70 ? 'bg-emerald-100 text-emerald-700' : r.percentage >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{r.percentage}%</span>
              </td>
              <td className="px-4 py-3 text-slate-500 text-xs">{new Date(r.created_at).toLocaleString('uz')}</td>
              <td className="px-4 py-3 text-center">{r.percentage >= 60 ? <a href={"/api/certificate/" + r.id + "/"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg text-xs font-medium transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>Yuklash</a> : <span className="text-slate-400 text-xs">—</span>}</td>
            </tr>
          ))}</tbody>
        </table>
        {!results.length && <p className="text-center py-8 text-slate-400">Natijalar topilmadi</p>}
      </div>
    </div>
  )
}
