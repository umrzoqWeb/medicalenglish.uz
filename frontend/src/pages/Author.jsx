import { GraduationCap, BookOpen, Award, Mail } from 'lucide-react'
import { useT } from '../i18n'

export default function Author() {
  const t = useT()
  return (
    <div className="animate-fade-in">
      <div className="card-colored bg-gradient-to-r from-cyan-500 to-emerald-600 text-white mb-6">
        <h1 className="text-2xl font-bold mb-2">{t('author.title')}</h1>
        <p className="text-white/80">{t('author.sub')}</p>
      </div>

      <div className="card mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-100 to-emerald-100 flex items-center justify-center">
            <GraduationCap className="w-16 h-16 text-cyan-500" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold mb-1">S.Dj. Mukhamedjanova</h2>
            <p className="text-gray-600 mb-3">{t('author.role')}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="badge badge-purple">PhD</span>
              <span className="badge badge-blue">English Teacher</span>
              <span className="badge badge-green">Researcher</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="card">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-500" />
            {t('author.research')}
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• {t('author.r1')}</li>
            <li>• {t('author.r2')}</li>
            <li>• {t('author.r3')}</li>
            <li>• {t('author.r4')}</li>
          </ul>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            {t('author.awards')}
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• {t('author.a1')}</li>
            <li>• {t('author.a2')}</li>
            <li>• {t('author.a3')}</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-4">{t('author.approval')}</h3>
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">{t('author.approvalText')}</p>
          <p className="text-sm text-gray-500 mt-2">{t('author.protocol')}</p>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <Mail className="w-5 h-5 text-gray-400" />
          <a href="mailto:info@efms.uz" className="text-teal-600 hover:underline">
            info@efms.uz
          </a>
        </div>
      </div>
    </div>
  )
}
