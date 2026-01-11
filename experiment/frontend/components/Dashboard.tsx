'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { subscriptionsApi, lessonsApi } from '@/lib/api'

export default function Dashboard() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [lessons, setLessons] = useState<any[]>([])
  const [balance, setBalance] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subsRes, lessonsRes, balanceRes] = await Promise.all([
          subscriptionsApi.getMy(),
          lessonsApi.getMy(),
          subscriptionsApi.getBalance(),
        ])
        setSubscriptions(subsRes.data)
        setLessons(lessonsRes.data)
        setBalance(balanceRes.data)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-secondary">
            Личный кабинет
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Привет, {user?.name}!</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Выйти
            </button>
          </div>
        </div>

        {/* Balance Section */}
        {balance && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Баланс подписки</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-gray-600 mb-1">Осталось занятий</div>
                <div className="text-3xl font-bold text-primary">{balance.remaining_classes || 0}</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Дней до окончания</div>
                <div className="text-3xl font-bold text-primary">
                  {balance.days_remaining !== null ? balance.days_remaining : '—'}
                </div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Активных подписок</div>
                <div className="text-3xl font-bold text-primary">{balance.active_subscriptions || 0}</div>
              </div>
            </div>
          </div>
        )}

        {/* Subscriptions Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-secondary mb-4">Мои подписки</h2>
          {subscriptions.length > 0 ? (
            <div className="space-y-4">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-lg text-secondary">{sub.type}</div>
                      <div className="text-gray-600">
                        Статус: <span className={`font-semibold ${sub.status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
                          {sub.status === 'active' ? 'Активна' : sub.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-2">
                        Начало: {new Date(sub.start_date).toLocaleDateString('ru-RU')}
                        {sub.end_date && ` • Окончание: ${new Date(sub.end_date).toLocaleDateString('ru-RU')}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{sub.remaining_classes}</div>
                      <div className="text-sm text-gray-600">из {sub.total_classes} занятий</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-600">У вас пока нет подписок</div>
          )}
        </div>

        {/* Lessons History Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-secondary mb-4">История занятий</h2>
          {lessons.length > 0 ? (
            <div className="space-y-4">
              {lessons.slice(0, 10).map((lesson) => (
                <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-lg text-secondary capitalize">{lesson.style}</div>
                      <div className="text-gray-600">
                        {new Date(lesson.start_time).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        lesson.is_attended
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {lesson.is_attended ? 'Пройдено' : 'Запланировано'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-600">У вас пока нет занятий</div>
          )}
        </div>
      </div>
    </div>
  )
}

