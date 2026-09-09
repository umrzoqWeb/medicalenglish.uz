import { Calendar, ChevronRight, Bell } from 'lucide-react'
import { useT } from '../i18n'

const news = [
  { id: 1, titleKey: 'news.1.title', excerptKey: 'news.1.excerpt', date: '2025-01-15', featured: true },
  { id: 2, titleKey: 'news.2.title', excerptKey: 'news.2.excerpt', date: '2025-06-20' },
  { id: 3, titleKey: 'news.3.title', excerptKey: 'news.3.excerpt', date: '2025-09-01' },
  { id: 4, titleKey: 'news.4.title', excerptKey: 'news.4.excerpt', date: '2025-12-15' },
]

export default function News() {
  const t = useT()
  return (
    <div className="animate-fade-in">
      <div className="rounded-2xl p-6 shadow-xl shadow-orange-500/20 bg-gradient-to-r from-orange-500 to-red-600 text-white mb-6">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Bell className="w-6 h-6" />
          {t('news.title')}
        </h1>
        <p className="text-white/80">{t('news.subtitle')}</p>
      </div>

      {/* Featured news */}
      {news.filter(n => n.featured).map(item => (
        <div key={item.id} className="card mb-6 border-l-4 border-l-orange-500 bg-orange-50">
          <span className="badge badge-yellow mb-2">{t('news.important')}</span>
          <h2 className="text-lg font-bold mb-2">{t(item.titleKey)}</h2>
          <p className="text-gray-600 text-sm mb-3">{t(item.excerptKey)}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-4 h-4" />
            {new Date(item.date).toLocaleDateString('uz-UZ')}
          </div>
        </div>
      ))}

      {/* Other news */}
      <h3 className="font-semibold mb-3">{t('news.all')}</h3>
      <div className="space-y-3">
        {news.filter(n => !n.featured).map(item => (
          <div key={item.id} className="card flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">
              📰
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{t(item.titleKey)}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <Calendar className="w-3 h-3" />
                {new Date(item.date).toLocaleDateString('uz-UZ')}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
