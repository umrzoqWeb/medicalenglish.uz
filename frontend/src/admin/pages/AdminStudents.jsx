import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, Download, Users, TrendingUp } from 'lucide-react'
import api from '../../services/api'

export default function AdminStudents() {
  const { uniId } = useParams()
  const [data, setData] = useState(null)
  const [showPwd, setShowPwd] = useState({})
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/universities/${uniId}/stats/`).then(res => {
      setData(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [uniId])

  const togglePwd = (id) => setShowPwd(p => ({...p, [id]: !p[id]}))
  const toggleAll = () => {
    if (showAll) { setShowPwd({}) } else {
      const all = {}; data.students.forEach(s => all[s.id] = true); setShowPwd(all)
    }
    setShowAll(!showAll)
  }

  const exportCSV = () => {
    let csv = '\uFEFF'; csv += `OTM: ${data.university.name}\n`
    csv += 'No,FIO,Login,Parol,Bajarilgan,Mavzu bali,Test %,Baho\n'
    data.students.forEach((s, i) => {
      csv += `${i+1},${s.name},${s.username},${s.plain_password},${s.completed}/${s.total},${s.avg_score}%,${s.test_pct}%,${s.grade}\n`
    })
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8'})
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
    a.download = `${data.university.short_name}_students.csv`; a.click()
  }

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"/></div>
  if (!data) return <div className="text-center py-20 text-gray-400">Ma'lumot topilmadi</div>

  const { university: uni, grades: g, avg_percentage, students } = data
  const gTotal = g.g5+g.g4+g.g3+g.g2 || 1
  const gradeColor = (gr) => gr===5?'bg-emerald-100 text-emerald-700':gr===4?'bg-blue-100 text-blue-700':gr===3?'bg-amber-100 text-amber-700':'bg-red-100 text-red-700'
  const pctColor = (p) => p>=90?'text-emerald-600':p>=75?'text-blue-600':p>=60?'text-amber-600':'text-red-600'

  return (
    <div>
      <Link to="/admin-panel/structure" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-800 mb-4 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Tuzilmaga qaytish
      </Link>

      {/* University header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 mb-6 text-white">
        <h1 className="text-2xl font-bold mb-1">{uni.name}</h1>
        <p className="text-white/60 text-sm">{uni.short_name} • {uni.student_count} ta talaba</p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <Users className="w-5 h-5 mx-auto mb-1 text-teal-300" />
            <div className="text-xl font-bold">{students.length}</div>
            <div className="text-[10px] text-white/50">Talabalar</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <TrendingUp className="w-5 h-5 mx-auto mb-1 text-emerald-300" />
            <div className="text-xl font-bold">{avg_percentage}%</div>
            <div className="text-[10px] text-white/50">O'rtacha ball</div>
          </div>

        </div>
      </div>

      {/* Grade analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Grade distribution */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4">Baholar taqsimoti</h3>
          {[{label:'A\'lo (5)', count:g.g5, color:'bg-emerald-500', text:'text-emerald-700', light:'bg-emerald-50'},
            {label:'Yaxshi (4)', count:g.g4, color:'bg-blue-500', text:'text-blue-700', light:'bg-blue-50'},
            {label:'Qoniqarli (3)', count:g.g3, color:'bg-amber-500', text:'text-amber-700', light:'bg-amber-50'},
            {label:'Qoniqarsiz (2)', count:g.g2, color:'bg-red-500', text:'text-red-700', light:'bg-red-50'}
          ].map(({label,count,color,text,light}) => (
            <div key={label} className="flex items-center gap-3 mb-3">
              <div className="w-24 text-xs font-medium text-gray-600">{label}</div>
              <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full flex items-center justify-end pr-2 transition-all`} style={{width:`${count/gTotal*100}%`, minWidth: count > 0 ? '24px' : '0'}}>
                  {count > 0 && <span className="text-white text-[10px] font-bold">{count}</span>}
                </div>
              </div>
              <div className={`w-10 text-center text-xs font-bold ${text}`}>{Math.round(count/gTotal*100)}%</div>
            </div>
          ))}
        </div>

        {/* Visual grade chart */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4">Vizual ko'rsatkichlar</h3>
          <div className="flex items-end justify-around h-36 px-4">
            {[{label:'5',count:g.g5,color:'bg-emerald-500'},{label:'4',count:g.g4,color:'bg-blue-500'},{label:'3',count:g.g3,color:'bg-amber-500'},{label:'2',count:g.g2,color:'bg-red-500'}].map(({label,count,color}) => (
              <div key={label} className="flex flex-col items-center gap-1 flex-1">
                <span className="text-xs font-bold text-gray-700">{count}</span>
                <div className={`w-12 ${color} rounded-t-lg transition-all`} style={{height:`${Math.max(count/Math.max(g.g5,g.g4,g.g3,g.g2,1)*120, 4)}px`}} />
                <span className="text-xs font-semibold text-gray-500">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 text-center text-sm text-gray-500">
            O'rtacha test natijasi: <span className={`font-bold ${pctColor(avg_percentage)}`}>{avg_percentage}%</span>
          </div>
        </div>
      </div>

      {/* Students table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between flex-wrap gap-3">
          <h3 className="font-bold text-gray-800">Talabalar ro'yxati ({students.length})</h3>
          <div className="flex gap-2">
            <button onClick={toggleAll} className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
              {showAll ? <EyeOff className="w-3.5 h-3.5"/> : <Eye className="w-3.5 h-3.5"/>}
              {showAll ? 'Yashirish' : 'Parollar'}
            </button>
            <button onClick={exportCSV} className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
              <Download className="w-3.5 h-3.5"/> Excel
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr className="text-left text-slate-500 text-xs uppercase">
              <th className="px-4 py-3 w-10">#</th>
              <th className="px-4 py-3">Talaba</th>
              <th className="px-4 py-3">Login / Parol</th>
              <th className="px-4 py-3 text-center">Bajarilgan</th>
              <th className="px-4 py-3 text-center">Mavzu</th>
              <th className="px-4 py-3 text-center">Test</th>
              <th className="px-4 py-3 text-center">Baho</th>
            </tr></thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-xs text-gray-400">{i+1}</td>
                  <td className="px-4 py-2.5 font-medium text-gray-800">{s.name}</td>
                  <td className="px-4 py-2.5">
                    <span className="font-mono text-xs text-gray-600">{s.username}</span>
                    <span className="mx-1.5 text-gray-300">/</span>
                    <span className="font-mono text-xs">{showPwd[s.id] ? s.plain_password : '••••••'}</span>
                    <button onClick={() => togglePwd(s.id)} className="ml-1 text-gray-300 hover:text-teal-500">
                      {showPwd[s.id] ? <EyeOff className="w-3 h-3 inline"/> : <Eye className="w-3 h-3 inline"/>}
                    </button>
                  </td>
                  <td className="px-4 py-2.5 text-center text-xs">
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">{s.completed}/{s.total}</span>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`font-semibold text-sm ${pctColor(s.avg_score)}`}>{s.avg_score}%</span>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`font-semibold text-sm ${pctColor(s.test_pct)}`}>{s.test_pct}%</span>
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
