import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Clock, CheckCircle, XCircle, Award, AlertTriangle, Download } from 'lucide-react'
import api from '../services/api'

export default function QuizPage() {
  const [step, setStep] = useState('start')
  const [questions, setQuestions] = useState([])
  const [settings, setSettings] = useState({})
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [loading, setLoading] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => { loadHistory() }, [])
  useEffect(() => {
    if (step === 'quiz' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => { if (t <= 1) { clearInterval(timerRef.current); handleSubmit(); return 0 }; return t - 1 })
      }, 1000)
      return () => clearInterval(timerRef.current)
    }
  }, [step, timeLeft])

  const loadHistory = async () => { try { const r = await api.get('/quiz/results/'); setHistory(r.data) } catch {} }

  const startQuiz = async () => {
    setLoading(true)
    try {
      const r = await api.get('/quiz/')
      if (r.data.error) { alert(r.data.message); return }
      setQuestions(r.data.questions); setSettings(r.data.settings)
      if (r.data.settings.time_limit > 0) setTimeLeft(r.data.settings.time_limit * 60)
      setAnswers({}); setCurrent(0); setStep('quiz'); setResult(null)
    } catch (e) {
      if (e.response?.data?.error === 'attempts_exceeded') alert(e.response.data.message)
      else alert('Xato yuz berdi')
    } finally { setLoading(false) }
  }

  const handleAnswer = (qId, mapping, selectedVisualIdx) => {
    const originalIdx = mapping[selectedVisualIdx]
    setAnswers(p => ({ ...p, [qId]: originalIdx }))
  }

  const handleSubmit = async () => {
    clearInterval(timerRef.current)
    setLoading(true)
    try {
      const r = await api.post('/quiz/', { answers })
      setResult(r.data); setStep('result'); loadHistory()
    } catch { alert('Xato') } finally { setLoading(false) }
  }

  const getGrade = (pct) => { if (pct >= 90) return { g: '5 (A)', c: 'text-green-600' }; if (pct >= 71) return { g: '4 (B)', c: 'text-blue-600' }; if (pct >= 60) return { g: '3 (C)', c: 'text-yellow-600' }; return { g: '2 (F)', c: 'text-red-600' } }
  const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`

  if (step === 'quiz') {
    const q = questions[current]
    return (
      <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">
        <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-lg border">
          <span className="text-sm font-bold text-gray-600">{current + 1} / {questions.length}</span>
          <div className="w-1/2 bg-gray-200 rounded-full h-2"><div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }}></div></div>
          {timeLeft > 0 && <div className="flex items-center gap-1 text-sm font-bold text-red-500"><Clock className="w-4 h-4" />{fmt(timeLeft)}</div>}
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border">
          <h3 className="text-lg font-bold text-gray-800 mb-6">{q.question}</h3>
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(q.id, q.mapping, i)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers[q.id] === q.mapping[i] ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                <span className="font-medium">{String.fromCharCode(65 + i)})</span> {opt}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={() => setCurrent(p => Math.max(0, p - 1))} disabled={current === 0} className="px-6 py-3 bg-gray-200 rounded-xl font-medium disabled:opacity-50">Oldingi</button>
          {current < questions.length - 1
            ? <button onClick={() => setCurrent(p => p + 1)} className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600">Keyingi</button>
            : <button onClick={handleSubmit} disabled={loading} className="px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600">Tugatish</button>
          }
        </div>
      </div>
    )
  }

  if (step === 'result' && result) {
    const grade = getGrade(result.percentage)
    return (
      <div className="max-w-lg mx-auto text-center space-y-6 animate-fade-in">
        <div className="bg-white rounded-2xl p-8 shadow-xl border">
          <div className="text-6xl mb-4">{result.percentage >= 60 ? '🎉' : '😔'}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Natija</h2>
          <div className="text-5xl font-black text-indigo-600 mb-2">{result.percentage}%</div>
          <p className="text-gray-500 mb-2">{result.score} / {result.total} to'g'ri</p>
          <p className={`text-2xl font-bold ${grade.c}`}>Baho: {grade.g}</p>
          {result.percentage >= 60 && (
            <a href={`/api/certificate/${result.id}/`} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-all">
              <Download className="w-5 h-5" /> Sertifikat olish
            </a>
          )}
        </div>
        <button onClick={() => setStep('start')} className="px-8 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600">Bosh sahifaga</button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <Award className="w-12 h-12 mb-4 opacity-80" />
        <h2 className="text-2xl font-bold mb-2">Imtihon (Sertifikat)</h2>
        <p className="text-white/80 mb-4">300 ta savoldan {settings.questions_count || 30} tasi random tanlanadi. 60% dan o'tsangiz sertifikat olasiz!</p>
        <button onClick={startQuiz} disabled={loading} className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:scale-105 transition-all disabled:opacity-50">
          {loading ? 'Yuklanmoqda...' : 'Testni boshlash'}
        </button>
      </div>
      {history.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Natijalar tarixi</h3>
          <div className="space-y-3">
            {history.map((r, i) => {
              const g = getGrade(r.percentage)
              return (
                <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <span className="font-medium text-gray-700">{r.score}/{r.total}</span>
                    <span className={`ml-2 font-bold ${g.c}`}>{r.percentage}% ({g.g})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{new Date(r.created_at).toLocaleDateString()}</span>
                    {r.percentage >= 60 && (
                      <a href={`/api/certificate/${r.id}/`} target="_blank" rel="noreferrer" className="text-amber-500 hover:text-amber-600"><Download className="w-4 h-4" /></a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
