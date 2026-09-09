import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CheckCircle, XCircle, Download, Shield } from 'lucide-react'
import api from '../services/api'
import { useT } from '../i18n'

export default function VerifyCertificate() {
  const { certId } = useParams()
  const t = useT()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const verify = async () => {
      try {
        const r = await api.get(`/verify/${certId}/`)
        setData(r.data)
      } catch (e) {
        setError(e.response?.status === 404 ? t('cert.notFound') : t('common.error'))
      } finally { setLoading(false) }
    }
    verify()
  }, [certId])

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full"></div></div>

  if (error) return (
    <div className="max-w-md mx-auto text-center py-20">
      <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('cert.verifyError')}</h2>
      <p className="text-gray-500">{error}</p>
    </div>
  )

  return (
    <div className="max-w-md mx-auto text-center space-y-6 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 shadow-xl border">
        <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('cert.verified')}</h2>
        <div className="space-y-3 text-left bg-gray-50 rounded-xl p-4">
          <div><span className="text-sm text-gray-500">{t('cert.name')}:</span><p className="font-bold text-gray-800">{data.name}</p></div>
          <div><span className="text-sm text-gray-500">{t('cert.score')}:</span><p className="font-bold text-teal-600">{data.score}/{data.total} ({data.percentage}%)</p></div>
          <div><span className="text-sm text-gray-500">{t('cert.date')}:</span><p className="font-bold text-gray-800">{new Date(data.date).toLocaleDateString()}</p></div>
          <div><span className="text-sm text-gray-500">{t('cert.id')}:</span><p className="font-mono text-sm text-gray-600">{data.certificate_id}</p></div>
        </div>
        <a href={`/api/certificate/${data.result_id}/`} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-all">
          <Download className="w-5 h-5" /> {t('cert.downloadPdf')}
        </a>
      </div>
    </div>
  )
}
