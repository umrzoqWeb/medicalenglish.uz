import { useState, useEffect } from 'react'
import { Trophy, Medal, Award, Users } from 'lucide-react'
import api from '../services/api'
import { useAuthStore } from '../store'

export default function Leaderboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const { user: currentUser } = useAuthStore()
  
  useEffect(() => {
    api.get('/leaderboard/').then(res => {
      setUsers(res.data)
      setLoading(false)
    })
  }, [])
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }
  
  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />
    return <span className="text-sm text-gray-500 font-medium">{rank}</span>
  }
  
  const getRankBg = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200'
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200'
    if (rank === 3) return 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200'
    return ''
  }
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
          <Users className="w-5 h-5 text-yellow-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Foydalanuvchilar</h1>
          <p className="text-sm text-gray-500">Eng yuqori ball to'plagan talabalar</p>
        </div>
      </div>
      
      {/* Top 3 podium */}
      {users.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[users[1], users[0], users[2]].map((u, i) => {
            const rank = i === 1 ? 1 : i === 0 ? 2 : 3
            const isFirst = rank === 1
            return (
              <div key={u.id} className={`card text-center ${isFirst ? 'ring-2 ring-yellow-400' : ''}`}>
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${
                  isFirst ? 'from-yellow-400 to-orange-500' : 'from-gray-200 to-gray-300'
                } flex items-center justify-center text-white text-xl font-bold mb-2`}>
                  {u.first_name?.[0] || u.username[0].toUpperCase()}
                </div>
                <div className="font-semibold truncate">{u.first_name || u.username}</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {getRankIcon(rank)}
                  <span className="font-bold text-blue-600">{u.best_score}%</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Test: {u.best_percentage}</div>
              </div>
            )
          })}
        </div>
      )}
      
      {/* Full list */}
      <div className="space-y-2">
        {users.map((u, i) => {
          const rank = i + 1
          const isCurrentUser = u.id === currentUser?.id
          
          return (
            <div key={u.id} className={`card flex items-center gap-4 py-3 ${
              getRankBg(rank)
            } ${isCurrentUser ? 'ring-2 ring-blue-400' : ''}`}>
              <div className="w-8 text-center">
                {getRankIcon(rank)}
              </div>
              
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                rank <= 3 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {u.first_name?.[0] || u.username[0].toUpperCase()}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">
                  {u.first_name || u.username}
                  {isCurrentUser && <span className="text-blue-500 text-xs ml-2">(Siz)</span>}
                </div>
                <div className="text-xs text-gray-500">Test: {u.best_percentage}</div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-lg stat-number">{u.best_score}%</div>
                <div className="text-xs text-gray-500">test bali</div>
              </div>
            </div>
          )
        })}
      </div>
      
      {users.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Hali foydalanuvchilar yo'q
        </div>
      )}
    </div>
  )
}
