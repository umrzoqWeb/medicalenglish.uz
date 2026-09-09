import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Trophy, Flame, Star, Target, BookOpen, Clock, TrendingUp,
  Award, Zap, ChevronRight, CheckCircle2, Play, Calendar
} from 'lucide-react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { dashboardAPI } from '../services/api'
import { useAuthStore } from '../store'
import { useT } from '../i18n'

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()
  const t = useT()
  
  useEffect(() => {
    fetchDashboard()
  }, [])
  
  const fetchDashboard = async () => {
    try {
      const response = await dashboardAPI.get()
      setDashboard(response.data)
    } catch (error) {
      console.error('Error fetching dashboard:', error)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="spinner w-12 h-12" />
      </div>
    )
  }
  
  const levelProgress = ((user?.total_points || 0) % 500) / 500 * 100
  const nextLevelPoints = 500 - ((user?.total_points || 0) % 500)
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            {t('dash.hello')}, {user?.first_name || user?.username}! 👋
          </h1>
          <p className="text-gray-600">
            {t('dash.subtitle')}
          </p>
        </motion.div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Level Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-gradient p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={levelProgress}
                  text={`${user?.level || 1}`}
                  styles={buildStyles({
                    textSize: '32px',
                    textColor: '#7c3aed',
                    pathColor: '#7c3aed',
                    trailColor: '#ede9fe',
                  })}
                />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{t('dash.level')} {user?.level || 1}</p>
            <p className="text-sm text-gray-500">
              {t('dash.nextA')}{nextLevelPoints}{t('dash.nextB')}
            </p>
          </motion.div>
          
          {/* Points Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card-gradient p-6"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {(dashboard?.total_points || 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">{t('dash.totalPoints')}</p>
          </motion.div>
          
          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-gradient p-6"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
              <Flame className="w-6 h-6 text-white streak-fire" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {dashboard?.current_streak || 0} {t('dash.days')}
            </p>
            <p className="text-sm text-gray-500">
              {t('dash.streakA')}{dashboard?.longest_streak || 0}{t('dash.streakB')}
            </p>
          </motion.div>
          
          {/* Rank Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card-gradient p-6"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              #{dashboard?.rank || '-'}
            </p>
            <p className="text-sm text-gray-500">
              {dashboard?.total_users || 0} {t('dash.usersAmong')}
            </p>
          </motion.div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress by Unit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 card-gradient p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold text-gray-900">
                {t('dash.progressByUnit')}
              </h2>
              <Link 
                to="/units" 
                className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1"
              >
                {t('dash.viewAll')}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
              {dashboard?.progress_by_unit?.slice(0, 10).map((unit, index) => (
                <Link
                  key={unit.unit_id}
                  to={`/units/${unit.unit_id}`}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${
                    unit.progress_percent === 100 
                      ? 'bg-green-500' 
                      : unit.progress_percent > 0 
                        ? 'bg-primary-500' 
                        : 'bg-gray-300'
                  }`}>
                    {unit.progress_percent === 100 ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      unit.unit_number
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {unit.unit_title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            unit.progress_percent === 100 
                              ? 'bg-green-500' 
                              : 'bg-gradient-to-r from-primary-500 to-accent-500'
                          }`}
                          style={{ width: `${unit.progress_percent}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-12 text-right">
                        {unit.progress_percent}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {unit.completed_tasks}/{unit.total_tasks}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="card-gradient p-6"
            >
              <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
                {t('dash.stats')}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-teal-600" />
                    </div>
                    <span className="text-gray-600">{t('dash.completedUnits')}</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {dashboard?.completed_units || 0}/15
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-600">{t('dash.completedTasks')}</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {dashboard?.completed_tasks || 0}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-cyan-600" />
                    </div>
                    <span className="text-gray-600">{t('dash.avgScore')}</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {Math.round(dashboard?.average_score || 0)}%
                  </span>
                </div>
              </div>
            </motion.div>
            
            {/* Recent Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card-gradient p-6"
            >
              <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
                {t('dash.recentBadges')}
              </h2>
              
              {dashboard?.recent_badges?.length > 0 ? (
                <div className="space-y-3">
                  {dashboard.recent_badges.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: item.badge.color + '20' }}
                      >
                        {item.badge.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.badge.name_uz}</p>
                        <p className="text-xs text-gray-500">{item.badge.description_uz}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">{t('dash.noBadges')}</p>
                  <p className="text-sm text-gray-400">{t('dash.doTasks')}</p>
                </div>
              )}
            </motion.div>
            
            {/* Continue Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-gradient-to-br from-primary-500 to-accent-600 rounded-2xl p-6 text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">{t('dash.keepLearning')}</p>
                  <p className="text-sm text-white/70">{t('dash.dontLose')}</p>
                </div>
              </div>
              
              <Link
                to="/units"
                className="flex items-center justify-center gap-2 w-full py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                <Play className="w-5 h-5" />
                {t('dash.continue')}
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Recent Activity */}
        {dashboard?.recent_activity?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 card-gradient p-6"
          >
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
              {t('dash.recentActivity')}
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                    <th className="pb-3 font-medium">{t('common.task')}</th>
                    <th className="pb-3 font-medium">{t('dash.score')}</th>
                    <th className="pb-3 font-medium">XP</th>
                    <th className="pb-3 font-medium">{t('dash.time')}</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.recent_activity.map((activity, index) => (
                    <tr key={index} className="border-b border-gray-50">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            activity.score >= 80 ? 'bg-green-100 text-green-600' :
                            activity.score >= 50 ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-gray-900">
                            {activity.task?.title || 'Task'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={`font-semibold ${
                          activity.score >= 80 ? 'text-green-600' :
                          activity.score >= 50 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {activity.score}%
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="flex items-center gap-1 text-yellow-600">
                          <Star className="w-4 h-4" />
                          +{activity.points_earned}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-500">
                        {new Date(activity.completed_at).toLocaleDateString('uz-UZ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
