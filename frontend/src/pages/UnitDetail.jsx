import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Lock, Play, Sparkles } from 'lucide-react'
import api from '../services/api'
import { useAuthStore } from '../store'
import { useT } from '../i18n'

const taskTypeLabels = {
  fill_blank: 'Fill in the blanks',
  identify_tense: 'Identify tense',
  matching: 'Matching',
  verb_form: 'Verb forms',
  vocabulary: 'Vocabulary',
  crossword: 'Crossword',
  insert_words: 'Insert words',
  translation: 'Translation',
  synonyms: 'Synonyms',
  conversation: 'Conversation',
  speaking: 'Speaking',
  writing: 'Writing',
  video: 'Video retelling'
}

export default function UnitDetail() {
  const { id } = useParams()
  const [unit, setUnit] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useAuthStore()
  const t = useT()
  
  useEffect(() => {
    api.get(`/units/${id}/`).then(res => {
      setUnit(res.data)
      setLoading(false)
    })
  }, [id])
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }
  
  if (!unit) return <div className="text-center py-20 text-gray-500">{t('unit.notFound')}</div>
  
  const progress = unit.progress?.total ? (unit.progress.completed / unit.progress.total) * 100 : 0
  
  return (
    <div className="animate-fade-in">
      <Link to="/units" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-teal-600 mb-4">
        <ArrowLeft className="w-4 h-4" />
        {t('unit.back')}
      </Link>
      
      {/* Unit header */}
      <div className="rounded-2xl shadow-lg p-6 mb-6 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold">
            {unit.number}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{unit.title}</h1>
            {unit.description && <p className="text-white/80 text-sm mt-1">{unit.description}</p>}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{unit.progress?.completed || 0}/{unit.progress?.total || 0}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
      
      {/* Reading — PDF (bo'lsa) yoki matn (zaxira) */}
      {(unit.reading_pdf || unit.reading_text) && (
        <div className="card mb-6">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <h2 className="font-semibold text-teal-700">{t('unit.reading')}</h2>
            {unit.reading_pdf && (
              <div className="flex items-center gap-2">
                <a href={unit.reading_pdf} target="_blank" rel="noreferrer" className="btn btn-outline text-xs py-1.5 px-3">
                  {t('unit.openNewTab')}
                </a>
                <a href={unit.reading_pdf} download className="btn btn-primary text-xs py-1.5 px-3">
                  {t('unit.download')}
                </a>
              </div>
            )}
          </div>
          {unit.reading_pdf ? (
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
              <iframe src={unit.reading_pdf} title="Reading PDF" className="w-full" style={{ height: '75vh' }} />
            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{__html: unit.reading_text}} />
          )}
        </div>
      )}
      {/* Tasks list */}
      <h2 className="font-semibold mb-3">{t('unit.tasksHeading')}</h2>
      <div className="space-y-2">
        {unit.tasks?.map(task => (
          <div key={task.id} className="card flex items-center gap-3 py-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
              task.is_completed 
                ? 'bg-green-100 text-green-600' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {task.is_completed ? <CheckCircle className="w-5 h-5" /> : task.number}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm">{task.title}</span>
                {task.is_ai_evaluated && (
                  <span className="badge badge-purple text-xs">
                    <Sparkles className="w-3 h-3 mr-1" /> AI
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500">{taskTypeLabels[task.task_type]}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="badge badge-yellow text-xs">{task.points} {t('common.points')}</span>
              
              {task.is_completed ? (
                <>
                  <span className="badge badge-green text-xs">{task.user_score}%</span>
                  <Link to={`/task/${task.id}`} className="btn btn-outline text-xs py-1.5 px-3">
                    <Play className="w-3 h-3" /> {t('unit.redo')}
                  </Link>
                </>
              ) : isAuthenticated ? (
                <Link to={`/task/${task.id}`} className="btn btn-primary text-xs py-1.5 px-3">
                  <Play className="w-3 h-3" /> {t('home.start')}
                </Link>
              ) : (
                <Lock className="w-5 h-5 text-gray-300" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      {!isAuthenticated && (
        <div className="card mt-4 text-center bg-teal-50 border-teal-200">
          <p className="text-gray-600 mb-3">{t('unit.loginToDo')}</p>
          <Link to="/login" className="btn btn-primary">{t('auth.loginTitle')}</Link>
        </div>
      )}
    </div>
  )
}
